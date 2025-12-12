import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";

vi.mock("../hooks/useLogin", () => ({
  useLogin: vi.fn(),
}));

import { useLogin } from "../hooks/useLogin";

describe("Login.jsx", () => {
  const mockSetLoginEmail = vi.fn();
  const mockSetLoginPassword = vi.fn();
  const mockHandleLogin = vi.fn((e) => e?.preventDefault?.());

  const mockActualizarRegistro = vi.fn();
  const mockHandleRegistro = vi.fn((e) => e?.preventDefault?.());

  beforeEach(() => {
    vi.clearAllMocks();

    useLogin.mockReturnValue({
      loginEmail: "",
      setLoginEmail: mockSetLoginEmail,
      loginPassword: "",
      setLoginPassword: mockSetLoginPassword,
      handleLogin: mockHandleLogin,

      formRegistro: {
        nombre: "",
        email: "",
        edad: "",
        password: "",
        preferencias: "",
      },
      actualizarRegistro: mockActualizarRegistro,
      handleRegistro: mockHandleRegistro,
    });
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

  it("renderiza título y ambos formularios", () => {
    setup();
    expect(screen.getByText("Acceso a tu cuenta")).toBeTruthy();
    expect(screen.getByText("Iniciar Sesión")).toBeTruthy();
    expect(screen.getByText("Crear Cuenta")).toBeTruthy();
    expect(screen.getByText("© 2025 Level-Up Gamer")).toBeTruthy();
  });

  it("login: change en email/password llama a sus setters", () => {
    setup();

    const seccionLogin = screen.getByText("Iniciar Sesión").closest("section");
    expect(seccionLogin).toBeTruthy();

    const emailInput = seccionLogin.querySelector('input[type="email"]');
    const passInput = seccionLogin.querySelector('input[type="password"]');

    fireEvent.change(emailInput, { target: { value: "a@a.cl" } });
    fireEvent.change(passInput, { target: { value: "123456" } });

    expect(mockSetLoginEmail).toHaveBeenCalledWith("a@a.cl");
    expect(mockSetLoginPassword).toHaveBeenCalledWith("123456");
  });

  it("login: submit del form llama a handleLogin", () => {
    setup();

    const seccionLogin = screen.getByText("Iniciar Sesión").closest("section");
    expect(seccionLogin).toBeTruthy();

    const form = seccionLogin.querySelector("form");
    fireEvent.submit(form);

    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
  });

  it("registro: change llama actualizarRegistro con campo correcto", () => {
    setup();

    const seccionReg = screen.getByText("Crear Cuenta").closest("section");
    expect(seccionReg).toBeTruthy();

    const inputs = seccionReg.querySelectorAll("input");
    // Orden en tu JSX:
    // 0 nombre, 1 email, 2 edad, 3 password, 4 preferencias
    fireEvent.change(inputs[0], { target: { value: "Jorge" } });
    fireEvent.change(inputs[1], { target: { value: "jorge@duocuc.cl" } });
    fireEvent.change(inputs[2], { target: { value: "20" } });
    fireEvent.change(inputs[3], { target: { value: "abcdef" } });
    fireEvent.change(inputs[4], { target: { value: "RPG" } });

    expect(mockActualizarRegistro).toHaveBeenCalledWith("nombre", "Jorge");
    expect(mockActualizarRegistro).toHaveBeenCalledWith("email", "jorge@duocuc.cl");
    expect(mockActualizarRegistro).toHaveBeenCalledWith("edad", "20");
    expect(mockActualizarRegistro).toHaveBeenCalledWith("password", "abcdef");
    expect(mockActualizarRegistro).toHaveBeenCalledWith("preferencias", "RPG");
  });

  it("registro: submit del form llama a handleRegistro", () => {
    setup();

    const seccionReg = screen.getByText("Crear Cuenta").closest("section");
    expect(seccionReg).toBeTruthy();

    const form = seccionReg.querySelector("form");
    fireEvent.submit(form);

    expect(mockHandleRegistro).toHaveBeenCalledTimes(1);
  });
});
