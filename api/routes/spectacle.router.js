import { Router } from "express";

// import d'une instance de ProductController
import spectacleController from "../controllers/spectacles.controller.js"; 



const router = Router();

// requete HTTP GET
router.get("/spectacles/", spectacleController.getAllSpectacle);

// requete HTTP GET
// router.get("/spectacle/:id");



export default router;