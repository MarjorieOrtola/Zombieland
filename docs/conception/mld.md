


CATEGORY (id, name)
ACTIVITY (id, name, fear_level, score, details,#CATEGORY(id))
USER (id, login_name, mail)
TICKET(id, price, date, #USER(id))
Role (id, name, #USER(id))

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
| name | VARCHAR(255) | NOT NULL, Unique| nom de user  | Marion Dubois |
| mail | VARCHAR(255) | NOT NULL, Unique| mail de user  | Mariondubois@gmail.com |


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
| date | DATETIME | NOT NULL/ DEFAULT CURRENT_TIMESTAMP | Date d'achat du billet | 2024-06-15 14:30:00 |
| id_user | INT | Foreign key | Référence à l'utilisateur qui a acheté le billet | 1 |

## Table Role
stocke les informations sur les roles
| Nom du champ | Type | Les contraintes | Description | Exemple de valeur |
| --- | --- | --- | --- | --- |
| id | INT | Primary key/ Auto_increment/unique| Identifiant unique de la catégorie| 1 |
| name | VARCHAR(100) | NOT NULL, Unique| role unique du user | User |
| id_user | INT | Foreign key | role unique du user | 1 |

<!--- ajout table de liaisons -->