from django.urls import path
from .views import AdPublicListView, AdAdminListCreateView, AdAdminDetailView

urlpatterns = [
    # Route publique — utilisée par la Home page
    path('', AdPublicListView.as_view(), name='ads-public'),

    # Routes admin — gestion complète des pubs
    path('admin/', AdAdminListCreateView.as_view(), name='ads-admin-list'),
    path('admin/<int:pk>/', AdAdminDetailView.as_view(), name='ads-admin-detail'),
]
