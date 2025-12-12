// src/components/ProductoCard.jsx

function ProductoCard({ producto, agregar }) {
  const { codigo, nombre, descripcion, imagen, precioTexto, stock } = producto;

  const sinStock = typeof stock === "number" && stock <= 0;

  return (
    <div className="producto-card">
      <img src={imagen} alt={nombre} />

      <div className="info">
        <h4>{nombre}</h4>

        <p>
          <strong>Código:</strong> {codigo}
        </p>

        <p>
          <strong>Precio:</strong> {precioTexto}
        </p>

        <p>
          <strong>Descripción:</strong> {descripcion}
        </p>

        <p style={{ marginTop: "5px", marginBottom: "10px" }}>
          <strong>Stock:</strong>{" "}
          {sinStock ? (
            <span style={{ color: "red" }}>Sin stock</span>
          ) : (
            <span style={{ color: "#39ff14" }}>{stock}</span>
          )}
        </p>

        <button
          className="btn-agregar"
          onClick={() => agregar(producto)}
          disabled={sinStock}
          style={{
            opacity: sinStock ? 0.5 : 1,
            cursor: sinStock ? "not-allowed" : "pointer",
          }}
        >
          {sinStock ? "No disponible" : "Agregar"}
        </button>

        <p style={{ marginTop: "15px" }}>
          <strong>Tu opinión nos importa:</strong>
        </p>

        <select name="rating">
          <option value="5">5 - Excelente</option>
          <option value="4">4 - Muy bueno</option>
          <option value="3">3 - Normal</option>
          <option value="2">2 - Malo</option>
          <option value="1">1 - Muy malo</option>
        </select>

        <br />
        <br />

        <textarea
          name="comentario"
          placeholder="Escribe tu reseña..."
          required
        ></textarea>

        <br />

        <button type="submit">Enviar</button>
        <button className="compartir">Compartir</button>
      </div>
    </div>
  );
}

export default ProductoCard;
