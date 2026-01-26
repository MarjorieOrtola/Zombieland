import { User, Ticket, Reservation } from "../models/index.js";
import HttpError from "../utils/HttpError.js";

const ticketController = {
  async getTicket(req, res) {
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

      // Mise à jour de la date choisie par l'utilisateur
      await ticket.update({ date_entrance });

      const randomReference = Math.floor(100000 + Math.random() * 900000);

      // 🔹 Création directe dans la table pivot
      const reservationCreated = await Reservation.create({
        user_id: user.id,
        ticket_id: ticket.id,
        quantity,
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
        date_entrance: ticket.date_entrance,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ticketController;
