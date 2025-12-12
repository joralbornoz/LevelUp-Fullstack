// src/services/adminService.js
import { authFetch } from "./apiClient";


const API_ADMIN = `${import.meta.env.VITE_API_AUTH_URL}/admin`;
const API_COMPRAS = `${import.meta.env.VITE_API_CATALOG_URL}/compras`;


export async function obtenerUsuariosAdmin() {
  try {
    const res = await authFetch(`${API_ADMIN}/usuarios`);

    if (!res.ok) {
      console.error("Error HTTP obtenerUsuariosAdmin:", res.status);
      return { ok: false, mensaje: "No se pudieron cargar los usuarios" };
    }

    const usuarios = await res.json();
    return { ok: true, usuarios };
  } catch (err) {
    console.error("Error obtenerUsuariosAdmin:", err);
    return { ok: false, mensaje: "Error de conexión con el servidor" };
  }
}


export async function obtenerComprasUsuarioAdmin(usuarioId) {
  try {
    // AHORA usamos el microservicio de catálogo
    const res = await authFetch(`${API_COMPRAS}/usuario/${usuarioId}`);

    if (!res.ok) {
      console.error("Error HTTP obtenerComprasUsuarioAdmin:", res.status);
      return { ok: false, mensaje: "No se pudieron cargar las compras" };
    }

    const compras = await res.json();
    return { ok: true, compras };
  } catch (err) {
    console.error("Error obtenerComprasUsuarioAdmin:", err);
    return { ok: false, mensaje: "Error de conexión con el servidor" };
  }
}


export async function actualizarRolUsuarioAdmin(usuarioId, nuevoRol) {
  try {
    const res = await authFetch(`${API_ADMIN}/usuarios/${usuarioId}/rol`, {
      method: "PUT",
      body: JSON.stringify({ rol: nuevoRol }),
    });

    if (!res.ok) {
      console.error("Error HTTP actualizarRolUsuarioAdmin:", res.status);
      return { ok: false, mensaje: "No se pudo actualizar el rol" };
    }

    const usuario = await res.json();
    return { ok: true, usuario };
  } catch (err) {
    console.error("Error actualizarRolUsuarioAdmin:", err);
    return { ok: false, mensaje: "Error de conexión con el servidor" };
  }
}


export async function actualizarPasswordUsuarioAdmin(usuarioId, password) {
  try {
    const res = await authFetch(`${API_ADMIN}/usuarios/${usuarioId}/password`, {
      method: "PUT",
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      console.error(
        "Error HTTP actualizarPasswordUsuarioAdmin:",
        res.status
      );
      return { ok: false, mensaje: "No se pudo actualizar la contraseña" };
    }

    const usuario = await res.json();
    return { ok: true, usuario };
  } catch (err) {
    console.error("Error actualizarPasswordUsuarioAdmin:", err);
    return { ok: false, mensaje: "Error de conexión con el servidor" };
  }
}


export async function actualizarDatosBasicosAdmin(usuarioId, nombre, email) {
  try {
    const res = await authFetch(`${API_ADMIN}/usuarios/${usuarioId}/datos`, {
      method: "PUT",
      body: JSON.stringify({ nombre, email }),
    });

    if (!res.ok) {
      console.error("Error HTTP actualizarDatosBasicosAdmin:", res.status);
      return { ok: false, mensaje: "No se pudieron actualizar los datos" };
    }

    const usuario = await res.json();
    return { ok: true, usuario };
  } catch (err) {
    console.error("Error actualizarDatosBasicosAdmin:", err);
    return { ok: false, mensaje: "Error de conexión con el servidor" };
  }
}


export async function eliminarUsuarioAdmin(usuarioId) {
  try {
    const res = await authFetch(`${API_ADMIN}/usuarios/${usuarioId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Error HTTP eliminar UsuarioAdmin:", res.status);
      return { ok: false, mensaje: "No se pudo eliminar el usuario" };
    }

    return { ok: true };
  } catch (err) {
    console.error("Error eliminarUsuarioAdmin:", err);
    return { ok: false, mensaje: "Error de conexión con el servidor" };
  }
}
