// src/__test__/useCarrito.test.js
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCarrito } from "../hooks/useCarrito";

const STORAGE_KEY = "levelup_carrito";

describe("useCarrito", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("inicializa con [] cuando no hay nada en localStorage (raw falsy)", () => {
    const { result } = renderHook(() => useCarrito());
    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  test("carga items desde localStorage cuando raw existe (raw truthy + JSON.parse ok)", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ codigo: "A1", nombre: "Mouse", precio: 1000, stock: 5, cantidad: 2 }])
    );

    const { result } = renderHook(() => useCarrito());
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].codigo).toBe("A1");
    expect(result.current.total).toBe(2000);
  });

  test("si localStorage tiene JSON inválido, cae al catch y parte vacío", () => {
    localStorage.setItem(STORAGE_KEY, "{no-json}");

    const { result } = renderHook(() => useCarrito());
    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  test("persiste en localStorage cada vez que cambian items (useEffect)", () => {
    const setSpy = vi.spyOn(Storage.prototype, "setItem");
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto({ codigo: "P1", nombre: "Pad", precio: 5000, stock: 3 });
    });

    expect(setSpy).toHaveBeenCalled();
    const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(guardado).toHaveLength(1);
    expect(guardado[0].codigo).toBe("P1");
  });

  test("agregarProducto: producto NUEVO con stock > 0 se agrega (rama else + stock>0)", () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto({ codigo: "B1", nombre: "Teclado", precio: 2000, stock: 3 });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({ codigo: "B1", cantidad: 1, stock: 3, precio: 2000 });
  });

  test("agregarProducto: producto NUEVO con stock 0 NO se agrega y alerta (rama stock<=0)", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto({ codigo: "C1", nombre: "Cable", precio: 300, stock: 0 });
    });

    expect(alertSpy).toHaveBeenCalled();
    expect(result.current.items).toHaveLength(0);
  });

  test("agregarProducto: producto NUEVO con stock undefined NO debe alertar y se agrega con stock 0 (rama stock===undefined)", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto({ codigo: "C2", nombre: "Sticker", precio: 100 }); // stock undefined
    });

    expect(alertSpy).toHaveBeenCalled();
    expect(result.current.items).toHaveLength(0);
  });

  test("agregarProducto: producto EXISTENTE aumenta cantidad si no supera stock (rama existente + map)", () => {
    const { result } = renderHook(() => useCarrito());
    const producto = { codigo: "D1", nombre: "Mouse", precio: 1000, stock: 5 };

    act(() => {
      result.current.agregarProducto(producto); // 1
      result.current.agregarProducto(producto); // 2
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].cantidad).toBe(2);
  });

  test("agregarProducto: producto EXISTENTE NO aumenta si supera stock y alerta (rama stock && nuevaCantidad > stock)", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const { result } = renderHook(() => useCarrito());
    const producto = { codigo: "E1", nombre: "Joystick", precio: 10000, stock: 1 };

    act(() => {
      result.current.agregarProducto(producto); // 1
      result.current.agregarProducto(producto); // intenta 2 => no deja
    });

    expect(alertSpy).toHaveBeenCalled();
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].cantidad).toBe(1);
  });

  test("agregarProducto: si el existente tiene stock pero el producto nuevo NO trae stock, usa existente.stock (rama existente?.stock)", () => {
    const { result } = renderHook(() => useCarrito());

    // Insertamos 1 item con stock 2 en el carrito
    act(() => {
      result.current.agregarProducto({ codigo: "S1", nombre: "SSD", precio: 50000, stock: 2 });
    });

    // Ahora mandamos el MISMO codigo pero sin stock => stock = producto.stock ?? existente?.stock ?? 0
    act(() => {
      result.current.agregarProducto({ codigo: "S1", nombre: "SSD", precio: 50000 }); // sin stock
      result.current.agregarProducto({ codigo: "S1", nombre: "SSD", precio: 50000 }); // intentaría 3, debería bloquear (stock=2)
    });

    expect(result.current.items[0].cantidad).toBe(2);
  });

  test("eliminarProducto: si item NO coincide, lo deja igual (rama item.codigo !== producto.codigo)", () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto({ codigo: "X1", nombre: "A", precio: 1000, stock: 10 });
      result.current.agregarProducto({ codigo: "X2", nombre: "B", precio: 2000, stock: 10 });
    });

    act(() => {
      result.current.eliminarProducto({ codigo: "X1" }); // afecta solo X1
    });

    const x2 = result.current.items.find((i) => i.codigo === "X2");
    expect(x2).toBeTruthy();
    expect(x2.cantidad).toBe(1);
  });

  test("eliminarProducto: si cantidad > 1, decrementa (rama cantActual > 1)", () => {
    const { result } = renderHook(() => useCarrito());
    const producto = { codigo: "F1", nombre: "Headset", precio: 15000, stock: 5 };

    act(() => {
      result.current.agregarProducto(producto);
      result.current.agregarProducto(producto); // cantidad 2
    });

    act(() => {
      result.current.eliminarProducto(producto); // baja a 1
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].cantidad).toBe(1);
  });

  test("eliminarProducto: si cantidad es 1, elimina el item (rama return [])", () => {
    const { result } = renderHook(() => useCarrito());
    const producto = { codigo: "G1", nombre: "RAM", precio: 40000, stock: 10 };

    act(() => {
      result.current.agregarProducto(producto); // 1
    });

    act(() => {
      result.current.eliminarProducto(producto); // elimina
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  test("vaciarCarrito: deja items []", () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto({ codigo: "V1", nombre: "GPU", precio: 300000, stock: 1 });
      result.current.vaciarCarrito();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
  });
});
