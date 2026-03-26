from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .models import TeamMember, Partner
from .serializers import TeamMemberSerializer, PartnerSerializer

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

class AdminLoginView(APIView):
    def post(self, request):
        identifier = request.data.get('identifier', '').strip()
        password = request.data.get('password', '')

        if not identifier or not password:
            return Response({'error': 'Credentials required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check superadmin credentials from env
        sa_username = getattr(settings, 'SUPERADMIN_USERNAME', '')
        sa_email = getattr(settings, 'SUPERADMIN_EMAIL', '')
        sa_password = getattr(settings, 'SUPERADMIN_PASSWORD', '')

        identifier_lower = identifier.lower()
        if (identifier_lower == sa_username.lower() or identifier_lower == sa_email.lower()) and password == sa_password:
            return Response({
                'full_name': 'WNETF Super Admin',
                'role': 'Super Admin',
            })

        # Check team members by email or full_name
        member = (
            TeamMember.objects.filter(is_active=True, email__iexact=identifier).first()
            or TeamMember.objects.filter(is_active=True, full_name__iexact=identifier).first()
        )

        if member and str(member.password) == password:
            return Response({
                'full_name': member.full_name,
                'role': member.role,
            })

        return Response({'error': 'Invalid credentials or unauthorized account.'}, status=status.HTTP_401_UNAUTHORIZED)
