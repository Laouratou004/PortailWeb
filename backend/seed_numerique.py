import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portail_backend.settings')
django.setup()

from domains.models import Category, SubCategory, ResourceLink

# Recuperer le domaine Numerique
try:
    cat = Category.objects.get(name__icontains="num")
    print(f"Domaine trouve: {cat.name} (id={cat.id})")
except Category.DoesNotExist:
    print("Domaine Numerique introuvable. Verifie le nom exact.")
    exit()

data = [
    (
        "Telecommunications",
        "Operateurs mobiles et Internet en Guinee",
        [
            ("Orange Guinee",    "Operateur mobile leader en Guinee",                 "https://www.orange-guinee.com"),
            ("MTN Guinée",       "Couverture mobile nationale.",            "https://www.mtn.com/"),
            ("ANPTIC",           "Agence nationale du numérique et des TIC.",              "https://www.gouvernement.gov.gn"),
        ]
    ),
    (
        "Services en Ligne",
        "Demarches administratives numeriques de l'Etat",
        [
            ("Portail e-Gouvernement", "Accès aux services publics en ligne.",          "https://www.gouvernement.gov.gn"),
            ("Ministère des TIC",      "Ministère des Postes et Économie Numérique.",   "https://www.gouvernement.gov.gn"),
            ("ANAFCI en Ligne",        "État civil et identification numérique.",        "https://www.gouvernement.gov.gn"),
        ]
    ),
    (
        "Cybersecurite",
        "Protection des donnees et securite informatique",
        [
            ("ANPTIC Cybersécurité",  "Veille et alertes en cybersécurité.",            "https://www.gouvernement.gov.gn"),
            ("CERT Guinée",           "Centre de réponse aux incidents informatiques.",  "https://www.gouvernement.gov.gn"),
            ("Protection des Données","Commission nationale de protection des données.", "https://www.gouvernement.gov.gn"),
        ]
    ),
    (
        "Formation Numerique",
        "Centres de formation aux metiers du numerique",
        [
            ("ANPTIC Formation",   "Programmes de formation aux TIC.",                   "https://www.gouvernement.gov.gn"),
            ("École du Numérique", "Formation professionnelle aux métiers du digital.",   "https://www.gouvernement.gov.gn"),
            ("Google Afrique",     "Ressources numériques et formations Google.",         "https://grow.google/intl/fr_fr/"),
        ]
    ),
    (
        "Infrastructures Numeriques",
        "Reseaux, fibre optique et datacenters nationaux",
        [
            ("GUILAB",             "Laboratoire national d'innovation numérique.",        "https://www.gouvernement.gov.gn"),
            ("Fibre Optique GN",   "Réseau national de fibre optique de Guinée.",        "https://www.gouvernement.gov.gn"),
            ("Datacenter National","Infrastructure d'hébergement de l'État guinéen.",    "https://www.gouvernement.gov.gn"),
        ]
    ),
]

created_subs = 0
created_links = 0

for sub_name, sub_desc, links in data:
    sub, created = SubCategory.objects.get_or_create(
        category=cat,
        name=sub_name,
        defaults={"description": sub_desc}
    )
    if created:
        created_subs += 1
        print(f"  + Sous-domaine: {sub_name}")

    for lname, ldesc, lurl in links:
        rl, c2 = ResourceLink.objects.update_or_create(
            subcategory=sub,
            name=lname,
            defaults={"description": ldesc, "url": lurl}
        )
        if c2:
            created_links += 1
            print(f"      - {lname}")
        else:
            print(f"      - {lname} mis à jour")

print(f"\n{created_subs} sous-domaines et {created_links} services ajoutes dans '{cat.name}'")
