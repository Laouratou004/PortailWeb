from rest_framework import serializers
from .models import Ad


class AdSerializer(serializers.ModelSerializer):
    """Serializer complet — utilisé par l'admin pour créer/modifier des pubs."""
    class Meta:
        model = Ad
        fields = ['id', 'title', 'subtitle', 'image_url', 'is_active', 'order', 'created_at']


class AdPublicSerializer(serializers.ModelSerializer):
    """Serializer allégé — utilisé par le frontend public (Home page)."""
    class Meta:
        model = Ad
        fields = ['id', 'title', 'subtitle', 'image_url']
