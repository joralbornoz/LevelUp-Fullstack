import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminUsersTable from "../components/AdminUsersTable";

// Helper: props base
function propsBase(overrides = {}) {
  const usuarios = [
    { id: 1, nombre: "Admin", email: "admin@levelup.cl", rol: "ADMIN" },
    { id: 2, nombre: "User", email: "user@levelup.cl", rol: "USUARIO" },
  ];

  return {
    usuarios,
    adminActual: usuarios[0],

    nombreEdit: "",
    setNombreEdit: vi.fn(),
    emailEdit: "",
    setEmailEdit: vi.fn(),
    rolEdit: "",
    setRolEdit: vi.fn(),
    passwordEdit: "",
    setPasswordEdit: vi.fn(),

    onActualizarDatos: vi.fn(),
    onCambiarRol: vi.fn(),
    onCambiarPassword: vi.fn(),
    onEliminarUsuario: vi.fn(),
    onVerCompras: vi.fn(),

    ...overrides,
  };
}

describe("AdminUsersTable", () => {
  test("muestra mensaje cuando no hay usuarios", () => {
    const p = propsBase({ usuarios: [] });
    render(<AdminUsersTable {...p} />);

    expect(screen.getByText(/No hay usuarios registrados/i)).toBeTruthy();
  });

  test("renderiza usuarios en la tabla (texto vs inputs)", () => {
    const p = propsBase();
    render(<AdminUsersTable {...p} />);

    // Admin actual: no editable => texto
    expect(screen.getByText("Admin")).toBeTruthy();
    expect(screen.getByText("admin@levelup.cl")).toBeTruthy();

    // Usuario NO admin: editable => inputs con value
    expect(screen.getByDisplayValue("User")).toBeTruthy();
    expect(screen.getByDisplayValue("user@levelup.cl")).toBeTruthy();
  });

  test("permite editar nombre y email del usuario que NO es admin actual", () => {
    const p = propsBase();
    render(<AdminUsersTable {...p} />);

    // Inputs del segundo usuario (editable)
    const inputNombre = screen.getByDisplayValue("User");
    const inputEmail = screen.getByDisplayValue("user@levelup.cl");

    fireEvent.change(inputNombre, { target: { value: "User Edit" } });
    fireEvent.change(inputEmail, { target: { value: "edit@levelup.cl" } });

    expect(p.setNombreEdit).toHaveBeenCalledWith("User Edit");
    expect(p.setEmailEdit).toHaveBeenCalledWith("edit@levelup.cl");
  });

  test("cambia rol y llama a onCambiarRol con el usuario correcto", () => {
    const p = propsBase();
    render(<AdminUsersTable {...p} />);

    const select = document.querySelector("select");
    fireEvent.change(select, { target: { value: "ADMIN" } });
    expect(p.setRolEdit).toHaveBeenCalledWith("ADMIN");

    const btnGuardarRol = screen.getByRole("button", { name: /Guardar rol/i });
    fireEvent.click(btnGuardarRol);

    // Se llama con el usuario NO admin (id 2)
    expect(p.onCambiarRol).toHaveBeenCalledTimes(1);
    expect(p.onCambiarRol).toHaveBeenCalledWith(p.usuarios[1]);
  });

  test("cambia contraseña y llama a onCambiarPassword", () => {
    const p = propsBase();
    render(<AdminUsersTable {...p} />);

    const passInput = screen.getByPlaceholderText(/Nueva contraseña/i);
    fireEvent.change(passInput, { target: { value: "123456" } });
    expect(p.setPasswordEdit).toHaveBeenCalledWith("123456");

    const btnCambiarPass = screen.getByRole("button", { name: /Cambiar pass/i });
    fireEvent.click(btnCambiarPass);

    expect(p.onCambiarPassword).toHaveBeenCalledTimes(1);
    expect(p.onCambiarPassword).toHaveBeenCalledWith(p.usuarios[1]);
  });

  test("botones de acciones llaman a los callbacks correctos", () => {
    const p = propsBase();
    render(<AdminUsersTable {...p} />);

    fireEvent.click(screen.getByRole("button", { name: /Guardar datos/i }));
    expect(p.onActualizarDatos).toHaveBeenCalledWith(p.usuarios[1]);

    fireEvent.click(screen.getByRole("button", { name: /Eliminar usuario/i }));
    expect(p.onEliminarUsuario).toHaveBeenCalledWith(p.usuarios[1]);

    fireEvent.click(screen.getByRole("button", { name: /Ver compras/i }));
    expect(p.onVerCompras).toHaveBeenCalledWith(p.usuarios[1]);
  });

  test("el admin actual NO puede editar sus datos", () => {
    const p = propsBase();
    render(<AdminUsersTable {...p} />);

    // En la fila del admin actual no deberían existir inputs con su nombre/email como value
    expect(screen.queryByDisplayValue("Admin")).toBeNull();
    expect(screen.queryByDisplayValue("admin@levelup.cl")).toBeNull();

    // Y sí aparece el texto "No editable"
    expect(screen.getAllByText(/No editable/i).length).toBeGreaterThan(0);
  });

  // Extra para subir coverage:
  test("el select de rol parte con el rol del usuario", () => {
    const p = propsBase();
    render(<AdminUsersTable {...p} />);

    const select = document.querySelector("select");
    expect(select.value).toBe("USUARIO");
  });

  // Extra para subir coverage:
  test("si adminActual es null, todos quedan editables", () => {
    const p = propsBase({ adminActual: null });
    render(<AdminUsersTable {...p} />);

    // Ahora incluso Admin se muestra como input editable
    expect(screen.getByDisplayValue("Admin")).toBeTruthy();
    expect(screen.getByDisplayValue("admin@levelup.cl")).toBeTruthy();
  });
});
