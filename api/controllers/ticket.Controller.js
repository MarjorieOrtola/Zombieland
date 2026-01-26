import { User, Ticket } from "../models/index.js";
import HttpError from "../utils/HttpError.js";

const ticketController = {
  async getTicket(req, res) {
    const ticket = await Ticket.findAll();
    console.log("ticket", ticket);
    res.json(ticket);
  },

  async createReservation(req, res, next) {
    try {
      // utilisateur connecté (JWT)
      const userId = req.user.id;

      // extraction du body
      const { ticket_id, quantity, date_entrance } = req.body;

      //  Vérification minimum un billet acheté
      if (!quantity || quantity <= 0) {
        throw new HttpError("Quantité invalide", 400);
      }

      // On récupère le user
      const user = await User.findByPk(userId);
      if (!user) {
        throw new HttpError("Utilisateur introuvable", 404);
      }

      // On récupère le ticket
      const ticket = await Ticket.findByPk(ticket_id);
      if (!ticket) {
        throw new HttpError("Ticket introuvable", 404);
      }

      // Mise à jour de la date de visite (choix de l'utilisateur)
      await ticket.update({ date_entrance });

      // Enregistrer la nouvelle réservation dans la BDD
      // nombre aléatoire pour la réservation
      const randomReference = Math.floor(100000 + Math.random() * 900000);

      const newReservation = await user.addTicket(ticket, {
        through: {
          quantity, // nombre de tickets réservés
          reference:randomReference, // référence arbitraire
          // date_reservation sera automatique grâce à createdAt renommé
        },
      });

      // Si l'enregistrement a échoué ==> renvoyer une erreur 500
      // newReservatin est null ==> l'ajout d'une réservation a échoué
      if (!newReservation) {
        const errorNotFound = new HttpError(`La demande a échoué`, 500);
        // J'ai créé une nouvelle erreur, je vais la lancer pour qu'elle soit attrapée par le catch
        // toutes les instruction après le throw ne seront pas exécutées
        throw errorNotFound;
      }

      // Si l'enregistrement a réussi ==> renvoyer l'utilisateur avec un code 201
      // Juste renvoyer l'ID de la réservation.
      res.status(201).json({
        // Je renvois uniquement l'ID du nouvel utilisateur
        message: "Réservation créée avec succès",
        randomReference,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ticketController;
