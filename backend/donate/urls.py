from django.urls import path
from .views import DonationCreateView, DonationListView
urlpatterns = [
    path('', DonationCreateView.as_view(), name='donate'),
    path('records/', DonationListView.as_view(), name='donation-list'),
]
