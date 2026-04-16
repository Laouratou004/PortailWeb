from rest_framework import serializers
from .models import Category, Link

class LinkSerializer(serializers.ModelSerializer):
    # On utilise PrimaryKeyRelatedField pour pouvoir envoyer juste l'ID de la catégorie depuis React
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Link
        fields = ['id', 'title', 'url', 'description', 'category', 'created_at']

class CategorySerializer(serializers.ModelSerializer):
    # Pour l'affichage, on montre les détails des liens
    links = LinkSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'icon_name', 'links']