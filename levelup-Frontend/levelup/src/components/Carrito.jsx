// src/components/Carrito.jsx
import "../styles/carrito.css";
import { registrarCompra } from "../services/comprasService";
import { obtenerUsuario } from "../services/sesionService";

function Carrito({ items, total, agregar, eliminar, vaciarCarrito }) {
  const usuario = obtenerUsuario();

  const itemsSeguros = Array.isArray(items) ? items : [];
  const totalSeguro = Number(total) || 0;

  const totalProductos = itemsSeguros.reduce(
    (acc, it) => acc + (it.cantidad ?? 1),
    0
  );

  const handlePagar = async () => {
    if (!usuario) {
      alert("Debes iniciar sesión para completar la compra.");
      return;
    }

    if (itemsSeguros.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }

    try {
      const resultado = await registrarCompra(usuario.id, itemsSeguros, totalSeguro);

      if (!resultado.ok) {
        alert(resultado.mensaje);
        return;
      }

      alert("Pago realizado correctamente, compra registrada");
      vaciarCarrito();

      
      window.location.reload();
    } catch (err) {
      console.error("Error al registrar la compra:", err);
      alert("Ocurrió un error al procesar el pago.");
    }
  };

  return (
    <aside className="carrito">
      <h3 className="carrito-titulo">🛒 Tu carrito</h3>

      {itemsSeguros.length === 0 ? (
        <p className="carrito-vacio">Aún no has agregado productos.</p>
      ) : (
        <>
          <ul className="carrito-lista">
            {itemsSeguros.map((item) => {
              const cantidad = item.cantidad ?? 1;
              const precioNum = item.precio ?? 0;
              const subtotal = precioNum * cantidad;

              const key = item.idUnico ?? item.codigo;

              return (
                <li key={key} className="carrito-item">
                  <div className="carrito-info-principal">
                    <span className="carrito-nombre">{item.nombre}</span>
                    <span className="carrito-precio-unit">
                      {item.precioTexto ||
                        `$${precioNum.toLocaleString("es-CL")}`}
                    </span>
                  </div>

                  <div className="carrito-controles">
                    <button
                      className="carrito-btn-cant"
                      type="button"
                      onClick={() => eliminar(item)}
                    >
                      −
                    </button>

                    <span className="carrito-cantidad">{cantidad}</span>

                    <button
                      className="carrito-btn-cant"
                      type="button"
                      onClick={() => agregar(item)}
                    >
                      +
                    </button>
                  </div>

                  <div className="carrito-subtotal">
                    Subtotal:{" "}
                    <strong>
                      $
                      {subtotal.toLocaleString("es-CL")}
                    </strong>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="carrito-resumen">
            <p>
              Productos: <strong>{totalProductos}</strong>
            </p>
            <p>
              Total:{" "}
              <strong>
                ${totalSeguro.toLocaleString("es-CL")}
              </strong>
            </p>
          </div>

          <div className="carrito-acciones">
            <button
              type="button"
              className="btn-vaciar"
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>

            <button
              type="button"
              className="btn-pagar"
              onClick={handlePagar}
            >
              Pagar
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default Carrito;
