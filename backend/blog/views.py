from rest_framework import generics, filters
from .models import BlogPost
from .serializers import BlogPostSerializer

class BlogListView(generics.ListAPIView):
    serializer_class = BlogPostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'excerpt', 'author', 'category']
    ordering_fields = ['created_at']
    def get_queryset(self):
        qs = BlogPost.objects.filter(is_published=True)
        category = self.request.query_params.get('category')
        if category: qs = qs.filter(category__icontains=category)
        return qs

class BlogDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
