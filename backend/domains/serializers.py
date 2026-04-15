from rest_framework import serializers
from .models import Category, SubCategory, ResourceLink

# 1. Serializer pour les liens finaux (avec la photo)
class ResourceLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceLink
        fields = ['id', 'name', 'description', 'url', 'image', 'created_at']

# 2. Serializer pour les sous-catégories (Palettes)
class SubCategorySerializer(serializers.ModelSerializer):
    # On inclut les liens à l'intérieur pour que React reçoive tout d'un coup
    links = ResourceLinkSerializer(many=True, read_only=True)

    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'description', 'links']

# 3. Serializer pour les Domaines (Santé, Éducation, etc.)
class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'icon_name', 'subcategories', 'created_at']