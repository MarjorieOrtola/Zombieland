// Import des classes et types Sequelize nécessaires à la définition du modèle
import { Sequelize, Model, DataTypes } from "sequelize";

// Instance de sequelize
import sequelize from "./sequelize.client.js";

// Déclare une classe du modele
class Activity extends Model {
  // Contenue de la classe vide
}

// Creation de la table
Activity.init(
  {
    name: {
      // Type string
      type: DataTypes.STRING(100),
      // Null interdit
      allowNull: false,
    },
    fear_level: {
      // Type integer (nombre entier)
      type: DataTypes.INTEGER,
      // Null interdit
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      // Type texte
      type: DataTypes.TEXT,
      // Null interdit
      allowNull: false,
    },
  },
  // modelName ==> nom de la table à créer
  { sequelize, modelName: "activity" },
);

export default Activity;
