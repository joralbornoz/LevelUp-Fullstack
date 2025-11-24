import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "../styles/styles.css";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  
  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem("usuario"));
    } catch {
      return null;
    }
  })();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("usuario");   
    navigate("/login");                   
  }, [navigate]);

  return (
    <nav className="navbar">
      {/* links de navegacións */}
      <Link to="/" className="nav-link">Inicio</Link>
      <Link to="/catalogo" className="nav-link">Catálogo</Link>

      {/* Si no hay usuario, mostrar botón/login */}
      {!usuario && (
        <Link to="/login" className="nav-link">
          Iniciar sesión
        </Link>
      )}

      {/* Si hay usuario logueado, mostrar saludo + Cerrar sesión */}
      {usuario && (
        <div className="nav-user">
          <span className="nav-username">Hola, {usuario.nombre}</span>
          <button onClick={handleLogout} className="nav-logout-btn">
            Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
