// src/components/HistorialCompras.jsx

function HistorialCompras({ compras, cargando }) {
    if (cargando) {
        return <p>Cargando historial...</p>;
    }

    if (!compras || compras.length === 0) {
        return <p>"No registra compras"</p>;
    }

    return (
        <ul>
            {compras.map((c) => (
                <li key={c.id}>
                    {new Date(c.fecha).toLocaleString("es-CL", {
                        hour12: false,
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    })} —{" "}
                    <strong>${c.total.toLocaleString("es-CL")}</strong> — {c.detalle}
                </li>
            ))}
        </ul>
    );
}

export default HistorialCompras;
