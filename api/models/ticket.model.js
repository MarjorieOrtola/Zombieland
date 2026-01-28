// Import des classes et types Sequelize nécessaires à la définition du modèle
import {Sequelize, Model, DataTypes} from 'sequelize';

// Instance de sequelize
import sequelize from './sequelize.client.js';

// Déclare une classe du modele
class Ticket extends Model{
    // Contenue de la classe vide
};

// Creation de la table
Ticket.init(
    {
        name: {
            // type integer
            type: DataTypes.STRING(50),
            // Null interdit
            allowNull: false,
            defaultValue:"Pass journée"
        },
        price: {
            // type integer
            type: DataTypes.INTEGER,
            // Null interdit
            allowNull: false,
            //Valeur par défaut
            defaultValue: 50
        },
       
    },
    // modelName ==> nom de la table à créer
    { sequelize, modelName: 'ticket' },
);

export default Ticket;