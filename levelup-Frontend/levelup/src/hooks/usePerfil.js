// src/hooks/usePerfil.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { actualizarPerfil } from "../services/userService";
import {
  obtenerUsuario,
  guardarUsuario,
  cerrarSesion,
} from "../services/sesionService";
import { obtenerComprasUsuario } from "../services/comprasService";

export function usePerfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [direccion, setDireccion] = useState("");
  const [preferencias, setPreferencias] = useState("");
  const [guardando, setGuardando] = useState(false);

  const [compras, setCompras] = useState([]);
  const [cargandoCompras, setCargandoCompras] = useState(true);

  
  useEffect(() => {
    const u = obtenerUsuario();

    if (!u) {
      navigate("/login");
      return;
    }

    setUsuario(u);
    setDireccion(u.direccion || "");
    setPreferencias(u.preferencias || "");
  }, [navigate]);

  
  useEffect(() => {
    const cargarCompras = async () => {
      if (!usuario?.id) {
        setCargandoCompras(false);
        return;
      }

      const res = await obtenerComprasUsuario(usuario.id);
      if (res.ok) {
        setCompras(res.compras);
      }
      setCargandoCompras(false);
    };

    cargarCompras();
  }, [usuario]);

  const handleGuardar = async (e) => {
    e.preventDefault();

    if (!usuario?.id) {
      alert("No se encontró el usuario en sesión.");
      return;
    }

    setGuardando(true);

    const resultado = await actualizarPerfil(usuario, {
      direccion,
      preferencias,
    });

    setGuardando(false);

    if (!resultado.ok) {
      alert(resultado.mensaje);
      return;
    }

    setUsuario(resultado.usuario);
    guardarUsuario(resultado.usuario);

    alert("Datos de perfil actualizados correctamente");
  };

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return {
    
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
  };
}
