import { Router } from "express";
// import d'une instance de ProductController
import attractionController from "../controllers/attractions.controller.js"; 



const router = Router();

// requete HTTP GET
router.get("/attractions", attractionController.getAllAttraction);

// requete HTTP GET
// router.get("/attraction/:id", AttractionController.getById);


export default router;