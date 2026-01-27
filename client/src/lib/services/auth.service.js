// lib/services/auth.service.js
import api from "../api.js";
import { setAuth } from "../store/authStore.js";

/**
 * Connecte un utilisateur et récupère token + user
 * credentials: { mail, password }
 */
export const loginUser = async (credentials) => {
  // 1 login pour récupérer le token
  const { token } = await api("/login", "POST", credentials);

  // 2 stocker le token immédiatement dans le store pour que api() l'utilise
  setAuth(null, token);

  // 3 récupérer les infos utilisateur
  const user = await api("/myaccount", "GET");

  // 4 mettre à jour le store avec le user complet
  setAuth(user, token);

  return { token, user };
};

/**
 * Récupère l'utilisateur connecté
 */
export const getUser = async () => {
  return await api("/myaccount", "GET");
};

/**
 * Inscription d'un nouvel utilisateur
 */
export const registerUser = async (user) => {
  return await api("/register", "POST", user);
};
