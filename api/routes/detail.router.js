import { Router } from "express";
import { getActivityDetail } from "../controllers/detail.controller.js";

const router = Router();

router.get("/:id", getActivityDetail);

export default router;