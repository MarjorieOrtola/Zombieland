import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";

const router = Router();


// USERS
router.get("/admin/users", adminController.getAllUsers);
router.delete("/admin/users/:id", adminController.deleteUser);

// ACTIVITIES
router.get("/admin/activities", adminController.getAllActivities);
router.post("/admin/activities", adminController.createActivity);
router.put("/admin/activities/:id", adminController.updateActivity);
router.delete("/admin/activities/:id", adminController.deleteActivity);

// RESERVATIONS
router.get("/admin/reservations", adminController.getAllReservations);
router.delete("/admin/reservations/:id", adminController.deleteReservation);

export default router;
