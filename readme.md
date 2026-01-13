
# Présentation du projet

    Un site internet dynamique et engageant qui mettra en avant les attractions et l'expérience unique proposées par ZombieLand afin de se faire connaître. L'objectif principal est de fournir aux visiteurs un aperçu captivant du parc, tout en leur offrant la possibilité de réserver leurs billets en ligne de manière pratique et sécurisée.
    Le gérant doit pouvoir être autonome, il y a aura donc une partie back-office pour lui laisser la main sur le site.


# Définition des besoins et objectifs :

Réserver des billets
Connexion / Inscription (Admin/Client) (Authentification)
Info  du Parc (horaires, adresse, date)
Comment s'y rendre
Connaitre le Parc

# MVP :

* Parc attraction (site, darkmode...)
    * Apercu du Parc (carte)
    * Acheter des billets (Annulation possible jusqu'à 10j avant)
    * Liste attractions, specatcles,...
    * Images (attractions, logo...)
    * Deux profils : Admin/Client
        * Admin: Gérer les réservations, les membres, les activités (attractions, spectacles, lasergame zombie, rencontre avec les personnages de ZombieLand, parade de zombies...), categories (montagnes russes, niveau de frisson, grand huit, simulation, réalité augmentéé...) et prix.
        * Client: Filtrer sa recherche, acheter un billet, se renseigner sur le parc, s'inscrire, gérer sa reservation.
    * Parc réservé pour un public agé +16ans
    * Inscription/Connexion (16+)
    * Histoire du Parc
    * Infos pratiques (horaires, accessibilité, date, offres,...)
    * Attractions (niveau frisson, avis, notes, image, histoire...)
    * FAQ
    * Page contact
    * Actualité
    * Nom: ZombieLand

BONUS:
    * Hotels
    * Restauration
    * Evenements
    * Messagerie
    * Billet pass (formule avantageuse)
    * Boutique
    * Galerie (sensibilisation droit animaux)(PS: idee de Shainez)

# Technologies utilisées:
    * node js (api)
    * postgres SQL / sequelize
    * express
    * Joi
    * JWT
    * dotenv
    * vite 
    * JS
    * Svelte

# Cible:

Personnes à partir de 16 ans voulant venir au Parc amatrices de frissons

# Navigateurs compatibles:

    * Chrome
    * Firefox
    * Safari
    * Edge
    * Opera


# User Stories


| # | En tant que | Je souhaite | Afin de | Sprint |
|---| --- | --- | --- | --- |
| 1 | Client | Une page d'accueil | accéder aux fonctionnalités avec darkmode| 1 |
| 2 | Client | Une page contact| contacter le gérant | 1 |
| 3 | Client | Une page FAQ| accéder à diverses infos| 1 |
| 4 | Client | accéder aux catégories | ... | 1 |
| 5 | Client | accéder aux activités| voir les activités | 1 |
| 6 | Client | accéder aux infos de l'activité| ... | 1 |
| 7 | Client | accéder à la billeterie | choisir son forfait | 1 |
| 8 | Client | accéder au panier | ... | 1 |
| 9 | Client | accéder à la page inscription/identification |s'inscrire et s'identifier| 2 |
| 10 | Client | accéder à son espace client| gérer sa réservation| 2 |
| 11 | Admin | accéder à la page d'identification | ... | 2 |
| 12 | Admin | modification des prix billets | ... | 2 |
| 13 | Admin | modification des catégories/activités | ajout, suppression, modif des catégories/activités | 2 |
| 14 | Admin | accéder aux comptes Client | pour accéder aux infos, gestion des comptes clients (modif, suppression) | 2 |
| 15 | Admin | accéder aux commandes Client | ... | 2 |


## Rôle de chacun:

| Product Owner | Lead developer front| Lead developer back| Git master|
|---| --- | --- | --- | 
|Chahineze| Marjorie| Hausman | Thomas |
