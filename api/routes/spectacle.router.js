import { Router } from "express";

// import d'une instance de ProductController
import * as spectacleController from "../controllers/spectacles.controller.js"; 



const router = Router();

// requete HTTP GET
router.get("/spectacles/", spectacleController.getAllSpectacles);

// requete HTTP GET
router.get("/spectacles/:id", spectacleController.getById);



export default router;