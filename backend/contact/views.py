from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        is_admin = self.request.query_params.get('admin', 'false').lower() == 'true'
        if not is_admin:
            return qs.none() # Public shouldn't list contact messages
        return qs

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Your message has been received. We will get back to you shortly.'},
            status=status.HTTP_201_CREATED)
