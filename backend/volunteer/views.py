from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Volunteer
from .serializers import VolunteerSerializer

class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        is_admin = self.request.query_params.get('admin', 'false').lower() == 'true'
        if is_admin:
            d = self.request.query_params.get('is_diaspora')
            if d is not None:
                qs = qs.filter(is_diaspora=d.lower() == 'true')
            return qs
        return qs.none()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Thank you for offering to volunteer with WNETF. We will be in touch!'},
            status=status.HTTP_201_CREATED)
