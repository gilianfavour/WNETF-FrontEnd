from rest_framework import generics, filters, status
from rest_framework.response import Response
from .models import Application
from .serializers import ApplicationSerializer

class ApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['full_name', 'email', 'university', 'course', 'student_number']
    ordering_fields = ['created_at', 'status']
    def get_queryset(self):
        qs = Application.objects.all()
        s = self.request.query_params.get('status')
        d = self.request.query_params.get('district')
        if s: qs = qs.filter(status=s)
        if d: qs = qs.filter(district__icontains=d)
        return qs

class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Application submitted successfully. We will contact you within 2-3 weeks.'},
            status=status.HTTP_201_CREATED)

class ApplicationDetailView(generics.RetrieveUpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
