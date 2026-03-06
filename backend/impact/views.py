from rest_framework import generics
from .models import ImpactStat, ImpactStory
from .serializers import ImpactStatSerializer, ImpactStorySerializer

class ImpactStatListView(generics.ListAPIView):
    queryset = ImpactStat.objects.filter(is_active=True)
    serializer_class = ImpactStatSerializer

class ImpactStoryListView(generics.ListAPIView):
    queryset = ImpactStory.objects.all()
    serializer_class = ImpactStorySerializer

class ImpactStoryDetailView(generics.RetrieveAPIView):
    queryset = ImpactStory.objects.all()
    serializer_class = ImpactStorySerializer
