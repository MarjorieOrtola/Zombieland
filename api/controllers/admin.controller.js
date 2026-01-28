import { User, Activity, Reservation, Category} from "../models/index.js";

// USERS
export const getAllUsers = async (req, res) => {
  const users = await User.findAll({ attributes: ["id","first_name","last_name","mail","role"] });
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "Utilisateur supprimé" });
};

// ACTIVITIES
export const getAllActivities = async (req, res) => {
  const activities = await Activity.findAll({ include: "category" });
  res.json(activities);
};

export const createActivity = async (req, res) => {
  const activity = await Activity.create(req.body);
  res.json(activity);
};

export const updateActivity = async (req, res) => {
  await Activity.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Activité mise à jour" });
};

export const deleteActivity = async (req, res) => {
  await Activity.destroy({ where: { id: req.params.id } });
  res.json({ message: "Activité supprimée" });
};

// RESERVATIONS
export const getAllReservations = async (req, res) => {
  const reservations = await Reservation.findAll({
    include: ["user","ticket"],
  });
  res.json(reservations);
};

export const deleteReservation = async (req, res) => {
  await Reservation.destroy({ where: { id: req.params.id } });
  res.json({ message: "Réservation supprimée" });
};
