// src/__test__/useLogin.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLogin } from "../hooks/useLogin";

// 🔹 Mocks de servicios
const mockLoginUsuario = vi.fn();
const mockRegistrarUsuario = vi.fn();
vi.mock("../services/authService", () => ({
  loginUsuario: (...args) => mockLoginUsuario(...args),
  registrarUsuario: (...args) => mockRegistrarUsuario(...args),
}));

const mockGuardarToken = vi.fn();
const mockGuardarUsuario = vi.fn();
vi.mock("../services/sesionService", () => ({
  guardarToken: (...args) => mockGuardarToken(...args),
  guardarUsuario: (...args) => mockGuardarUsuario(...args),
}));

// 🔹 Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("useLogin hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // mock de alert para no romper el test
    global.alert = vi.fn();
  });

  it("si el login falla muestra alert y NO navega", async () => {
    mockLoginUsuario.mockResolvedValue({
      ok: false,
      mensaje: "Correo o contraseña incorrectos.",
    });

    const { result } = renderHook(() => useLogin());

    // seteamos valores de login
    act(() => {
      result.current.setLoginEmail("test@levelup.cl");
      result.current.setLoginPassword("123456");
    });

    // ejecutamos handleLogin
    await act(async () => {
      await result.current.handleLogin({ preventDefault: () => {} });
    });

    expect(global.alert).toHaveBeenCalledWith(
      "Correo o contraseña incorrectos."
    );
    expect(mockGuardarToken).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("login exitoso de USUARIO guarda token/usuario y navega a /perfil", async () => {
    mockLoginUsuario.mockResolvedValue({
      ok: true,
      token: "TOKEN123",
      usuario: { id: 1, nombre: "User", rol: "USER" },
    });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setLoginEmail("user@levelup.cl");
      result.current.setLoginPassword("123456");
    });

    await act(async () => {
      await result.current.handleLogin({ preventDefault: () => {} });
    });

    expect(mockLoginUsuario).toHaveBeenCalledWith(
      "user@levelup.cl",
      "123456"
    );
    expect(mockGuardarToken).toHaveBeenCalledWith("TOKEN123");
    expect(mockGuardarUsuario).toHaveBeenCalledWith({
      id: 1,
      nombre: "User",
      rol: "USER",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/perfil");
  });

  it("login exitoso de ADMIN navega a /admin", async () => {
    mockLoginUsuario.mockResolvedValue({
      ok: true,
      token: "ADMINTOKEN",
      usuario: { id: 99, nombre: "Admin", rol: "ADMIN" },
    });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setLoginEmail("admin@levelup.cl");
      result.current.setLoginPassword("admin123");
    });

    await act(async () => {
      await result.current.handleLogin({ preventDefault: () => {} });
    });

    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  it("si el registro falla muestra alert con el mensaje de error", async () => {
    mockRegistrarUsuario.mockResolvedValue({
      ok: false,
      mensaje: "Todos los campos son obligatorios",
    });

    const { result } = renderHook(() => useLogin());

    // cargamos algunos datos en el form
    act(() => {
      result.current.actualizarRegistro("nombre", "Jorge");
      result.current.actualizarRegistro("email", "jorge@test.cl");
    });

    await act(async () => {
      await result.current.handleRegistro({ preventDefault: () => {} });
    });

    expect(mockRegistrarUsuario).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith(
      "Todos los campos son obligatorios"
    );
  });

  it("registro exitoso muestra alert y resetea el formulario", async () => {
    mockRegistrarUsuario.mockResolvedValue({
      ok: true,
      mensaje: "Registro exitoso",
    });

    const { result } = renderHook(() => useLogin());

    // seteamos todos los campos
    act(() => {
      result.current.actualizarRegistro("nombre", "Jorge");
      result.current.actualizarRegistro("email", "jorge@test.cl");
      result.current.actualizarRegistro("edad", "25");
      result.current.actualizarRegistro("password", "clave123");
      result.current.actualizarRegistro("preferencias", "RPG, Shooter");
    });

    await act(async () => {
      await result.current.handleRegistro({ preventDefault: () => {} });
    });

    // se llamó al servicio con el form que teníamos
    expect(mockRegistrarUsuario).toHaveBeenCalledWith({
      nombre: "Jorge",
      email: "jorge@test.cl",
      edad: "25",
      password: "clave123",
      preferencias: "RPG, Shooter",
    });

    // se mostró el alert de éxito
    expect(global.alert).toHaveBeenCalledWith("Registro exitoso");

    // el formulario quedó reseteado
    const formFinal = result.current.formRegistro;
    expect(formFinal).toEqual({
      nombre: "",
      email: "",
      edad: "",
      password: "",
      preferencias: "",
    });
  });
});
