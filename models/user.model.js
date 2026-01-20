// Import des classes et types Sequelize nécessaires à la définition du modèle
import {Sequelize, Model, DataTypes} from 'sequelize';

// Instance de sequelize
import sequelize from './sequelize.client.js';

// Déclare une classe du modele
class User extends Model{
    // Contenue de la classe vide
};

// Creation de la table
User.init(
    {
        first_name: {
            // Type string
            type: DataTypes.STRING(100),
            // Null interdit
            allowNull: false,
        },
        last_name: {
            // Type string
            type: DataTypes.STRING(100),
            // Null interdit
            allowNull: false,
        },
        mail: {
            // Type string
            type: DataTypes.STRING(255),
            // Null interdit
            allowNull: false,
        },
        password: {
            // Type string
            type: DataTypes.STRING(255),
            // Null interdit
            allowNull: false,
        },
        address: {
            // Type string
            type: DataTypes.STRING(255),
            // Null interdit
            allowNull: false,
        },
        city: {
            // Type string
            type: DataTypes.STRING(255),
            // Null interdit
            allowNull: false,
        },
        postcode: {
            // Type string
            type: DataTypes.STRING(10),
            // Null interdit
            allowNull: false,
        },
        phone_number: {
            // Type string
            type: DataTypes.STRING(20),
            // Null interdit
            allowNull: false,
        },
        role: {
            // Type string
            type: DataTypes.STRING(20),
            // Null interdit
            allowNull: false,
            // Valeur par défaut
            defaultValue: 'user',
        },
    },
    // modelName ==> nom de la table à créer
    { sequelize, modelName: 'user' },
);

export default User;