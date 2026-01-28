// src/lib/api.js
import { get } from "svelte/store";
import authStore from "./store/authStore.js";

/**
 * Fonction centrale pour faire des requêtes HTTP vers l'API
 * @param {string} endpoint - endpoint de l'API (ex: "/attractions" ou "/admin/users")
 * @param {string} method - méthode HTTP (GET, POST, PUT, DELETE)
 * @param {object|null} body - corps de la requête pour POST/PUT
 * @returns {Promise<object>} - réponse JSON de l'API
 */
export default async function api(endpoint, method = "GET", body = null) {
  // 1. Headers de base
  const headers = { "Content-Type": "application/json" };

  // 2. Injection automatique du token si connecté
  const { token } = get(authStore);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // 3. Options fetch
  const options = { method, headers };
  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  // 4. Requête vers l'API
  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, options);

  // 5. Gestion des erreurs
  if (!response.ok) {
    let errorMessage = "Erreur API";
    try {
      const data = await response.json();
      errorMessage = data.message || errorMessage;
    } catch (err) {
      // si réponse pas en JSON
      errorMessage = await response.text().catch(() => errorMessage);
    }
    throw new Error(errorMessage);
  }

  // 6. Retour JSON
  return response.json();
}
