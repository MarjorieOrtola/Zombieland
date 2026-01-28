// lib/services/api.js
import { get } from "svelte/store";
import authStore from "./store/authStore.js";

export default async function api(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const { token } = get(authStore); // toujours prendre le token actuel dans le store
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, options);

  if (!response.ok) {
    const text = await response.text().catch(() => "Erreur API");
    throw new Error(text);
  }

  return await response.json();
}
