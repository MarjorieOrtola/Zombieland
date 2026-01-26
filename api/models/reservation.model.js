// Import des classes et types Sequelize nécessaires
import { Sequelize, Model, DataTypes } from 'sequelize';
// Instance de sequelize
import sequelize from './sequelize.client.js';

// Déclare une classe du modèle Reservation
class Reservation extends Model {}

// Création de la table Reservation
Reservation.init(
    {
        
        reference: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    },

    // Nom de la table
    {   sequelize, modelName: 'reservation', 
        tableName: 'reservation', // si tu veux forcer le nom de la table
        timestamps: true,         // active createdAt et updatedAt
        createdAt: 'date_reservation', // renomme createdAt en date_reservation
        updatedAt: false,  
    }           // si tu ne veux pas de updatedAt}
);

export default Reservation;
