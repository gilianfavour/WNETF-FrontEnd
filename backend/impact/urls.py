from django.urls import path
from .views import ImpactStatListView, ImpactStoryListView, ImpactStoryDetailView
urlpatterns = [
    path('stats/', ImpactStatListView.as_view(), name='impact-stats'),
    path('stories/', ImpactStoryListView.as_view(), name='impact-stories'),
    path('stories/<int:pk>/', ImpactStoryDetailView.as_view(), name='impact-story-detail'),
]
