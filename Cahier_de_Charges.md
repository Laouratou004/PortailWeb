# Cahier des Charges — PortailWeb

## 1. Contexte et objectif
PortailWeb est une application web composée d'un backend (API REST) et d'un frontend (interface utilisateur). L'objectif principal est de fournir une plateforme permettant la gestion de domaines, liens et annonces, avec des fonctionnalités d'authentification et de gestion utilisateur.

## 2. Périmètre
- Inclus:
  - Backend Django (API REST pour `users`, `domains`, `links`, `ads`).
  - Frontend React (Vite + TypeScript + Tailwind) consommant l'API.
  - Base de données PostgreSQL (schéma et migrations).
  - Documentation d'installation et fichiers d'exemple d'environnement.
- Exclu:
  - Intégrations tierces non spécifiées (paiement, analytics externes), scripts de migration historiques complexes.

## 3. Exigences fonctionnelles
- Authentification:
  - Gestion des utilisateurs (inscription, connexion, gestion du profil).
  - Authentification token JWT pour l'accès aux API.
- API CRUD:
  - Endpoints pour créer, lire, mettre à jour et supprimer `Category`, `Link`, `Ad`, `User`.
- Permissions:
  - Rôles utilisateur (admin/editor/viewer) appliqués aux endpoints sensibles.
- Frontend:
  - Pages principales: `Home`, `Domains`, `Links`, `Users`, `About`.
  - Interface responsive et accessible.

## 4. Exigences non fonctionnelles
- Sécurité:
  - Les secrets ne doivent pas être committés; utilisation de variables d'environnement.
  - Validation et sanitisation des entrées côté serveur.
- Qualité:
  - Tests unitaires pour les composants critiques (modèles, serializers, vues).
  - Couverture minimale demandée pour les parties cœur (ex: auth, endpoints critiques).
- Performances:
  - Temps de réponse raisonnable pour endpoints critiques.
- Maintenabilité:
  - Code lisible et documenté; adherence aux conventions PEP8/TypeScript lint.

## 5. Architecture et stack technique
- Backend: Python, Django, Django REST Framework, djangorestframework-simplejwt.
- Frontend: React, TypeScript, Vite, Tailwind CSS.
- Base de données: PostgreSQL.
- Tests: pytest / Django test framework pour backend; testing-library / vitest pour frontend.

## 6. Base de données et migrations
- Les modèles doivent être versionnés via les migrations Django.
- Fournir un fichier `backend/.env.example` listant les variables nécessaires.
- Procédure claire pour exécuter les migrations localement.

## 7. Tests et assurance qualité
- Tests unitaires automatisés couvrant les serializers, modèles et vues critiques.
- Tests d'intégration couvrant les flows: auth -> créer ressource -> lister ressource.
- Smoketests: endpoint health vérifiant l'état minimal de l'application.

## 8. Livrables
- Code source organisé en `backend/` et `frontend/`.
- `Cahier_de_Charges.md` (document présent).
- `backend/.env.example` et `frontend/.env.example`.
- `requirements.txt` à jour pour le backend et `package.json` pour le frontend.
- Fichier CSV d'import Jira (`jira_tasks_for_jira_import.csv`).
- Documentation d'installation locale (README avec commandes d'initialisation).

## 9. Planning indicatif
- Phase 1 — Préparation et nettoyage du code: 1 jour
- Phase 2 — Implémentation endpoints critiques + tests: 2 à 3 jours
- Phase 3 — Frontend intégration des principaux écrans: 2 à 3 jours
- Phase 4 — Tests d'intégration et corrections: 1 à 2 jours

## 10. Rôles et responsabilités
- Backend: Hadjiratou Diallo — API, modèles, tests serveur.
- Frontend: Laye Oumar Condé — UI, intégration API, tests front.
- Product Owner: validation des critères d'acceptation et priorisation.

## 11. Critères d'acceptation
- Les endpoints CRUD fonctionnent pour les ressources principales.
- Authentification et permissions validées par tests automatisés.
- Frontend peut consommer l'API et exécuter les parcours utilisateur principaux.
- Documentation d'installation et fichiers d'exemple fournis.

## 12. Risques et mitigations
- Dépendances vulnérables: réaliser des audits (`pip-audit`) et mettre à jour les versions avant les releases.
- Problèmes de compatibilité: verrouiller les versions des packages critiques et documenter l'environnement.
- Perte de données: maintenir des exports de la base avant opérations destructrices.

## 13. Annexes
- Fichiers d'exemple: `backend/.env.example`, `frontend/.env.example`, `requirements.txt`, `jira_tasks_for_jira_import.csv`.
- Contacts: Hadjiratou Diallo, Laye Oumar Condé.

---

*Document rédigé pour le projet PortailWeb — version initiale.*
