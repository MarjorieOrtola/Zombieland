import api from "../api.js";

// Supprimer une réservation par ID
export const deleteReservation = async (id) => {
  return await api(`/reservations/${id}`, "DELETE");
};
