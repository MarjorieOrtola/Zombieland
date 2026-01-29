BIENVENUE A ZOMBIELAND


# Mise en place de la bdd
La contrainte UNIQUE pour reservation_user_id_ticket_id_key est à enlever pour qu'un utilisateur puisse faire plusieurs réservations.

Dans le terminal: 

psql -U zombieland -d zombieland
mot de passe:
puis une fois dans la base de données:
ALTER TABLE reservation
DROP CONSTRAINT reservation_user_id_ticket_id_key;
on vérifie que la contrainte unique est enlevée:
\d reservation 
on quitte
\q