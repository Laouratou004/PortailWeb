from rest_framework import serializers # Importez d'abord DRF
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # Puis JWT
from rest_framework import serializers
# 1. la classe de Token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        self.user.role = 'admin' 
        data['role'] = 'admin'
        data['username'] = self.user.username
        return data

# 2. autre sérialiseur (utilisé par la vue)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Remplacez par votre modèle réel
        model = None 
        fields = '__all__'



