## Brouillon

Sur le site on veut:
- Les utilisateurs avec leur identifiant, mdp, mail
- Les réservations des utilisateurs
- Un administrateur avec identifiant et mdp
- Les billets avec prix, date
- La liste des catégories (Spectacles, attractions, restauration)
- La liste des activités (Laché de zombies, personnages de zombieland, cirque des tronçonneuses / montagne russe, grand huit, lasergames, maison hantée, labyrinthe/ La baraque à cervelles, La taverne des Damnés)
- Les activités triées par catégorie


## Entités


<!--- ADMIN :code admin, nom, mot de passe-->
  - ROLE : code role, nom
  - UTILISATEUR : code utilisateur, identifiant, mail
  - BILLET: code billet, prix, date
  - CATEGORIE: code catégorie, nom
  - ACTIVITE: code activité, nom, niveau frisson, notation, détails

## Les cardinalités

-L'entité ROLE est << liée >> à combien d'entités UTILISATEUR au minimum ? => 1
-L'entité ROLE est << liée >> à combien d'entités UTILISATEUR au maximum ? => N

-L'entité UTILISATEUR est << liée >> à combien d'entités ROLE au minimum ? => 1
-L'entité UTILISATEUR est << liée >> à combien d'entités ROLE au maximum ? => 1

relation : attribuer, contenir

-L'entité UTILISATEUR est << liée >> à combien d'entités BILLET au minimum ? => 0
-L'entité UTILISATEUR est << liée >> à combien d'entités BILLET au maximum ? => N

-L'entité BILLET est << liée >> à combien d'entités UTILISATEUR au minimum ? => 0
-L'entité BILLET est << liée >> à combien d'entités UTILISATEUR au maximum ? => 1
<!-- a vérifier -->
relation : acheter, réserver

-L'entité CATEGORIE est << liée >> à combien d'entités ACTIVITE au minimum ? => 1
-L'entité CATEGORIE est << liée >> à combien d'entités ACTIVITE au maximum ? => N

-L'entité ACTIVITE est << liée >> à combien d'entités CATEGORIE au minimum ? => 1
-L'entité ACTIVITE est << liée >> à combien d'entités CATEGORIE au maximum ? => 1

relation : contenir