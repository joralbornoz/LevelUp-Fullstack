// src/services/productosApi.js


const API_URL = `${import.meta.env.VITE_API_CATALOG_URL}/productos`;

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
  console.log("URL PRODUCTOS:", API_URL);
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error al cargar productos");
  }

  const data = await res.json();
  return data.map(normalizarProducto);
}
