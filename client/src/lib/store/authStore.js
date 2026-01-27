// lib/store/authStore.js
import { writable } from "svelte/store";

// Récupération depuis localStorage au démarrage
const token = localStorage.getItem("token");
const user = token ? JSON.parse(localStorage.getItem("user")) : null;

// Store principal
const authStore = writable({ user, token });

// Export par défaut
export default authStore;

// Met à jour le store + localStorage
export const setAuth = (user, token) => {
  authStore.set({ user, token });

  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");

  if (user) localStorage.setItem("user", JSON.stringify(user));
  else localStorage.removeItem("user");
};

// Vide le store et le localStorage
export const clearAuth = () => setAuth(null, null);
