from rest_framework import generics, status
from rest_framework.response import Response
from .models import Volunteer
from .serializers import VolunteerSerializer

class VolunteerCreateView(generics.CreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Thank you for offering to volunteer with WNETF. We will be in touch!'},
            status=status.HTTP_201_CREATED)

class VolunteerListView(generics.ListAPIView):
    serializer_class = VolunteerSerializer
    def get_queryset(self):
        qs = Volunteer.objects.all()
        d = self.request.query_params.get('is_diaspora')
        if d is not None: qs = qs.filter(is_diaspora=d.lower()=='true')
        return qs
