# backend/links/models.py
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100) # Ex: "Éducation"
    color = models.CharField(max_length=20, default="blue") # Pour tes couleurs Figma
    icon_name = models.CharField(max_length=50, blank=True) # Nom de l'icône (ex: "book")

    def __str__(self):
        return self.name

class Link(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='links')
    title = models.CharField(max_length=200)
    url = models.URLField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title