## Brouillon

Sur le site on veut:

- Les utilisateurs avec leur nom, prénom, mdp, mail, adresse et téléphone.
- Les réservations des utilisateurs
- Les billets avec prix, date
- La liste des catégories (Spectacles, Attractions, Rencontre avec les persos)
- La liste des activités (Laché de zombies, personnages de zombieland, cirque des tronçonneuses / montagne russe, grand huit, lasergames, maison hantée, labyrinthe/ Darylou le chou, Michele l'angèle...)
- Les activités triées par catégorie
- Le descriptif et détail des activités

## Entités

- UTILISATEUR : mail, nom, prénom, adresse postale, ville, code postale, numéro de tél, rôle
- BILLET: code billet, nom, prix, date d'entrée au parc
- CATEGORIE: code catégorie, nom
- ACTIVITE: code activité, nom, niveau frisson, détails, photo

 


## Les cardinalités

-L'entité UTILISATEUR est << liée >> à combien d'entités BILLET au minimum ? => 0
-L'entité UTILISATEUR est << liée >> à combien d'entités BILLET au maximum ? => N

-L'entité BILLET est << liée >> à combien d'entités UTILISATEUR au minimum ? => 0
-L'entité BILLET est << liée >> à combien d'entités UTILISATEUR au maximum ? => N

relation : Réserver: reference, date, quantité

-L'entité CATEGORIE est << liée >> à combien d'entités ACTIVITE au minimum ? => 0
-L'entité CATEGORIE est << liée >> à combien d'entités ACTIVITE au maximum ? => N

-L'entité ACTIVITE est << liée >> à combien d'entités CATEGORIE au minimum ? => 1
-L'entité ACTIVITE est << liée >> à combien d'entités CATEGORIE au maximum ? => 1

relation : Contenir
