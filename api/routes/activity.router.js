
// routes/activity.routes.js
import { Router } from "express";
import * as activityController from "../controllers/activity.controller.js";

const router = Router();

router.get("/activities/:category", activityController.getByCategory);
router.get("/activities/:category/:id", activityController.getByCategoryAndId);

export default router;
