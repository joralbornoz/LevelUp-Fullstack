import React from "react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ProductoCard from "../components/ProductoCard";

afterEach(() => cleanup());

const productoMock = {
  codigo: "PS5-001",
  nombre: "PlayStation 5",
  descripcion: "Consola de última generación",
  imagen: "ps5.jpg",
  precioTexto: "$600.000",
  stock: 10,
};

describe("ProductoCard", () => {
  test("renderiza datos del producto (nombre, código, precio, descripción, imagen y stock)", () => {
    render(<ProductoCard producto={productoMock} agregar={() => {}} />);

    // nombre
    expect(screen.getByRole("heading", { name: /playstation 5/i })).toBeTruthy();

    // código / precio / descripción
    expect(screen.getByText(/código:/i)).toBeTruthy();
    expect(screen.getByText("PS5-001")).toBeTruthy();

    expect(screen.getByText(/precio:/i)).toBeTruthy();
    expect(screen.getByText("$600.000")).toBeTruthy();

    expect(screen.getByText(/descripción:/i)).toBeTruthy();
    expect(screen.getByText(/consola de última generación/i)).toBeTruthy();

    // imagen
    const img = screen.getByRole("img", { name: /playstation 5/i });
    expect(img).toBeTruthy();

    // stock visible
    expect(screen.getByText("10")).toBeTruthy();
  });

  test('click en "Agregar" llama al callback con el producto', () => {
    const mockAgregar = vi.fn();
    render(<ProductoCard producto={productoMock} agregar={mockAgregar} />);

    // Hay varios botones, así que buscamos el exacto "Agregar"
    const botonAgregar = screen.getByRole("button", { name: /^agregar$/i });
    expect(botonAgregar.disabled).toBe(false);

    fireEvent.click(botonAgregar);

    expect(mockAgregar).toHaveBeenCalledTimes(1);
    expect(mockAgregar).toHaveBeenCalledWith(productoMock);
  });

  test('si stock es 0, muestra "Sin stock" y deshabilita el botón con texto "No disponible"', () => {
    const mockAgregar = vi.fn();
    const sinStock = { ...productoMock, stock: 0 };

    render(<ProductoCard producto={sinStock} agregar={mockAgregar} />);

    // texto de stock
    expect(screen.getByText(/sin stock/i)).toBeTruthy();

    // botón cambia texto y se deshabilita
    const botonNoDisponible = screen.getByRole("button", { name: /no disponible/i });
    expect(botonNoDisponible.disabled).toBe(true);

    fireEvent.click(botonNoDisponible);
    expect(mockAgregar).not.toHaveBeenCalled();
  });

  test("select de rating y textarea existen en el DOM", () => {
    render(<ProductoCard producto={productoMock} agregar={() => {}} />);

    // select por name="rating"
    const select = document.querySelector('select[name="rating"]');
    expect(select).toBeTruthy();

    // textarea por placeholder
    expect(screen.getByPlaceholderText(/escribe tu reseña/i)).toBeTruthy();

    // botones extra (para aumentar coverage DOM)
    expect(screen.getByRole("button", { name: /enviar/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /compartir/i })).toBeTruthy();
  });
});
