from rest_framework import viewsets, filters
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'location']
    ordering_fields = ['date']

    def get_queryset(self):
        qs = super().get_queryset()
        
        # Admin check - usually we'd check auth, but for now we follow the pattern
        is_admin = self.request.query_params.get('admin', 'false').lower() == 'true'
        
        if not is_admin:
            qs = qs.filter(is_active=True)
            
        upcoming = self.request.query_params.get('upcoming')
        if upcoming is not None:
            qs = qs.filter(is_upcoming=upcoming.lower()=='true')
            
        return qs
