// src/pages/Perfil.jsx
import "../styles/styles.css";
import "../styles/perfil.css";

import { usePerfil } from "../hooks/usePerfil";
import HistorialCompras from "../components/HistorialCompras";

function Perfil() {
  const {
    usuario,
    direccion,
    preferencias,
    guardando,
    compras,
    cargandoCompras,
    setDireccion,
    setPreferencias,
    handleGuardar,
    handleLogout,
  } = usePerfil();

  if (!usuario) {
    return <p style={{ textAlign: "center" }}>Cargando perfil...</p>;
  }

  return (
    <>
      <h2 className="titulo-perfil">Perfil del Usuario</h2>

      <main className="contenedor-perfil">
        <section className="tarjeta-perfil">
          <h3 className="bienvenida">Bienvenido, {usuario.nombre}</h3>

          <p>📧 Correo: {usuario.email}</p>
          <p>🎂 Edad: {usuario.edad}</p>

          <div className="campo-editable">
            <span>🏠 Dirección:&nbsp;</span>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          <div className="campo-editable" style={{ marginTop: "10px" }}>
            <span>⭐ Preferencias:&nbsp;</span>
            <input
              type="text"
              value={preferencias}
              onChange={(e) => setPreferencias(e.target.value)}
            />
          </div>

          <h4 style={{ marginTop: "20px" }}>Historial de Compras</h4>

          <HistorialCompras compras={compras} cargando={cargandoCompras} />

          <form onSubmit={handleGuardar} style={{ marginTop: "20px" }}>
            <button type="submit" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>

          <button onClick={handleLogout} className="btn-cerrar-sesion">
            Cerrar Sesión
          </button>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Level-Up Gamer</p>
      </footer>
    </>
  );
}

export default Perfil;
