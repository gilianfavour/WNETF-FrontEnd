from rest_framework.views import APIView
from rest_framework.response import Response
from applications.models import Application
from beneficiaries.models import Beneficiary
from donate.models import Donation
from blog.models import BlogPost
from events.models import Event
from django.db.models import Sum

class DashboardStatsView(APIView):
    def get(self, request):
        active_students = Beneficiary.objects.filter(is_active=True).count()
        total_applications = Application.objects.count()
        pending_applications = Application.objects.filter(status='pending').count()
        
        # Total raised
        donations_ugx = Donation.objects.filter(currency='UGX').aggregate(total=Sum('amount'))['total'] or 0
        
        # Universities count (distinct from beneficiaries)
        universities_count = Beneficiary.objects.values('university').distinct().count()

        return Response({
            'overview': [
                { 'label': 'Active Students', 'value': str(active_students), 'sub': 'Supported beneficiaries', 'color': 'green' },
                { 'label': 'Applications', 'value': str(total_applications), 'sub': f'{pending_applications} pending review', 'color': 'blue' },
                { 'label': 'Total Raised', 'value': f'UGX {donations_ugx/1000000:.1f}M', 'sub': 'This year', 'color': 'amber' },
                { 'label': 'Universities', 'value': str(universities_count), 'sub': 'Partner institutions', 'color': 'purple' },
            ]
        })
