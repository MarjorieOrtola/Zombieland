
import { Router } from "express";
// import d'une instance de ProductController
import reservationController from "../controllers/reservation.Controller.js"
import { validateToken } from "../middlewares/auth.middleware.js";



const router = Router();

// requete HTTP GET
router.get("/tickets/", reservationController.getTicket);

// requete HTTP POST
router.post("/tickets/reservation", validateToken,reservationController.createReservation);


export default router;