from rest_framework import generics, filters
from .models import Event
from .serializers import EventSerializer

class EventListView(generics.ListAPIView):
    serializer_class = EventSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'location']
    ordering_fields = ['date']
    def get_queryset(self):
        qs = Event.objects.all()
        upcoming = self.request.query_params.get('upcoming')
        if upcoming is not None:
            qs = qs.filter(is_upcoming=upcoming.lower()=='true')
        return qs

class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
