// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { obtenerUsuario, cerrarSesion } from "../services/sesionService";

function Header() {
  const navigate = useNavigate();
  const usuario = obtenerUsuario(); // lee desde localStorage

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <>
      <header className="navbar">
        <img
          src="/img/Logo levelUp.png"
          width="150"
          height="120"
          alt="Level-Up Gamer"
        />
        <div className="acciones">
          {/* enlaces visibles para todos */}
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/eventos">Eventos</Link>

          {/* si NO hay usuario logueado */}
          {!usuario && <Link to="/login">Registrarse - Login</Link>}

          {/* si hay usuario logueado */}
          {usuario && (
            <>
              {/* perfil siempre disponible */}
              {usuario.rol === "USUARIO" && <Link to="/perfil">Mi Perfil</Link>}

              {/* link extra SOLO para admin */}
              {usuario.rol === "ADMIN" && <Link to="/admin">Panel Admin</Link>}

              {/* botón cerrar sesión */}
              <button
                type="button"
                className="btn-cerrar-sesion"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </header>

      <div className="mensaje-top">
        <p>
          Envíos a todo Chile |{" "}
          <strong>20% de descuento</strong> con registro correo DuocUC
        </p>
      </div>
    </>
  );
}

export default Header;
