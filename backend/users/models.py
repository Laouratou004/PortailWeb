from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.
# Creation des roles d'utilisateurs
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Administrateur'),
        ('user', 'Utilisateur'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    

