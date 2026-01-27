// Déclaration des relations entre les modèles
import Activity from "./activity.model.js";
import Category from "./category.model.js";
import Ticket from "./ticket.model.js";
import User from "./user.model.js";
import Reservation from "./reservation.model.js";

// Association 1 - N
// 1 Activité appartient à 1 Catégorie

Activity.belongsTo(
  Category,
  // Configuration de l'association
  {
    // Nom de la colonne qui contient la clé étrangère
    foreignKey: "category_id",
    // Alias = Nom de la relation entre Activity et Catégorie
    // belongs to: one category ==> donc alias au singulier
    as: "category",
  },
);

// 1 Catégorie possede N Activité

Category.hasMany(
  Activity,
  // Configuration de l'association
  {
    // Nom de la colonne qui contient la clé étrangère
    // La même que pour belongsTo Activity
    foreignKey: "category_id",
    // Alias = Nom de la relation entre Categorie et Activity
    // has many Activity ==> alias = activities
    as: "activities",
  },
);

// Association N - N
// 1 User reserve N Ticket
// Pour récupérer les tickets d’un utilisateur et les utilisateurs d’un ticket (sans infos de la réservation)
User.belongsToMany(Ticket, {
  // Nom de la table pivot entre User et Ticket
  through: {
    model: Reservation,
    unique: false,
  },
  // On configure la table pivot
  // Clé étrangère dans la table pivot vers la table user
  foreignKey: "user_id",
  // Clé étrangère dans la table pivot vers la table ticket
  otherKey: "ticket_id",
  // Alias : 1 User belongs to many Ticket ==> tickets
  as: "tickets",
});

Ticket.belongsToMany(User, {
  // Nom de la table pivot entre User et Ticket
  through: Reservation,
  // On configure la table pivot
  // Clé étrangère dans la table pivot vers la table user
  foreignKey: "ticket_id",
  // Clé étrangère dans la table pivot vers la table ticket
  otherKey: "user_id",
  // Alias : 1 User belongs to many Ticket ==> tickets
  as: "users",
});

//Une relation 1-N User → Reservation, pour que Sequelize puisse faire user.reservations
// Une relation 1-N Ticket → Reservation, pour que chaque réservation connaisse son ticket
// Pour récupérer toutes les informations de la réservation, incluant date_entrance, quantity, reference

User.hasMany(Reservation, {
  foreignKey: "user_id",
  as: "reservations",
});

Reservation.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Reservation.belongsTo(Ticket, {
  foreignKey: "ticket_id",
  as: "ticket",
});

Ticket.hasMany(Reservation, {
  foreignKey: "ticket_id",
  as: "reservations",
});

// Ici on fait l'export des Modèles enrichit de leurs relations entre eux eux
export { Activity, Category, Ticket, User, Reservation };
