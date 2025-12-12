import { describe, it, expect, beforeEach } from "vitest";
import {
  guardarUsuario,
  obtenerUsuario,
  cerrarSesion,
  guardarToken,
  obtenerToken,
} from "../services/sesionService";

describe("sesionService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("guardarUsuario y obtenerUsuario funcionan correctamente", () => {
    const usuario = { id: 1, nombre: "Jorge", rol: "ADMIN" };

    guardarUsuario(usuario);

    const resultado = obtenerUsuario();
    expect(resultado).toEqual(usuario);
  });

  it("obtenerUsuario retorna null si no hay usuario guardado", () => {
    const resultado = obtenerUsuario();
    expect(resultado).toBe(null);
  });

  it("guardarToken y obtenerToken funcionan correctamente", () => {
    guardarToken("token123");

    const token = obtenerToken();
    expect(token).toBe("token123");
  });

  it("obtenerToken retorna null si no hay token", () => {
    const token = obtenerToken();
    expect(token).toBe(null);
  });

  it("cerrarSesion elimina usuario y token del localStorage", () => {
    guardarUsuario({ nombre: "Jorge" });
    guardarToken("token123");

    cerrarSesion();

    expect(obtenerUsuario()).toBe(null);
    expect(obtenerToken()).toBe(null);
  });
});
