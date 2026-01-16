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
        price: {
            // type integer
            type: DataTypes.INTEGER,
            // Null interdit
            allowNull: false,
        },

        date_entrance: {
            // Type date
            type: DataTypes.DATE,
            // Null interdit
            allowNull: false,
        },
    },
    // modelName ==> nom de la table à créer
    { sequelize, modelName: 'ticket' },
);

export default Ticket;