from rest_framework import generics, status
from rest_framework.response import Response
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Your message has been received. We will get back to you shortly.'},
            status=status.HTTP_201_CREATED)

class ContactListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class ContactDetailView(generics.RetrieveUpdateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
