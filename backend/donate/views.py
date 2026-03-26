from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Donation
from .serializers import DonationSerializer

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response(
            {
                'status': 'success',
                'message': 'Thank you for your generous donation to WNETF!',
                'data': response.data
            },
            status=status.HTTP_201_CREATED
        )

    def get_queryset(self):
        qs = super().get_queryset()
        f = self.request.query_params.get('frequency')
        if f: qs = qs.filter(frequency=f)
        return qs
