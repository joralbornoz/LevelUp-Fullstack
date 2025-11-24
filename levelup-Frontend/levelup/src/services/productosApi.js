// src/services/productosApi.js


const API_URL = "http://localhost:8080/api/productos";

function normalizarProducto(apiProd) {
  return {
    codigo: apiProd.codigo,
    nombre: apiProd.nombre,
    categoria: apiProd.categoria,
    descripcion: apiProd.descripcion,
    imagen: apiProd.imagenUrl,
    precio: apiProd.precio,
    precioTexto: new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(apiProd.precio ?? 0),
    stock: apiProd.stock ?? 0,
  };
}

export async function obtenerProductosApi() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error al cargar productos");
  }

  const data = await res.json();
  return data.map(normalizarProducto);
}
