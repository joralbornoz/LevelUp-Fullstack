// src/hooks/useCarrito.js
import { useEffect, useState } from "react";

const STORAGE_KEY = "levelup_carrito";

export function useCarrito() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  
  const agregarProducto = (producto) => {
    setItems((prev) => {
      const existente = prev.find((i) => i.codigo === producto.codigo);

      
      const stock = producto.stock ?? existente?.stock ?? 0;

      if (existente) {
        const cantActual = existente.cantidad ?? 1;
        const nuevaCantidad = cantActual + 1;

        if (stock && nuevaCantidad > stock) {
          alert(
            `No puedes agregar más de ${stock} unidades de ${producto.nombre}.`
          );
          return prev;
        }

        return prev.map((it) =>
          it.codigo === producto.codigo
            ? { ...it, cantidad: nuevaCantidad }
            : it
        );
      } else {
        
        if (stock !== undefined && stock <= 0) {
          alert(`No hay stock disponible de ${producto.nombre}.`);
          return prev;
        }

        return [
          ...prev,
          {
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio ?? producto.precioNumero ?? 0,
            stock,
            cantidad: 1,
          },
        ];
      }
    });
  };

  
  const eliminarProducto = (producto) => {
    setItems((prev) => {
      return prev.flatMap((item) => {
        if (item.codigo !== producto.codigo) {
          return item; 
        }

        const cantActual = item.cantidad ?? 1;

        
        if (cantActual > 1) {
          return {
            ...item,
            cantidad: cantActual - 1,
          };
        }

        
        return [];
      });
    });
  };

  
  const vaciarCarrito = () => setItems([]);

  
  const total = items.reduce(
    (acc, it) => acc + (it.precio ?? 0) * (it.cantidad ?? 1),
    0
  );

  return {
    items,
    total,
    agregarProducto,
    eliminarProducto,
    vaciarCarrito,
  };
}
