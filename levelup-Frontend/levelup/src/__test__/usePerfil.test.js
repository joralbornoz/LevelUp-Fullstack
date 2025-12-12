import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { usePerfil } from "../hooks/usePerfil";

// ---- Mocks ----
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockObtenerUsuario = vi.fn();
const mockGuardarUsuario = vi.fn();
const mockCerrarSesion = vi.fn();

vi.mock("../services/sesionService", () => ({
  obtenerUsuario: (...args) => mockObtenerUsuario(...args),
  guardarUsuario: (...args) => mockGuardarUsuario(...args),
  cerrarSesion: (...args) => mockCerrarSesion(...args),
}));

const mockActualizarPerfil = vi.fn();
vi.mock("../services/userService", () => ({
  actualizarPerfil: (...args) => mockActualizarPerfil(...args),
}));

const mockObtenerComprasUsuario = vi.fn();
vi.mock("../services/comprasService", () => ({
  obtenerComprasUsuario: (...args) => mockObtenerComprasUsuario(...args),
}));

describe("usePerfil", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockObtenerUsuario.mockReset();
    mockGuardarUsuario.mockReset();
    mockCerrarSesion.mockReset();
    mockActualizarPerfil.mockReset();
    mockObtenerComprasUsuario.mockReset();

    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("si no hay usuario en sesión, navega a /login", async () => {
    mockObtenerUsuario.mockReturnValue(null);

    renderHook(() => usePerfil());

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("si hay usuario en sesión, setea datos iniciales (direccion/preferencias)", async () => {
    mockObtenerUsuario.mockReturnValue({
      id: 10,
      nombre: "Jorge",
      direccion: "Mi calle 123",
      preferencias: "RPG",
    });

    // para evitar que quede cargando compras
    mockObtenerComprasUsuario.mockResolvedValue({ ok: true, compras: [] });

    const { result } = renderHook(() => usePerfil());

    await waitFor(() => {
      expect(result.current.usuario?.id).toBe(10);
      expect(result.current.direccion).toBe("Mi calle 123");
      expect(result.current.preferencias).toBe("RPG");
    });
  });

  test("si el usuario no tiene id, no llama obtenerComprasUsuario y termina cargandoCompras en false", async () => {
    mockObtenerUsuario.mockReturnValue({ nombre: "SinId" });

    const { result } = renderHook(() => usePerfil());

    await waitFor(() => {
      expect(result.current.cargandoCompras).toBe(false);
    });

    expect(mockObtenerComprasUsuario).not.toHaveBeenCalled();
  });

  test("cuando usuario tiene id, llama obtenerComprasUsuario y setea compras si ok=true", async () => {
    mockObtenerUsuario.mockReturnValue({ id: 2, nombre: "User" });

    mockObtenerComprasUsuario.mockResolvedValue({
      ok: true,
      compras: [{ id: 1, total: 1000 }],
    });

    const { result } = renderHook(() => usePerfil());

    await waitFor(() => {
      expect(mockObtenerComprasUsuario).toHaveBeenCalledWith(2);
      expect(result.current.compras).toHaveLength(1);
      expect(result.current.cargandoCompras).toBe(false);
    });
  });

  test("si obtenerComprasUsuario responde ok=false, deja compras como [] y termina cargandoCompras", async () => {
    mockObtenerUsuario.mockReturnValue({ id: 3 });

    mockObtenerComprasUsuario.mockResolvedValue({ ok: false, compras: [] });

    const { result } = renderHook(() => usePerfil());

    await waitFor(() => {
      expect(result.current.cargandoCompras).toBe(false);
      expect(result.current.compras).toEqual([]);
    });
  });

  test("handleGuardar: si no hay usuario id, muestra alert y NO llama actualizarPerfil", async () => {
    mockObtenerUsuario.mockReturnValue({ nombre: "X" });

    const { result } = renderHook(() => usePerfil());

    await act(async () => {
      await result.current.handleGuardar({ preventDefault: () => {} });
    });

    expect(window.alert).toHaveBeenCalled();
    expect(mockActualizarPerfil).not.toHaveBeenCalled();
  });

  test("handleGuardar: flujo OK actualiza usuario y guarda en sesión", async () => {
    const userSesion = { id: 7, nombre: "A", direccion: "", preferencias: "" };
    mockObtenerUsuario.mockReturnValue(userSesion);

    // compras para no quedarse en loading
    mockObtenerComprasUsuario.mockResolvedValue({ ok: true, compras: [] });

    const usuarioActualizado = {
      ...userSesion,
      direccion: "Nueva 999",
      preferencias: "FPS",
    };

    mockActualizarPerfil.mockResolvedValue({ ok: true, usuario: usuarioActualizado });

    const { result } = renderHook(() => usePerfil());

    // cambia inputs del hook
    act(() => {
      result.current.setDireccion("Nueva 999");
      result.current.setPreferencias("FPS");
    });

    await act(async () => {
      await result.current.handleGuardar({ preventDefault: () => {} });
    });

    expect(mockActualizarPerfil).toHaveBeenCalledWith(
      expect.objectContaining({ id: 7 }),
      { direccion: "Nueva 999", preferencias: "FPS" }
    );

    expect(mockGuardarUsuario).toHaveBeenCalledWith(usuarioActualizado);
    expect(window.alert).toHaveBeenCalledWith("Datos de perfil actualizados correctamente");
  });

  test("handleGuardar: si actualizarPerfil falla, muestra alert y NO guarda usuario", async () => {
    mockObtenerUsuario.mockReturnValue({ id: 9 });
    mockObtenerComprasUsuario.mockResolvedValue({ ok: true, compras: [] });

    mockActualizarPerfil.mockResolvedValue({ ok: false, mensaje: "Error X" });

    const { result } = renderHook(() => usePerfil());

    await act(async () => {
      await result.current.handleGuardar({ preventDefault: () => {} });
    });

    expect(window.alert).toHaveBeenCalledWith("Error X");
    expect(mockGuardarUsuario).not.toHaveBeenCalled();
  });

  test("handleLogout: limpia sesión y navega a /login", async () => {
    mockObtenerUsuario.mockReturnValue({ id: 1 });
    mockObtenerComprasUsuario.mockResolvedValue({ ok: true, compras: [] });

    const { result } = renderHook(() => usePerfil());

    act(() => {
      result.current.handleLogout();
    });

    expect(mockCerrarSesion).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
