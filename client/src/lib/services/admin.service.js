import api from "../api.js";

// USERS
export const getAllUsers = () => api("/admin/users");
export const deleteUser = (id) => api(`/admin/users/${id}`, "DELETE");

// ACTIVITIES
export const getAllActivities = () => api("/admin/activities");
export const createActivity = (data) => api("/admin/activities", "POST", data);
export const updateActivity = (id, data) => api(`/admin/activities/${id}`, "PUT", data);
export const deleteActivity = (id) => api(`/admin/activities/${id}`, "DELETE");

// RESERVATIONS
export const getAllReservations = () => api("/admin/reservations");
export const deleteReservation = (id) => api(`/admin/reservations/${id}`, "DELETE");