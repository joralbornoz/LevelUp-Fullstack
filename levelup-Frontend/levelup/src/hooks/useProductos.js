import { useEffect, useState } from "react";
import { obtenerProductosApi } from "../services/productosApi";
import { TITULOS_CATEGORIA } from "../constants/categorias";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProductosApi()
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los productos desde la API");
        setCargando(false);
      });
  }, []);

  return { productos, cargando, error };
}
