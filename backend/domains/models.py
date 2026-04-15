from django.db import models

# 1. LE DOMAINE (ex: Santé, Éducation)
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    # On ajoute un champ pour l'icône si tu veux changer l'icône plus tard
    icon_name = models.CharField(max_length=50, default="LayoutGrid")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# 2. LA PALETTE / SOUS-DOMAINE (ex: Hôpitaux, Centres de santé)
class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, help_text="Petite description de la palette")
    
    class Meta:
        verbose_name = "Sous-Domaine"
        # Empêche d'avoir deux fois "Hôpitaux" dans le même domaine "Santé"
        unique_together = ('category', 'name')

    def __str__(self):
        return f"{self.category.name} > {self.name}"

# 3. LE LIEN / LA FICHE DÉTAILLÉE (ex: Hôpital Donka)
class ResourceLink(models.Model):
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='links')
    name = models.CharField(max_length=150)
    description = models.TextField(help_text="La description qui apparaîtra à côté de la photo")
    url = models.URLField(help_text="Le lien vers le site officiel")
    # C'est ici qu'on gère la photo que tu voulais !
    image = models.ImageField(upload_to='resources/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Lien de Ressource"

    def __str__(self):
        return self.name