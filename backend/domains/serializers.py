from rest_framework import serializers
from .models import Category, SubCategory, ResourceLink

# 1. Serializer pour les liens finaux
class ResourceLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceLink
        fields = ['id', 'subcategory', 'name', 'description', 'url', 'image', 'created_at']
        extra_kwargs = {
            'subcategory': {'write_only': True},  # reçu en POST, pas renvoyé dans les listes imbriquées
        }

# 2. Serializer pour les sous-catégories
class SubCategorySerializer(serializers.ModelSerializer):
    links = ResourceLinkSerializer(many=True, read_only=True)

    class Meta:
        model = SubCategory
        fields = ['id', 'category', 'name', 'description', 'links']
        extra_kwargs = {
            'category': {'write_only': True},  # reçu en POST, pas renvoyé dans les listes imbriquées
        }

# 3. Serializer pour les Domaines
class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)
    total_links = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'icon_name', 'image_url', 'subcategories', 'total_links', 'created_at']

    def get_total_links(self, obj):
        return sum(sub.links.count() for sub in obj.subcategories.all())