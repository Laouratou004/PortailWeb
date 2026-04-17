from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Ad
from .serializers import AdPublicSerializer, AdSerializer

class AdPublicListView(ListAPIView):
    """GET /api/ads/ — pubs actives, visibles sans connexion."""
    serializer_class = AdPublicSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Ad.objects.filter(is_active=True)

class AdAdminListCreateView(ListCreateAPIView):
    """GET + POST /api/ads/admin/ — gestion complète (utilisateur connecté)."""
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticated]

class AdAdminDetailView(RetrieveUpdateDestroyAPIView):
    """GET + PUT + PATCH + DELETE /api/ads/admin/<id>/"""
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticated]
