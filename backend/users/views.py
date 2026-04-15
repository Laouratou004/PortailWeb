
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .models import User

@api_view(['POST'])
@permission_classes([AllowAny]) # Tout le monde peut s'inscrire
def register_user(request):
    data = request.data
    try:
        # Création de l'utilisateur avec mot de passe haché
        user = User.objects.create_user(
            username=data['username'],
            email=data.get('email', ''),
            password=data['password'],
            role=data.get('role', 'user') # Par défaut, c'est un utilisateur simple
        )
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated]) # Seul un utilisateur avec un Token valide peut entrer
def get_user_profile(request):
    """
    Cette vue permet au Frontend de récupérer les infos de 
    l'utilisateur connecté (nom, email, rôle).
    """
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


class AdminDashboardStatsView(APIView):
    # Cette ligne garantit que SEUL un admin peut accéder à cette vue
    permission_classes = [IsAdminUser]

    def get(self, request):
        # Exemple de calculs pour votre dashboard
        stats = {
            'total_users': User.objects.count(),
            'admins_count': User.objects.filter(role='admin').count(),
            # Ajoutez d'autres statistiques ici
        }
        return Response(stats)
    
