from rest_framework import viewsets, filters
from .models import Beneficiary
from .serializers import BeneficiarySerializer

class BeneficiaryViewSet(viewsets.ModelViewSet):
    queryset = Beneficiary.objects.all()
    serializer_class = BeneficiarySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "course", "university", "district"]
    ordering_fields = ["created_at", "name"]

    def get_queryset(self):
        qs = super().get_queryset()
        
        # Admin check
        is_admin = self.request.query_params.get('admin', 'false').lower() == 'true'
        
        if not is_admin:
            qs = qs.filter(is_active=True)
            
        g = self.request.query_params.get("is_graduate")
        d = self.request.query_params.get("district")
        if g is not None: qs = qs.filter(is_graduate=g.lower()=="true")
        if d: qs = qs.filter(district__icontains=d)
        
        return qs
