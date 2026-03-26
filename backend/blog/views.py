from rest_framework import viewsets, filters
from .models import BlogPost
from .serializers import BlogPostSerializer

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'excerpt', 'author', 'category']
    ordering_fields = ['created_at']
    lookup_field = 'pk' # We use PK for admin, but can still support slug for public maybe. Actually better to use ID for CRUD.

    def get_queryset(self):
        qs = super().get_queryset()
        
        # Admin check
        is_admin = self.request.query_params.get('admin', 'false').lower() == 'true'
        
        if not is_admin:
            qs = qs.filter(is_published=True)
            
        category = self.request.query_params.get('category')
        if category: qs = qs.filter(category__icontains=category)
        
        return qs
