CATEGORY (id, name)
ACTIVITY (id, name, fear_level, photo, details,#CATEGORY(id))
USER (id, last_name, first_name, password, mail, adress, city, postcode, phone_number, role)
TICKET (id, price, date_entrance)
RESERVATION (id, reference, date_reservation, quantity, #user(id), #ticket(id))

## Table category
stocke les informations sur les catégories d'activités
| Nom du champ | Type | Les contraintes | Description | Exemple de valeur |
| --- | --- | --- | --- | --- |
| id | INT | Primary key/ Auto_increment/unique| Identifiant unique de la catégorie| 1 |
| name | VARCHAR(100) | NOT NULL, Unique | Nom de la catégorie | Spectacles |


## Table user
stocke les informations sur les users
| Nom du champ | Type | Les contraintes | Description | Exemple de valeur |
| --- | --- | --- | --- | --- |
| mail |  VARCHAR(255)  | Primary key/ Auto_increment/unique| Identifiant unique de user | Mariondubois@gmail.com  |
| first name  | VARCHAR(100) | NOT NULL, | prénom de user | Marion |
| last name  | VARCHAR(100) | NOT NULL, | nom de user  |  Dubois |
| password  | VARCHAR(255) | NOT NULL, | mot de passe  |  azertyuiop |
| address | VARCHAR(255) | NOT NULL, | adresse de user  | 1 rue de la libération |
| city | VARCHAR(255) | NOT NULL, | ville  | Paris |
| postcode | VARCHAR(255) | NOT NULL, | code postale  | 75019 |
| phone_number | VARCHAR(20) | NOT NULL, Unique| téléphone de user  | +33612345678 |
| role | VARCHAR(20) | NOT NULL, | role de l'identifiant   | admin ou user |


## Table activity
stocke les informations des activités
| Nom du champ | Type | Les contraintes | Description | Exemple de valeur |
| --- | --- | --- | --- | --- |
| id | INT | Primary key/ Auto_increment/unique| Identifiant unique de la catégorie| 1 |
| name | VARCHAR(100) | NOT NULL, Unique| Nom de la catégorie | Lâché de zombies |
| fear_level | INT | NOT NULL| Informe sur l'intensité de l'activité sur /5| 4|
| score | INT | NOT NULL | Notation de l'activité sur /5| 5 |
| details | TEXT | NOT NULL| Décrit en détail l'activité| Grand 8 dans le noir....|
| id_category | INT | FOREIGN KEY/ NOT NULL/ Unique| Décrit en détaill'activité| Grand 8 dans le noir....|

## Table Ticket
stocke les informations sur les tickets des utilisateurs
| Nom du champ | Type | Les contraintes | Description | Exemple de valeur |
| --- | --- | --- | --- | --- |
| id | INT | Primary key/ Auto_increment/unique| Identifiant unique de la catégorie| 1 |
| price | INT | NOT NULL | Prix du billet | 50 |
| date_entrance | DATETIME | NOT NULL/ DEFAULT CURRENT_TIMESTAMP | Date entrée du parc | 2024-06-15 14:30:00 |


## Table Reservation

| Nom du champ | Type | Les contraintes | Description | Exemple de valeur |
| --- | --- | --- | --- | --- |
| id | INT | Primary key/ Auto_increment/unique| Identifiant unique de la catégorie| 1 |
| reference | INT | NOT NULL, unique | Reference unique | 12345678 |
| date_reservation | DATETIME | NOT NULL | date d'achat du billet  | 11/01/2026 |
| quantity | INT | quantité de billets  | 3 | 1 |
| id_user | INT | Foreign key | Référence à l'utilisateur qui a acheté le billet | 1 |
| id_ticket | INT | Foreign key | Référence au billet acheté | 1 |
