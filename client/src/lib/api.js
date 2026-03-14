import { get } from "svelte/store";
import authStore from "./store/authStore.js";

export default async function api(endpoint, method = "GET", body = null) {
  const headers = { "Content-Type": "application/json" };

  const storeToken = get(authStore).token;
  const localToken = localStorage.getItem("token");
  const token = storeToken || localToken;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = { method, headers };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, options);

  if (!response.ok) {
    let errorMessage = "Erreur API";
    try {
      const data = await response.json();
      errorMessage = data.message || errorMessage;
    } catch {
      errorMessage = await response.text().catch(() => errorMessage);
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
