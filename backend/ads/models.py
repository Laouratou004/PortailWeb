from django.db import models

class Ad(models.Model):
    title = models.CharField(max_length=150, verbose_name="Titre")
    subtitle = models.CharField(max_length=255, blank=True, verbose_name="Sous-titre")
    image_url = models.URLField(verbose_name="URL de l'image")
    is_active = models.BooleanField(default=True, verbose_name="Active")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Publicité"
        verbose_name_plural = "Publicités"
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title
