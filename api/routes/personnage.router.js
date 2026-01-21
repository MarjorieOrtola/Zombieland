import { Router } from "express";

// import d'une instance de ProductController
import personnageController from "../controllers/personnages.controller.js"; 



const router = Router();

// requete HTTP GET
router.get("/personnages/", personnageController.getAllPersonnage);

// requete HTTP GET
// router.get("/personnage/:id");



export default router;