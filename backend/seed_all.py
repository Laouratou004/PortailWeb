import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portail_backend.settings')
django.setup()

from domains.models import Category, SubCategory, ResourceLink
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

# 3. Création des sous-domaines et liens associés
category_resources = {
    "Numérique": [
        (
            "Télécommunications",
            "Opérateurs mobiles et Internet en Guinée",
            [
                ("Orange Guinée", "Opérateur mobile leader en Guinée.", "https://www.orange-guinee.com"),
                ("MTN Guinée", "Couverture mobile nationale.", "https://www.mtn.com/"),
                ("ANPTIC", "Agence nationale du numérique et des TIC.", "https://www.gouvernement.gov.gn"),
            ]
        ),
        (
            "Services en Ligne",
            "Démarches administratives numériques de l'État.",
            [
                ("Portail e-Gouvernement", "Accès aux services publics en ligne.", "https://www.gouvernement.gov.gn"),
                ("Ministère des TIC", "Ministère des Postes et de l'Économie Numérique.", "https://www.gouvernement.gov.gn"),
            ]
        ),
    ],
    "Santé": [
        (
            "Hôpitaux",
            "Hôpitaux et centres médicaux clés en Guinée.",
            [
                ("Hôpital National Ignace Deen", "Soins médicaux spécialisés à Conakry.", "https://sante.gov.gn"),
                ("Clinique Pasteur", "Soins ambulatoires et urgences.", "https://sante.gov.gn"),
            ]
        ),
        (
            "Prévention",
            "Ressources de santé publique et de prévention.",
            [
                ("Ministère de la Santé", "Informations et actus santé.", "https://sante.gov.gn"),
            ]
        ),
    ],
    "Éducation": [
        (
            "Enseignement supérieur",
            "Universités et grandes écoles guinéennes.",
            [
                ("Université de Conakry", "Informations sur les études supérieures.", "https://www.gouvernement.gov.gn"),
                ("Institut Supérieur des Mines", "Formations techniques et ingénierie.", "https://www.gouvernement.gov.gn"),
            ]
        ),
        (
            "Éducation en ligne",
            "Ressources numériques pour les étudiants.",
            [
                ("ANPTIC Formation", "Programmes de formation aux TIC.", "https://www.gouvernement.gov.gn"),
            ]
        ),
    ],
    "Transports": [
        (
            "Transport routier",
            "Routes, bus et logistique nationale.",
            [
                ("Office National des Transports", "Gestion des transports en Guinée.", "https://www.gouvernement.gov.gn"),
            ]
        ),
        (
            "Aéroports",
            "Informations de voyage et services aéroportuaires.",
            [
                ("Aéroport International de Conakry", "Vols et services passagers.", "https://tourisme.gov.gn"),
            ]
        ),
    ],
    "Agriculture": [
        (
            "Production agricole",
            "Filières agricoles et coopératives locales.",
            [
                ("Ministère de l'Agriculture", "Soutien aux exploitants agricoles.", "https://agriculture.gov.gn"),
            ]
        ),
        (
            "Marchés agricoles",
            "Accès aux marchés et aux produits nationaux.",
            [
                ("Marchés agricoles guinéens", "Offres et contacts des marchés.", "https://agriculture.gov.gn"),
            ]
        ),
    ],
    "Justice": [
        (
            "Justice civile",
            "Tribunaux et services judiciaires.",
            [
                ("Ministère de la Justice", "Services et actualités juridiques.", "https://www.gouvernement.gov.gn"),
            ]
        ),
        (
            "Droits et assistance",
            "Aide juridique et protection des droits.",
            [
                ("Tribunal de Première Instance", "Informations sur les procédures judiciaires.", "https://www.gouvernement.gov.gn"),
            ]
        ),
    ],
    "Économie": [
        (
            "Entrepreneuriat",
            "Soutien aux startups et aux entreprises.",
            [
                ("Agence de Promotion des Investissements", "Accompagnement des investisseurs.", "https://apip.gov.gn"),
            ]
        ),
        (
            "Finance publique",
            "Ressources sur la fiscalité et le budget national.",
            [
                ("Direction Générale des Impôts", "Services fiscaux et formulaires.", "https://www.gouvernement.gov.gn"),
            ]
        ),
    ],
    "Tourisme": [
        (
            "Sites touristiques",
            "Découvrir les destinations guinéennes.",
            [
                ("Office National du Tourisme", "Guide des attractions nationales.", "https://tourisme.gov.gn"),
            ]
        ),
    ],
    "Énergie": [
        (
            "Ressources énergétiques",
            "Production et distribution d'électricité.",
            [
                ("EDG Guinée", "Informations sur l'électricité et les coupures.", "https://www.gouvernement.gov.gn"),
            ]
        ),
    ],
    "Culture": [
        (
            "Patrimoine",
            "Musées, arts et événements culturels.",
            [
                ("Musée National de Guinée", "Expositions et patrimoine culturel.", "https://www.gouvernement.gov.gn"),
            ]
        ),
    ],
}

created_links = 0
updated_links = 0
created_subs = 0

for category_name, sub_defs in category_resources.items():
    cat = Category.objects.filter(name=category_name).first()
    if not cat:
        print(f"Catégorie '{category_name}' introuvable, impossible de créer les ressources.")
        continue

    for sub_name, sub_desc, links in sub_defs:
        sub, sub_created = SubCategory.objects.get_or_create(
            category=cat,
            name=sub_name,
            defaults={"description": sub_desc}
        )
        if sub_created:
            created_subs += 1
            print(f"Sous-domaine '{sub_name}' créé pour '{category_name}'")

        for lname, ldesc, lurl in links:
                rl, rl_created = ResourceLink.objects.update_or_create(
                    subcategory=sub,
                    name=lname,
                    defaults={"description": ldesc, "url": lurl}
                )
                if rl_created:
                    created_links += 1
                    print(f"  Lien '{lname}' créé dans '{sub_name}'")
                else:
                    updated_links += 1
                    print(f"  Lien '{lname}' mis à jour dans '{sub_name}'")

print(f"\nSous-domaines créés: {created_subs}")
print(f"Liens créés: {created_links}")
print(f"Liens mis à jour: {updated_links}\n")

ads_data = [
    {
        "title": "Orange Guinée",
        "subtitle": "Solutions mobiles, fibre et services numériques.",
        "image_url": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
        "order": 1
    },
    {
        "title": "Max IT",
        "subtitle": "Informatique professionnelle et services cloud.",
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
        "order": 2
    },
    {
        "title": "La Guinée Connectée",
        "subtitle": "Le déploiement de la fibre optique continue.",
        "image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
        "order": 3
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
