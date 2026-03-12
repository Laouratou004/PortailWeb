from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import get_user_profile

urlpatterns = [
    # path('register/', register_user, name='register'), # <-- ON SUPPRIME CETTE LIGNE
    
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', get_user_profile, name='user_profile'),
]