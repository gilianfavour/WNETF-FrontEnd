from django.urls import path
from .views import SubscribeView, SubscriberListView
urlpatterns = [
    path('', SubscribeView.as_view(), name='subscribe'),
    path('list/', SubscriberListView.as_view(), name='subscriber-list'),
]
