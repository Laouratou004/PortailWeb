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
            ("MTN Guinee",       "Reseau mobile MTN, couverture nationale",            "https://www.mtn.gn"),
            ("ANPTIC",           "Agence Nationale de Promotion des TIC",              "http://www.anptic.gov.gn"),
        ]
    ),
    (
        "Services en Ligne",
        "Demarches administratives numeriques de l'Etat",
        [
            ("Portail e-Gouvernement", "Acces aux services publics en ligne",          "http://www.gouvernement.gov.gn"),
            ("Ministere des TIC",      "Ministere des Postes et Economie Numerique",   "http://www.mpten.gov.gn"),
            ("ANAFCI en Ligne",        "Etat civil et identification numerique",        "http://www.anafci.gov.gn"),
        ]
    ),
    (
        "Cybersecurite",
        "Protection des donnees et securite informatique",
        [
            ("ANPTIC Cybersecurite",  "Veille et alertes en cybersecurite",            "http://www.anptic.gov.gn"),
            ("CERT Guinee",           "Centre de reponse aux incidents informatiques",  "http://www.anptic.gov.gn/cert"),
            ("Protection des Donnees","Commission nationale de protection des donnees", "http://www.mpten.gov.gn"),
        ]
    ),
    (
        "Formation Numerique",
        "Centres de formation aux metiers du numerique",
        [
            ("ANPTIC Formation",   "Programmes de formation aux TIC",                   "http://www.anptic.gov.gn/formation"),
            ("Ecole du Numerique", "Formation professionnelle aux metiers du digital",   "http://www.mpten.gov.gn"),
            ("Google Afrique",     "Ressources numeriques et formations Google",         "https://grow.google/intl/fr_fr/"),
        ]
    ),
    (
        "Infrastructures Numeriques",
        "Reseaux, fibre optique et datacenters nationaux",
        [
            ("GUILAB",             "Laboratoire national d'innovation numerique",        "http://www.anptic.gov.gn"),
            ("Fibre Optique GN",   "Reseau national de fibre optique de Guinee",        "http://www.mpten.gov.gn"),
            ("Datacenter National","Infrastructure d'hebergement de l'Etat guineen",    "http://www.anptic.gov.gn"),
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
        rl, c2 = ResourceLink.objects.get_or_create(
            subcategory=sub,
            name=lname,
            defaults={"description": ldesc, "url": lurl}
        )
        if c2:
            created_links += 1
            print(f"      - {lname}")

print(f"\n{created_subs} sous-domaines et {created_links} services ajoutes dans '{cat.name}'")
