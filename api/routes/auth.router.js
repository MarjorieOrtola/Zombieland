import { Router } from "express";

// import d'une instance de ProductController
import authController from "../controllers/auth.controller.js";
import { validateUser, validateLogin, validateToken } from "../middlewares/auth.middleware.js"; 

// import { validateUser } from '../middlewares/auth.middleware.js';

const router = Router();

// requete HTTP POST /auth/register (route pour l'inscription)
router.post("/register", validateUser, authController.registerUser);


// Recoit les requetes de connexion
router.post('/login', validateLogin, authController.login)


// requête HTTP GET pour accéder au compte client avec les informations ET les réservations.
router.get('/myaccount', validateToken, authController.getMyAccount)

export default router;