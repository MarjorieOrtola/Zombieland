// Import des classes et types Sequelize nécessaires à la définition du modèle
import {Sequelize, Model, DataTypes} from 'sequelize';

// Instance de sequelize
import sequelize from './sequelize.client.js';

// Déclare une classe du modele
class Category extends Model{
    // Contenue de la classe vide
};

// Creation de la table
Category.init(
    {
        name: {
            // Type string
            type:DataTypes.STRING(100),
            // Null interdit
            allowNull: false,
        },
    },
    // modelName ==> nom de la table à créer
    { sequelize, modelName: 'category' },
);

export default Category;