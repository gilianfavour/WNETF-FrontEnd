from rest_framework import viewsets
from .models import ImpactStat, ImpactStory
from .serializers import ImpactStatSerializer, ImpactStorySerializer

class ImpactStatViewSet(viewsets.ModelViewSet):
    queryset = ImpactStat.objects.all()
    serializer_class = ImpactStatSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        is_admin = self.request.query_params.get('admin', 'false').lower() == 'true'
        if not is_admin:
            qs = qs.filter(is_active=True)
        return qs

class ImpactStoryViewSet(viewsets.ModelViewSet):
    queryset = ImpactStory.objects.all()
    serializer_class = ImpactStorySerializer
