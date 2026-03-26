from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet, PartnerViewSet
from .dashboard_views import DashboardStatsView

router = DefaultRouter()
router.register(r'team', TeamMemberViewSet)
router.register(r'partners', PartnerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
]
