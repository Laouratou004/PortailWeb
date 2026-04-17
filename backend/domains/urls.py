from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, SubCategoryViewSet, ResourceLinkViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'subcategories', SubCategoryViewSet, basename='subcategory')
router.register(r'resourcelinks', ResourceLinkViewSet, basename='resourcelink')

urlpatterns = [
    path('', include(router.urls)),
]
