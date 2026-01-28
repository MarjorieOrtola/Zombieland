// src/lib/services/activity.service.js
import api from "../api.js";

export const getActivitiesByCategory = async (category) => {
  return await api(`/activities/${category}`, "GET");
};

export const getActivityByCategoryAndId = async (category, id) => {
  return await api(`/activities/${category}/${id}`, "GET");
};
