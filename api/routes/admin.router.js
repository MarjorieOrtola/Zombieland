import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";

const router = Router();


// USERS
router.get("/users", adminController.getAllUsers);
router.delete("/users/:id", adminController.deleteUser);

// ACTIVITIES
router.get("/activities", adminController.getAllActivities);
router.post("/activities", adminController.createActivity);
router.put("/activities/:id", adminController.updateActivity);
router.delete("/activities/:id", adminController.deleteActivity);

// RESERVATIONS
router.get("/reservations", adminController.getAllReservations);
router.delete("/reservations/:id", adminController.deleteReservation);

export default router;
