import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";
import {
  validateCreateActivity,
  validateUpdateActivity, 
  
} from "../middlewares/activity.middleware.js";
import {validateId} from "../middlewares/validateId.middleware.js"
const router = Router();


// USERS
router.get("/admin/users", adminController.getAllUsers);
router.delete("/admin/users/:id", validateId, adminController.deleteUser);

// ACTIVITIES
router.get("/admin/activities", adminController.getAllActivities);
router.post("/admin/activities", validateCreateActivity, adminController.createActivity);
router.put("/admin/activities/:id",validateId,
  validateUpdateActivity, adminController.updateActivity);
router.delete("/admin/activities/:id", validateId, adminController.deleteActivity);

// RESERVATIONS
router.get("/admin/reservations", adminController.getAllReservations);
router.delete("/admin/reservations/:id", adminController.deleteReservation);

export default router;
