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

      // Validation quantité
      if (!quantity || quantity <= 0 || quantity > 99) {
        throw new HttpError(
          "La quantité doit être comprise entre 1 et 99",
          400,
        );
      }

      // Validation date obligatoire
      if (!date_entrance) {
        throw new HttpError("Date de visite obligatoire", 400);
      }

      const visitDate = new Date(date_entrance);

      // Vérifie si la date est valide
      if (isNaN(visitDate.getTime())) {
        throw new HttpError("Date de visite invalide", 400);
      }

      const today = new Date();

      // Interdire une date hors année en cours
      const currentYear = today.getFullYear();
      if (visitDate.getFullYear() !== currentYear) {
        throw new HttpError(
          `La réservation doit être effectuée sur une date de l'année ${currentYear}`,
          400,
        );
      }

      const user = await User.findByPk(userId);
      if (!user) throw new HttpError("Utilisateur introuvable", 404);

      const ticket = await Ticket.findByPk(ticket_id);
      if (!ticket) throw new HttpError("Ticket introuvable", 404);

      const randomReference = Math.floor(100000 + Math.random() * 900000);

      const reservationCreated = await Reservation.create({
        user_id: user.id,
        ticket_id: ticket.id,
        quantity,
        date_entrance,
        reference: randomReference,
      });

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
      console.error("Erreur création réservation :", error);
      console.error("Erreur Sequelize détaillée :", error?.errors);
      next(error);
    }
  },

  async deleteReservation(req, res, next) {
    try {
      const userId = req.user.id; // utilisateur connecté
      const reservationId = req.params.id;

      // Récupérer la réservation
      const reservation = await Reservation.findOne({
        where: { id: reservationId, user_id: userId },
      });

      if (!reservation) {
        return res.status(404).json({ message: "Réservation introuvable" });
      }

      // Vérifier la date limite (10 jours avant la date de visite)
      const today = new Date();
      const visitDate = new Date(reservation.date_entrance);
      const diffDays = Math.ceil((visitDate - today) / (1000 * 60 * 60 * 24)); // nombre de jours restants

      if (diffDays <= 10) {
        return res.status(400).json({
          message:
            "Impossible de supprimer la réservation moins de 10 jours avant la visite.",
        });
      }

      await reservation.destroy(); // supprime la réservation

      res.json({ message: "Réservation supprimée avec succès" });
    } catch (err) {
      next(err);
    }
  },
};

export default reservationController;
