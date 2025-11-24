// src/components/RutaAdmin.jsx
import { Navigate } from "react-router-dom";
import { obtenerUsuario } from "../services/sesionService";

function RutaAdmin({ children }) {
  const usuario = obtenerUsuario();


  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  
  if (usuario.rol !== "ADMIN") {
    return <Navigate to="/perfil" replace />;
  }

  return children;
}

export default RutaAdmin;
