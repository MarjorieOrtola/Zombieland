import api from "../api.js";

export const getSpectacles = async () => {
  return await api("/spectacles", "GET");
};

export const getSpectacleById = async (id) => {
  return await api(`/spectacle/${id}`, "GET");
};