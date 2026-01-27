import { User, Ticket, Reservation } from "../models/index.js";
import HttpError from "../utils/HttpError.js";

const reservationController = {
  async getTickets(req, res) {
    try {
      const tickets = await Ticket.findAll();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createReservation(req, res, next) {
    try {
      const userId = req.user.id;
      const { ticket_id, quantity, date_entrance } = req.body;

      if (!quantity || quantity <= 0) {
        throw new HttpError("Quantité invalide", 400);
      }

      const user = await User.findByPk(userId);
      if (!user) throw new HttpError("Utilisateur introuvable", 404);

      const ticket = await Ticket.findByPk(ticket_id);
      if (!ticket) throw new HttpError("Ticket introuvable", 404);

      if (!date_entrance) {
        throw new HttpError("Date de visite obligatoire", 400);
      }

      const randomReference = Math.floor(100000 + Math.random() * 900000);

      // Création directe dans la table pivot
      const reservationCreated = await Reservation.create({
        user_id: user.id,
        ticket_id: ticket.id,
        quantity,
        date_entrance,
        reference: randomReference,
      });

      // Envoi de la réponse complète
      res.status(201).json({
        message: "Réservation créée avec succès",
        ticket_id: ticket.id,
        ticket_name: ticket.name,
        quantity: reservationCreated.quantity,
        reference: reservationCreated.reference,
        date_reservation: reservationCreated.date_reservation,
        date_entrance: reservationCreated.date_entrance,
      });
    } catch (error) {
      next(error);
    }
  },

async deleteReservation(req, res, next) {
  try {
    const userId = req.user.id;        // utilisateur connecté
    const reservationId = req.params.id;

    // Récupérer la réservation
    const reservation = await Reservation.findOne({
      where: { id: reservationId, user_id: userId }
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    // Vérifier la date limite (10 jours avant la date de visite)
    const today = new Date();
    const visitDate = new Date(reservation.date_entrance);
    const diffDays = Math.ceil((visitDate - today) / (1000 * 60 * 60 * 24)); // nombre de jours restants

    if (diffDays <= 10) {
      return res.status(400).json({ message: "Impossible de supprimer la réservation moins de 10 jours avant la visite." });
    }

    await reservation.destroy(); // supprime la réservation

    res.json({ message: "Réservation supprimée avec succès" });
  } catch (err) {
    next(err);
  }
}
}


export default reservationController;
