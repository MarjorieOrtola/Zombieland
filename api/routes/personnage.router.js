import { Router } from "express";

// import d'une instance de ProductController
import * as personnageController from "../controllers/personnages.controller.js";



const router = Router();

// requete HTTP GET
router.get("/personnages/", personnageController.getAllPersonnages);

// requete HTTP GET
router.get("/personnages/:id", personnageController.getById);



export default router;