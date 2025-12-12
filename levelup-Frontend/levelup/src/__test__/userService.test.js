import { describe, test, expect, vi, beforeEach } from "vitest";
import { actualizarPerfil } from "../services/userService";
import { authFetch } from "../services/apiClient";

vi.mock("../services/apiClient", () => ({
  authFetch: vi.fn(),
}));

describe("userService.actualizarPerfil", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("si usuarioActual no tiene id, retorna ok=false (Usuario inválido)", async () => {
    const res = await actualizarPerfil(null, { direccion: "X", preferencias: "Y" });
    expect(res.ok).toBe(false);
    expect(res.mensaje).toContain("Usuario inválido");
    expect(authFetch).not.toHaveBeenCalled();
  });

  test("si el servidor responde 401, retorna sesión expirada", async () => {
    authFetch.mockResolvedValue({
      status: 401,
      ok: false,
    });

    const res = await actualizarPerfil({ id: 1 }, { direccion: "A", preferencias: "B" });

    expect(res.ok).toBe(false);
    expect(res.mensaje.toLowerCase()).toContain("sesión expirada");
    expect(authFetch).toHaveBeenCalledTimes(1);
  });

  test("si res.ok es false (no 401), retorna error al actualizar perfil", async () => {
    authFetch.mockResolvedValue({
      status: 500,
      ok: false,
      text: async () => "error",
    });

    const res = await actualizarPerfil({ id: 2 }, { direccion: "A", preferencias: "B" });

    expect(res.ok).toBe(false);
    expect(res.mensaje.toLowerCase()).toContain("error al actualizar");
  });

  test("si res.ok true, retorna ok=true y usuario", async () => {
    authFetch.mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => ({ id: 2, direccion: "A", preferencias: "B" }),
    });

    const res = await actualizarPerfil({ id: 2 }, { direccion: "A", preferencias: "B" });

    expect(res.ok).toBe(true);
    expect(res.usuario).toEqual({ id: 2, direccion: "A", preferencias: "B" });
  });

  test("si authFetch lanza error, retorna ok=false (no se pudo conectar)", async () => {
    authFetch.mockRejectedValue(new Error("network"));

    const res = await actualizarPerfil({ id: 3 }, { direccion: "A", preferencias: "B" });

    expect(res.ok).toBe(false);
    expect(res.mensaje.toLowerCase()).toContain("no se pudo conectar");
  });
});
