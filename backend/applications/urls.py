from django.urls import path
from .views import ApplicationListView, ApplicationCreateView, ApplicationDetailView
urlpatterns = [
    path('', ApplicationListView.as_view(), name='application-list'),
    path('submit/', ApplicationCreateView.as_view(), name='application-submit'),
    path('<int:pk>/', ApplicationDetailView.as_view(), name='application-detail'),
]
