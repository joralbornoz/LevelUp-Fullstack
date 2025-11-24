import { authFetch } from "./apiClient";

const API_URL = "http://localhost:8080/api/usuarios";

export async function actualizarPerfil(usuarioActual, datosNuevos) {
  if (!usuarioActual?.id) {
    return { ok: false, mensaje: "Usuario inválido" };
  }

  const payload = {
    direccion: datosNuevos.direccion,
    preferencias: datosNuevos.preferencias,
  };

  try {
    const res = await authFetch(`${API_URL}/${usuarioActual.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (res.status === 401) {
      return { ok: false, mensaje: "Sesión expirada. Inicia sesión otra vez." };
    }

    if (!res.ok) {
      const texto = await res.text().catch(() => "");
      console.error("Error HTTP actualizarPerfil:", res.status, texto);
      return { ok: false, mensaje: "Error al actualizar el perfil" };
    }

    const usuario = await res.json();
    return { ok: true, usuario };
  } catch (err) {
    console.error("Error actualizarPerfil:", err);
    return { ok: false, mensaje: "No se pudo conectar con el servidor" };
  }
}
