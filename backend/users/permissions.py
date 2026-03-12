from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Seuls les utilisateurs avec le rôle 'admin' peuvent passer.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'admin')