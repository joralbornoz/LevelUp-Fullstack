import { describe, test, expect, vi, beforeEach } from "vitest";
import { obtenerComprasUsuario, registrarCompra } from "../services/comprasService";
import { authFetch } from "../services/apiClient";

vi.mock("../services/apiClient", () => ({
  authFetch: vi.fn(),
}));

describe("comprasService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("obtenerComprasUsuario", () => {
    test("retorna ok=false si status 401", async () => {
      authFetch.mockResolvedValue({ status: 401, ok: false });

      const res = await obtenerComprasUsuario(10);

      expect(res.ok).toBe(false);
      expect(res.mensaje.toLowerCase()).toContain("sesión expirada");
      expect(authFetch).toHaveBeenCalledTimes(1);
    });

    test("retorna ok=false si status 403", async () => {
      authFetch.mockResolvedValue({ status: 403, ok: false });

      const res = await obtenerComprasUsuario(10);

      expect(res.ok).toBe(false);
      expect(res.mensaje.toLowerCase()).toContain("sesión expirada");
    });

    test("retorna ok=false si !res.ok (ej 500)", async () => {
      authFetch.mockResolvedValue({ status: 500, ok: false });

      const res = await obtenerComprasUsuario(10);

      expect(res.ok).toBe(false);
      expect(res.mensaje.toLowerCase()).toContain("historial");
    });

    test("retorna ok=true y compras si res.ok", async () => {
      const comprasMock = [{ id: 1, total: 1000 }];
      authFetch.mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => comprasMock,
      });

      const res = await obtenerComprasUsuario(10);

      expect(res.ok).toBe(true);
      expect(res.compras).toEqual(comprasMock);
    });

    test("retorna ok=false si hay excepción (catch)", async () => {
      authFetch.mockRejectedValue(new Error("network"));

      const res = await obtenerComprasUsuario(10);

      expect(res.ok).toBe(false);
      expect(res.mensaje.toLowerCase()).toContain("conexión");
    });
  });

  describe("registrarCompra", () => {
    test("retorna ok=false si status 401/403", async () => {
      authFetch.mockResolvedValue({ status: 401, ok: false });

      const res = await registrarCompra(1, [], 0);

      expect(res.ok).toBe(false);
      expect(res.mensaje.toLowerCase()).toContain("sesión expirada");
    });

    test("retorna ok=false si !res.ok", async () => {
      authFetch.mockResolvedValue({ status: 500, ok: false });

      const res = await registrarCompra(1, [], 0);

      expect(res.ok).toBe(false);
      expect(res.mensaje.toLowerCase()).toContain("registrar");
    });

    test("retorna ok=true y compra si res.ok", async () => {
      const compraMock = { id: 99, total: 5000 };
      authFetch.mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => compraMock,
      });

      const items = [
        { codigo: "P1", nombre: "Prod 1", cantidad: 2, precio: 1000 },
        { codigo: "P2", nombre: "Prod 2", precioNumero: 500 },
      ];

      const res = await registrarCompra(10, items, 2500);

      expect(res.ok).toBe(true);
      expect(res.compra).toEqual(compraMock);

      // Validar que se construyó payload y se llamó POST
      const [url, options] = authFetch.mock.calls[0];
      expect(String(url)).toContain("/compras/usuario/10");
      expect(options.method).toBe("POST");

      const body = JSON.parse(options.body);
      expect(body.total).toBe(2500);
      expect(body.items).toEqual([
        { codigoProducto: "P1", nombreProducto: "Prod 1", cantidad: 2, precioUnitario: 1000 },
        { codigoProducto: "P2", nombreProducto: "Prod 2", cantidad: 1, precioUnitario: 500 },
      ]);
    });

    test("retorna ok=false si hay excepción (catch)", async () => {
      authFetch.mockRejectedValue(new Error("network"));

      const res = await registrarCompra(1, [], 0);

      expect(res.ok).toBe(false);
      expect(res.mensaje.toLowerCase()).toContain("conexión");
    });
  });
});
