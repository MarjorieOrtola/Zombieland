
# Présentation du projet

Le projet consiste à créer un site internet pour le parc d’attractions fictif, immersif et post-apocalyptique ZombieLand.
Ce site aura pour objectif de mettre en valeur les attractions et l’expérience proposées par le parc afin de le faire connaître auprès du public.
Le site permettra aux visiteurs de découvrir l’univers du parc, ses attractions et ses informations pratiques, tout en leur offrant la possibilité de réserver leurs billets en ligne de manière simple et sécurisée.
Le site ciblera en particulier les adolescents et jeunes adultes de 16 ans et plus, qui seront plus enclins à apprécier les attractions effrayantes, les spectacles horrifiques et les interactions avec des acteurs zombies.


# Définition des besoins et objectifs :

    Problème: Parc d'attraction récent. Il manque de visibilité. on veut créer un site pour augmenter la visibilité. Le site devra répondre à :
    L'objectif principal est de fournir aux visiteurs un aperçu captivant du parc, tout en leur offrant la possibilité de réserver leurs billets en ligne de manière pratique et sécurisée.


# MVP :

    * Parc attraction (site)
    * Apercu du Parc (carte)
    * Acheter des billets (Annulation possible jusqu'à 10j avant)
    * Liste attractions, spectacles,...
    * Images (attractions, logo...)
    * Deux profils : Admin/Client
    * Admin: Gérer les réservations, les membres, les catégories (attractions, spectacles,  rencontre avec les personnages) , activités (lasergame zombie, les personnages de ZombieLand, laché de zombies, montagnes russes,grand huit,simulation...)et le prix des billets.
    * Client: Filtrer sa recherche, acheter un billet, se renseigner sur le parc, s'inscrire, gérer sa reservation.
    * Parc réservé pour un public agé +16ans
    * Inscription/Connexion (16+)
    * Histoire du Parc
    * Infos pratiques (horaires, accessibilité, date, offres,...)
    * Attractions (niveau frisson, image, détails...)
    * FAQ
    * Page contact
    * Actualité
    * Nom: ZombieLand

# Evolutions potentielles :

    *Messagerie : système de messagerie asynchrone entre les utilisateurs et les administrateurs.
    *Notation : possibilité de noter une activité, affichage pour chaque activité de la notation moyenne et du nombre de notes.
    *Commentaires : possibilité de commenter une activité (avec modération en back-office).
    *Réservation avancée : réservation en ligne de packs de séjours en indiquant la durée du séjour (4j. max), nombre de billets souhaités, avec ou sans hôtel.

# Technologies utilisées:

    * Node js = API déjà intégrée, JS présent en front et back. Son modèle asynchrone et non bloquant permet de gérer efficacement de nombreuses requêtes simultanées (consultations, paiements, connexions utilisateurs). Offre une faible latence, essentielle pour l’expérience utilisateur lors du paiement.Node.js dispose d’un écosystème très mature pour la sécurité : Authentification JWT (JSON Web Tokens): OAuth / sessions sécurisée; Hashage des mots de passe (bcrypt, argon2), Node.js permet de créer rapidement une API REST. Ex avec EXPRESS.
    
    * postgres SQL: base de données relationnelle.Plus approprié pour notre projet.

    * Sequelize =  Puissantes capacités de traitement transactionnel,  modèles d'association flexibles et  API conviviale. Son générateur de requêtes et ses outils de migration permettent aux développeurs de gérer efficacement les modifications de schéma de base de données.

    * Express = largement utilisé pour concevoir des API évolutives et prêtes pour la production . Ses fonctionnalités de routage et d'intergiciels facilitent la gestion des    méthodes HTTP (GET, POST, PUT et DELETE), l'analyse des corps de requêtes et le renvoi de réponses JSON.
    
    * JWT = Grâce aux JWT, l’authentification des utilisateurs se fait à l’aide de tokens sécurisés envoyés avec chaque requête.
    Le serveur n’a pas besoin de stocker de session en mémoire ou en base de données, ce qui permet de réduire la charge du serveur et d’améliorer les performances de l’application tout en garantissant la sécurité des accès.
  
    * Vite = outil permettant de déveloper rapidement une appli front-end grâce a son rechargement instantané.

    * Svelte = est utilisé pour développer l’interface utilisateur du site.
    Il permet une mise en place rapide et la création d’une application de type SPA (Single Page Application), offrant une navigation fluide et une meilleure expérience utilisateur.
  
    * JS = langage universel, utilisé en front et back. Permet une grande flexibilité et adaptabilité aux besoins du projet. Large écosystème de bibliothèques et frameworks pour accélérer le développement.


# Cible:

Personnes à partir de 16 ans voulant venir au Parc amatrices de frissons

# Navigateurs compatibles:

    * Chrome 143.0.7499.193
    * Firefox 147.0
    * Safari 26.0
    
# Liste des routes et verbes prévues

# Tableau des EndPoints pour les 3 catégories et plus 

|  Verbe HTTP | Url               |Description                                          |
|-------------|-------------------|-----------------------------------------------------|
| GET         | /                 | Renvoi la page d'accueil                            |
| GET         | /attractions      | Renvoie les activités de la catégorie attraction    |
| GET         | /attractions:id   | Renvoie l'activité choisie                          |
| GET         | /spectacles       | Renvoie les activités de la catégorie spectacle     |
| GET         | /attractions:id   | Renvoie l'activité choisie                          |
| GET         | /personnages      | Renvoie les activités de la catégorie personnages   |
| GET         | /personnages:id   | Renvoie l'activité choisie                          |
| GET         | /contact          | Renvoie la page contact du parc                     |
| GET         | /faq              | Renvoie la page FAQ du parc                         |


# Tableau des EndPoints pour l'achat des  billets

|  Verbe HTTP | Url               |Description                                           |
|-------------|-------------------|------------------------------------------------------|
| GET         | /tickets          | Renvoi la page des billets                           |
| POST        | /tickets          | Paiement du billet                                   |


# Tableau des EndPoints pour l'inscription et l'authentification

|  Verbe HTTP | Url               |Description                                           |
|-------------|-------------------|------------------------------------------------------|
| GET         | /register         | Renvoie la page d'inscription                        |
| POST        | /register         | Envoyer les infos de l'inscription                   |
| GET         | /login            | Renvoie la page de connexion                         |
| POST        | /login            | Renvoie les infos de connexion                       |
| GET         | /account          | Renvoie la page du compte user                       |
| PATCH       | /account          | Modifier les informations du compte user             |
| DELETE      | /account          | Supprimer le billet sur la page du compte            |

# User Stories


| # | En tant que | Je souhaite | Afin de | Sprint |
|---| --- | --- | --- | --- |
| 1 | Visiteur | Une page principale| interragir avec l'ensemble du site | 1 |
| 2 | Visiteur | Une page contact| contacter le gérant | 1 |
| 3 | Visiteur | Une page FAQ| accéder à diverses infos| 1 |
| 4 | Visiteur | filtre catégories | choisir entre Spectacles, Attractions et Rencontres avec les persos | 1 |
| 5 | Visiteur | accéder aux activités| voir les différentes activités d'une catégorie | 1 |
| 6 | Visiteur | accéder aux infos de l'activité| ... | 1 |
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

| Product Owner | Lead developer front| Lead developer back| Git master|Scrum Master|
|---| --- | --- | --- | --- |
| Chahineze | Marjorie | Hausman | Thomas | Marjorie | 
