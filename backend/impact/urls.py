from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImpactStatViewSet, ImpactStoryViewSet

router = DefaultRouter()
router.register(r'stats', ImpactStatViewSet, basename='impact-stat')
router.register(r'stories', ImpactStoryViewSet, basename='impact-story')

urlpatterns = [
    path('', include(router.urls)),
]
