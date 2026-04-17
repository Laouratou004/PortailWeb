from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Category, SubCategory, ResourceLink
from .serializers import CategorySerializer, SubCategorySerializer, ResourceLinkSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    # prefetch_related charge tout en 3 requêtes au lieu de N+1
    queryset = Category.objects.prefetch_related(
        'subcategories__links'
    ).all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.prefetch_related('links').all()
    serializer_class = SubCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')
        qs = SubCategory.objects.prefetch_related('links')
        if category_id:
            return qs.filter(category_id=category_id)
        return qs.all()

class ResourceLinkViewSet(viewsets.ModelViewSet):
    queryset = ResourceLink.objects.all()
    serializer_class = ResourceLinkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        subcategory_id = self.request.query_params.get('subcategory_id')
        if subcategory_id:
            return ResourceLink.objects.filter(subcategory_id=subcategory_id)
        return ResourceLink.objects.all()