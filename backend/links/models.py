from django.db import models
from domains.models import Category # Import important

class Link(models.Model):
    title = models.CharField(max_length=200)
    url = models.URLField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='links')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title