// src/services/authService.js

const API_USUARIOS = "http://localhost:8080/api/usuarios";
const API_AUTH = "http://localhost:8080/api/auth";

// ----- REGISTRO -----
export async function registrarUsuario(datos) {
  const { nombre, email, edad, password, preferencias } = datos;

  if (!nombre || !email || !edad || !password) {
    return { ok: false, mensaje: "Todos los campos son obligatorios" };
  }

  if (Number(edad) < 18) {
    return {
      ok: false,
      mensaje: "Debes tener al menos 18 años para registrarte",
    };
  }

  if (password.length < 6) {
    return {
      ok: false,
      mensaje: "La contraseña debe tener al menos 6 caracteres",
    };
  }

  if (!preferencias || preferencias.length < 3) {
    return {
      ok: false,
      mensaje: "Debe ingresar una preferencia mayor a 3 caracteres",
    };
  }

  try {
    const res = await fetch(API_USUARIOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        email,
        edad: Number(edad),
        password,
        preferencias,
      }),
    });

    if (!res.ok) {
      return {
        ok: false,
        mensaje: "Error al registrar usuario en el servidor",
      };
    }

    const usuario = await res.json();

    let mensajeExtra = "";
    if (email.endsWith("@duocuc.cl")) {
      mensajeExtra = "Registro exitoso. Tienes 20% de descuento de por vida";
    } else {
      mensajeExtra = "Registro exitoso";
    }

    return { ok: true, mensaje: mensajeExtra, usuario };
  } catch (error) {
    console.error("Error en registrar Usuario:", error);
    return {
      ok: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
}


export async function loginUsuario(email, password) {
  if (!email || !password) {
    return { ok: false, mensaje: "Debe ingresar correo y contraseña." };
  }

  try {
    const res = await fetch(`${API_AUTH}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { ok: false, mensaje: "Correo o contraseña incorrectos." };
    }

    const data = await res.json(); 

    if (!data || !data.token || !data.usuario) {
      return { ok: false, mensaje: "Respuesta de login inválida." };
    }

    return { ok: true, token: data.token, usuario: data.usuario };
  } catch (error) {
    console.error("Error en login Usuario:", error);
    return {
      ok: false,
      mensaje: "No se pudo conectar. Intenta nuevamente.",
    };
  }
}

