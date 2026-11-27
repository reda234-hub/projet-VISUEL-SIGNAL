from rest_framework import viewsets
from .models import Realisation
from .serializers import RealisationListSerializer, RealisationDetailSerializer
class RealisationViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = "slug"
    def get_queryset(self):
        qs= (
            Realisation.objects.filter(publie=True)
            .select_related("service")
            .prefetch_related("photos")
        )
        service = self.request.query_params.get("service")
        if service :
            qs = qs.filter(service__slug=service)
        if self.request.query_params.get("vedette") =="1":
            qs = qs.filter(en_vedette=True)
        return qs
    def get_serializer_class(self):
        if self.action == "retrieve":
            return RealisationDetailSerializer
        return RealisationListSerializer
    
    





# Create your views here.
