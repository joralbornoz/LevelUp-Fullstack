// src/services/comprasService.js
import { authFetch } from "./apiClient";

const API_URL = `${import.meta.env.VITE_API_CATALOG_URL}/compras`;


export async function obtenerComprasUsuario(usuarioId) {
  try {
    const res = await authFetch(`${API_URL}/usuario/${usuarioId}`);

    if (res.status === 401 || res.status === 403) {
      console.error("No autorizado al obtener compras:", res.status);
      return {
        ok: false,
        mensaje: "Sesión expirada. Inicia sesión nuevamente.",
      };
    }

    if (!res.ok) {
      console.error("Error HTTP obtenerComprasUsuario:", res.status);
      return { ok: false, mensaje: "No se pudo cargar el historial" };
    }

    const compras = await res.json();
    return { ok: true, compras };
  } catch (err) {
    console.error("Error obtenerComprasUsuario:", err);
    return { ok: false, mensaje: "Error de conexión con el servidor" };
  }
}


export async function registrarCompra(usuarioId, items, total) {
  try {
    const payload = {
      items: items.map((it) => ({
        codigoProducto: it.codigo,
        nombreProducto: it.nombre,
        cantidad: it.cantidad ?? 1,
        precioUnitario: it.precio ?? it.precioNumero ?? 0,
      })),
      total,
    };

    const res = await authFetch(`${API_URL}/usuario/${usuarioId}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.status === 401 || res.status === 403) {
      console.error("No autorizado al registrar compra:", res.status);
      return {
        ok: false,
        mensaje: "Sesión expirada. Inicia sesión nuevamente.",
      };
    }

    if (!res.ok) {
      console.error("Error HTTP registrarCompra:", res.status);
      return { ok: false, mensaje: "No se pudo registrar la compra" };
    }

    const compra = await res.json();
    return { ok: true, compra };
  } catch (err) {
    console.error("Error registrarCompra:", err);
    return { ok: false, mensaje: "Error de conexión con el servidor" };
  }
}
