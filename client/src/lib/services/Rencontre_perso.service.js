import api from "../api.js";

export const getPersonnages = async () => {
  return await api("/personnages", "GET");
};

export const getPersonnageById = async (id) => {
  return await api(`/personnage/${id}`, "GET");
};