CATEGORY (id, name)
ACTIVITY (id, name, fear_level, picture, details,#CATEGORY(id))
USER (id, username, firstname, login, mail, adress, phone_number, rule)
TICKET(id, price, date_entrance)
RESERVATION(id, date, quantity, #user(id), #ticket(id))


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
| id | INT | Primary key/ Auto_increment/unique| Identifiant unique de user | 1 |
| login_name | VARCHAR(255) | NOT NULL, Unique| mot de passe de user | 1234 |
| username | VARCHAR(255) | NOT NULL, Unique| nom de user  | Marion |
| firstname | VARCHAR(255) | NOT NULL, Unique| nom de user  |  Dubois |
| mail | VARCHAR(255) | NOT NULL, Unique| mail de user  | Mariondubois@gmail.com |
| adress | VARCHAR(255) | NOT NULL, | adresse de user  | 1.rue de la république. 31000 Toulouse |
| phone_number | INT | NOT NULL, Unique| numb de tel de user | 05 08 05 34 98|
| rule | VARCHAR(255) | NOT NULL| role de l'identifiant  | admin|


## Table activity
stocke les informations des activités
| Nom du champ | Type | Les contraintes | Description | Exemple de valeur |
| --- | --- | --- | --- | --- |
| id | INT | Primary key/ Auto_increment/unique| Identifiant unique de la catégorie| 1 |
| name | VARCHAR(100) | NOT NULL, Unique| Nom de la catégorie | Lâché de zombies |
| fear_level | INT | NOT NULL| Informe sur l'intensité de l'activité sur /5| 4|
| picture | IMG | NOT NULL | image de l'attraction | |
| details | TEXT | NOT NULL| Décrit en détail l'activité| Grand 8 dans le noir....|
| id_category | INT | FOREIGN KEY/ NOT NULL/ Unique| Décrit en détaill'activité| Grand 8 dans le noir....|

## Table Ticket
stocke les informations sur les tickets des utilisateurs
| Nom du champ | Type | Les contraintes | Description | Exemple de valeur |
| --- | --- | --- | --- | --- |
| id | INT | Primary key/ Auto_increment/unique| Identifiant unique de la catégorie| 1 |
| price | INT | NOT NULL | Prix du billet | 50 |
| date | DATETIME | NOT NULL/ DEFAULT CURRENT_TIMESTAMP | Date d'achat du billet | 2024-06-15 14:30:00 |


## Table Reservation
stocke les informations sur les roles
| Nom du champ | Type | Les contraintes | Description | Exemple de valeur |
| --- | --- | --- | --- | --- |
| id | INT | Primary key/ Auto_increment/unique| Identifiant unique de la catégorie| 1 |
| date | date | NOT NULL | date d'achat de billet  | 11/01/2026 |
| quantity | INT | quantité de billet  | 1 |
| id_user | INT | Foreign key | Référence à l'utilisateur qui a acheté le billet | 1 |
| id_ticket | INT | Foreign key | Référence au billet acheté | 1 |

