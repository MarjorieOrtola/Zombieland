
import { Router } from "express";
// import d'une instance de ProductController
import ticketController from "../controllers/ticket.Controller.js"
import { validateToken } from "../middlewares/auth.middleware.js";



const router = Router();

// requete HTTP GET
router.get("/tickets/", ticketController.getTicket);

// requete HTTP POST
router.post("/tickets/reservation", validateToken,ticketController.createReservation);


export default router;