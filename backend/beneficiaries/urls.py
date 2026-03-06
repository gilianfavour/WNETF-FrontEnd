from django.urls import path
from .views import BeneficiaryListView, BeneficiaryDetailView
urlpatterns = [
    path('', BeneficiaryListView.as_view(), name='beneficiary-list'),
    path('<int:pk>/', BeneficiaryDetailView.as_view(), name='beneficiary-detail'),
]
