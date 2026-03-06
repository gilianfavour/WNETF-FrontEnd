from rest_framework import generics, status
from rest_framework.response import Response
from .models import Donation
from .serializers import DonationSerializer

class DonationCreateView(generics.CreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Thank you for your generous donation to WNETF!'},
            status=status.HTTP_201_CREATED)

class DonationListView(generics.ListAPIView):
    serializer_class = DonationSerializer
    def get_queryset(self):
        qs = Donation.objects.all()
        f = self.request.query_params.get('frequency')
        if f: qs = qs.filter(frequency=f)
        return qs
