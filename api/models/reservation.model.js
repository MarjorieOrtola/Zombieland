// Import des classes et types Sequelize nécessaires
import { Sequelize, Model, DataTypes } from "sequelize";
// Instance de sequelize
import sequelize from "./sequelize.client.js";

// Déclare une classe du modèle Reservation
class Reservation extends Model {}

// Création de la table Reservation
Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // clé primaire auto-incrémentée
    },
    reference: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_entrance: {
      // Type date
      type: DataTypes.DATEONLY,
      // Null interdit
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "reservation",
    tableName: "reservation",
    timestamps: true,
    createdAt: "date_reservation",
    updatedAt: false,
  },
);

export default Reservation;
