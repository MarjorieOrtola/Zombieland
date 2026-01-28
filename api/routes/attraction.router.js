
import { Router } from "express";
import * as attractionController from "../controllers/attractions.controller.js";

const router = Router();

router.get("/attractions", attractionController.getAllAttraction);
router.get("/attraction/:id", attractionController.getById);

export default router;
