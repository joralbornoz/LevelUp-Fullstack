// src/components/RutaProtegida.jsx
import { Navigate } from "react-router-dom";
import { obtenerUsuario } from "../services/sesionService";

function RutaProtegida({ children }) {
  const usuario = obtenerUsuario();


  if (!usuario) {
    return <Navigate to="/login" replace />;
  }


  if (usuario.rol === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default RutaProtegida;
