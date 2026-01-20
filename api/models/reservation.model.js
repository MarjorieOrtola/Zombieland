// Import des classes et types Sequelize nécessaires
import { Sequelize, Model, DataTypes } from 'sequelize';
// Instance de sequelize
import sequelize from './sequelize.client.js';

// Déclare une classe du modèle Reservation
class Reservation extends Model {}

// Création de la table Reservation
Reservation.init(
    {
        date_reservation: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Date de création par défaut
        },
        reference: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    
    
    },

    // Nom de la table
    { sequelize, modelName: 'reservation', }
);

export default Reservation;
