from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Subscriber
from .serializers import SubscriberSerializer

class SubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        is_admin = self.request.query_params.get('admin', 'false').lower() == 'true'
        if not is_admin:
            qs = qs.filter(is_active=True)
        return qs

    def create(self, request, *args, **kwargs):
        email = request.data.get('email', '')
        if Subscriber.objects.filter(email=email).exists():
            return Response({'message': 'You are already subscribed to WNETF updates.'}, status=status.HTTP_200_OK)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'Thank you for subscribing! You will receive WNETF updates.'}, status=status.HTTP_201_CREATED)
