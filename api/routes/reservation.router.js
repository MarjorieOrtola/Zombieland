
import { Router } from "express";
// import d'une instance de ProductController
import reservationController from "../controllers/reservation.controller.js"
import { validateToken } from "../middlewares/auth.middleware.js";



const router = Router();

// requete HTTP GET affiche les tickets sur la page
router.get("/tickets/", reservationController.getTickets);

// requete HTTP POST
router.post("/tickets/reservation", validateToken,reservationController.createReservation);

// requete HTTP DELETE pour supprimer nos réservations
router.delete("/reservations/:id", validateToken, reservationController.deleteReservation);


export default router;