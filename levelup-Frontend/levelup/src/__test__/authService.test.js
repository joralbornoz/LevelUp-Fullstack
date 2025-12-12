import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginUsuario, registrarUsuario } from "../services/authService";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("authService", () => {
  it("loginUsuario: ok true cuando API responde 200 con token y usuario", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: "abc", usuario: { rol: "ADMIN", email: "a@a.cl" } }),
    });

    const res = await loginUsuario("a@a.cl", "123456");
    expect(res.ok).toBe(true);
    expect(res.token).toBe("abc");
    expect(res.usuario.rol).toBe("ADMIN");
  });

  it("loginUsuario: ok false cuando faltan credenciales", async () => {
    const res = await loginUsuario("", "");
    expect(res.ok).toBe(false);
    expect(String(res.mensaje).toLowerCase()).toContain("correo");
  });

  it("loginUsuario: ok false cuando API responde error", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) });

    const res = await loginUsuario("a@a.cl", "mal123");
    expect(res.ok).toBe(false);
    expect(String(res.mensaje).toLowerCase()).toMatch(/incorrect|contraseñ|correo/);
  });

  it("loginUsuario: ok false si respuesta no trae token/usuario", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ algo: "raro" }),
    });

    const res = await loginUsuario("a@a.cl", "123456");
    expect(res.ok).toBe(false);
    expect(String(res.mensaje).toLowerCase()).toContain("inválida");
  });

  it("registrarUsuario: ok false si faltan campos obligatorios", async () => {
    const res = await registrarUsuario({ nombre: "Jorge" });
    expect(res.ok).toBe(false);
    expect(String(res.mensaje).toLowerCase()).toContain("obligatorios");
  });

  it("registrarUsuario: ok false si edad < 18", async () => {
    const res = await registrarUsuario({
      nombre: "Jorge",
      email: "jorge@gmail.com",
      edad: 17,
      password: "123456",
      preferencias: "fps",
    });
    expect(res.ok).toBe(false);
    expect(String(res.mensaje).toLowerCase()).toContain("18");
  });

  it("registrarUsuario: ok false si password < 6", async () => {
    const res = await registrarUsuario({
      nombre: "Jorge",
      email: "jorge@gmail.com",
      edad: 20,
      password: "123",
      preferencias: "fps",
    });
    expect(res.ok).toBe(false);
    expect(String(res.mensaje).toLowerCase()).toContain("6");
  });

  it("registrarUsuario: ok false si preferencias es muy corta", async () => {
    const res = await registrarUsuario({
      nombre: "Jorge",
      email: "jorge@gmail.com",
      edad: 20,
      password: "123456",
      preferencias: "aa",
    });
    expect(res.ok).toBe(false);
    expect(String(res.mensaje).toLowerCase()).toContain("preferencia");
  });

  it("registrarUsuario: ok true (email duocuc) y devuelve mensaje con descuento", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, nombre: "Jorge" }),
    });

    const res = await registrarUsuario({
      nombre: "Jorge",
      email: "jorge@duocuc.cl",
      edad: 20,
      password: "123456",
      preferencias: "rpg",
    });

    expect(res.ok).toBe(true);
    expect(String(res.mensaje).toLowerCase()).toContain("20%");
    expect(res.usuario).toBeTruthy();
  });

  it("registrarUsuario: ok true (email normal) y mensaje 'Registro exitoso'", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 2, nombre: "Jorge" }),
    });

    const res = await registrarUsuario({
      nombre: "Jorge",
      email: "jorge@gmail.com",
      edad: 20,
      password: "123456",
      preferencias: "rpg",
    });

    expect(res.ok).toBe(true);
    expect(String(res.mensaje).toLowerCase()).toBe("registro exitoso");
  });

  it("registrarUsuario: ok false si servidor responde !ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ mensaje: "x" }),
    });

    const res = await registrarUsuario({
      nombre: "Jorge",
      email: "jorge@gmail.com",
      edad: 20,
      password: "123456",
      preferencias: "rpg",
    });

    expect(res.ok).toBe(false);
    expect(String(res.mensaje).toLowerCase()).toContain("servidor");
  });

  it("registrarUsuario: ok false si hay error de conexión", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network"));

    const res = await registrarUsuario({
      nombre: "Jorge",
      email: "jorge@gmail.com",
      edad: 20,
      password: "123456",
      preferencias: "rpg",
    });

    expect(res.ok).toBe(false);
    expect(String(res.mensaje).toLowerCase()).toContain("conexión");
  });
});
