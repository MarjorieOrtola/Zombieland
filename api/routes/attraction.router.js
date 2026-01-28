
import { Router } from "express";
import * as attractionController from "../controllers/attractions.controller.js";

const router = Router();

router.get("/attractions", attractionController.getAllAttractions);
router.get("/attractions/:id", attractionController.getById);

export default router;
