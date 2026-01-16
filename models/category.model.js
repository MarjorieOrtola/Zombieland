// Import des classes et types Sequelize nécessaires à la définition du modèle
import {Sequelize, Model, DataTypes} from 'sequelize';

// instance de sequelize
import sequelize from './sequelize.client.js';

//déclare une classe du modele
class Category extends Model{
    //contenue de la classe vide
};

//creation de la table
Category.init(
    {
        name: {
            // type string
            type:DataTypes.STRING(100),
            // null interdit
            allowNull: false,
        },
    },
    // modelName ==> nom de la table à créer
    { sequelize, modelName: 'category' },
);

export default Category;