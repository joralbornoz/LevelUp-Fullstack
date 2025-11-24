// src/pages/Catalogo.jsx
import "../styles/catalogo.css";
import "../styles/carrito.css";

import ProductoCard from "../components/ProductoCard";
import Carrito from "../components/Carrito";
import { useCarrito } from "../hooks/useCarrito";
import { useProductos } from "../hooks/useProductos";
import { CATEGORIAS } from "../constants/categorias";

function Catalogo() {
  const {
    items,
    total,
    agregarProducto,
    restarProducto,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito();

  const { productos, cargando, error } = useProductos();

  if (cargando) {
    return <p style={{ textAlign: "center" }}>Cargando productos...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Catálogo de Productos</h2>

      <nav className="filtros">
        {CATEGORIAS.map((cat) => (
          <a key={cat.id} href={`#${cat.id}`}>
            {cat.titulo}
          </a>
        ))}
      </nav>

      <Carrito
        items={items}
        total={total}
        agregar={agregarProducto}
        restar={restarProducto}
        eliminar={eliminarProducto}
        vaciarCarrito={vaciarCarrito}
      />

      {CATEGORIAS.map((cat) => {
        const productosDeCategoria = productos
          .filter((p) => p.categoria === cat.id)
          .filter((p) => (p.stock ?? 0) > 0); 

        if (productosDeCategoria.length === 0) return null;

        return (
          <section key={cat.id} id={cat.id}>
            <h3>{cat.titulo}</h3>
            <div className="cards-container">
              {productosDeCategoria.map((prod) => (
                <ProductoCard
                  key={prod.codigo}
                  producto={prod}
                  agregar={agregarProducto}
                />
              ))}
            </div>
          </section>
        );
      })}

      <footer>
        <p>&copy; 2025 Level-Up Gamer</p>
      </footer>
    </>
  );
}

export default Catalogo;
