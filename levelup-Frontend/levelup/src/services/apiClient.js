// src/services/apiClient.js
import { obtenerToken } from "./sesionService";

export async function authFetch(url, options = {}) {
  const token = obtenerToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
