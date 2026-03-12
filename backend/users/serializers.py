from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # On vérifie d'abord si les identifiants sont corrects
        data = super().validate(attrs)
        
        # SÉCURITÉ : Si l'utilisateur n'a pas le rôle 'admin', on refuse le Token
        if self.user.role != 'admin':
            raise AuthenticationFailed("Accès refusé : réservé aux administrateurs.")
            
        # On ajoute le rôle dans la réponse pour le Frontend
        data['role'] = self.user.role
        data['username'] = self.user.username
        return data