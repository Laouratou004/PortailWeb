from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Category, SubCategory
from .serializers import CategorySerializer, SubCategorySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]  # Public — visible sans connexion

class SubCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [AllowAny]  # Public — visible sans connexion
    
    # Pour filtrer les sous-catégories d'une catégorie précise
    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')
        if category_id:
            return SubCategory.objects.filter(category_id=category_id)
        return SubCategory.objects.all()