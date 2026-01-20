import { Router } from "express";

// import d'une instance de ProductController
import authController from "../controllers/auth.controller.js"; 

// import { validateUser, validateToken } from '../middlewares/auth.middleware.js';

// import { validateUser } from '../middlewares/auth.middleware.js';

const router = Router();

// requete HTTP POST /auth/register (route pour l'inscription)
router.post("/auth/register", validateUser, authController.registerUser);


// Recoit les requetes de connexion
// router.post('/auth/login', validateUser, authController.login)

// router.get('/auth/me', validateToken, authController.getMe)

export default router;