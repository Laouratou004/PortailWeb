import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portail_backend.settings')
django.setup()

from domains.models import Category
from ads.models import Ad
from django.contrib.auth import get_user_model

User = get_user_model()

# 1. Création du superutilisateur si inexistant
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print("Superutilisateur 'admin' créé (mdp: admin123)")

# 2. Création des catégories de base (10 domaines au total)
categories_data = [
    {
        "name": "Numérique",
        "icon_name": "grid",
        "image_url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800"
    },
    {
        "name": "Santé",
        "icon_name": "plus",
        "image_url": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800"
    },
    {
        "name": "Éducation",
        "icon_name": "book",
        "image_url": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
    },
    {
        "name": "Transports",
        "icon_name": "home",
        "image_url": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800"
    },
    {
        "name": "Agriculture",
        "icon_name": "grid",
        "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
    },
    {
        "name": "Justice",
        "icon_name": "info",
        "image_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800"
    },
    {
        "name": "Économie",
        "icon_name": "search",
        "image_url": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800"
    },
    {
        "name": "Tourisme",
        "icon_name": "home",
        "image_url": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
    },
    {
        "name": "Énergie",
        "icon_name": "grid",
        "image_url": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800"
    },
    {
        "name": "Culture",
        "icon_name": "book",
        "image_url": "https://images.unsplash.com/photo-1467307983825-619715426c70?w=800"
    }
]

for cat_data in categories_data:
    cat, created = Category.objects.get_or_create(
        name=cat_data["name"],
        defaults={
            "icon_name": cat_data["icon_name"],
            "image_url": cat_data["image_url"]
        }
    )
    if created:
        print(f"Catégorie '{cat.name}' créée.")
    else:
        print(f"Catégorie '{cat.name}' existe déjà.")

# 3. Création de quelques publicités (Ads)
ads_data = [
    {
        "title": "Simplifiez vos démarches",
        "subtitle": "Accédez au nouveau portail e-Gouvernement",
        "image_url": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200",
        "order": 1
    },
    {
        "title": "La Guinée Connectée",
        "subtitle": "Le déploiement de la fibre optique continue",
        "image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
        "order": 2
    }
]

for ad_data in ads_data:
    ad, created = Ad.objects.get_or_create(
        title=ad_data["title"],
        defaults={
            "subtitle": ad_data["subtitle"],
            "image_url": ad_data["image_url"],
            "order": ad_data["order"],
            "is_active": True
        }
    )
    if created:
        print(f"Publicité '{ad.title}' créée.")
    else:
        print(f"Publicité '{ad.title}' existe déjà.")

print("\nSeeding de base terminé !")
