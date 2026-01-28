// src/lib/services/attraction.service.js
import api from "../api.js";

export const getAttractions = async () => {
  return await api("/attractions", "GET");
};

export const getAttractionById = async (id) => {
  return await api(`/attraction/${id}`, "GET");
};
