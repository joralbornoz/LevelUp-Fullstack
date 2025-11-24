// src/services/sesionService.js

const CLAVE_USUARIO = "usuario";
const CLAVE_TOKEN = "token";

export function guardarUsuario(usuario) {
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
}

export function obtenerUsuario() {
  const data = localStorage.getItem(CLAVE_USUARIO);
  return data ? JSON.parse(data) : null;
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_USUARIO);
  localStorage.removeItem(CLAVE_TOKEN);
}

export function guardarToken(token) {
  localStorage.setItem(CLAVE_TOKEN, token);
}

export function obtenerToken() {
  return localStorage.getItem(CLAVE_TOKEN);
}
