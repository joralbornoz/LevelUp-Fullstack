// src/hooks/useAdmin.js
import { useEffect, useState } from "react";
import {
  obtenerUsuariosAdmin,
  obtenerComprasUsuarioAdmin,
  actualizarRolUsuarioAdmin,
  actualizarPasswordUsuarioAdmin,
  actualizarDatosBasicosAdmin,
  eliminarUsuarioAdmin,
} from "../services/adminService";
import { obtenerUsuario } from "../services/sesionService";

export function useAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [comprasUsuario, setComprasUsuario] = useState([]);
  const [cargandoCompras, setCargandoCompras] = useState(false);

 
  const [rolEdit, setRolEdit] = useState("");
  const [passwordEdit, setPasswordEdit] = useState("");
  const [nombreEdit, setNombreEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");

  
  const adminActual = obtenerUsuario();

  
  useEffect(() => {
    const cargar = async () => {
      const res = await obtenerUsuariosAdmin();
      if (res.ok) {
        setUsuarios(res.usuarios);
      } else {
        alert(res.mensaje);
      }
      setCargandoUsuarios(false);
    };

    cargar();
  }, []);

  const handleVerCompras = async (usuario) => {
    setUsuarioSeleccionado(usuario);
    setComprasUsuario([]);
    setCargandoCompras(true);

    const res = await obtenerComprasUsuarioAdmin(usuario.id);
    if (res.ok) {
      setComprasUsuario(res.compras);
    } else {
      alert(res.mensaje);
    }
    setCargandoCompras(false);
  };

  const handleCambiarRol = async (usuario) => {
    const nuevoRol = rolEdit || usuario.rol || "USUARIO";

    const res = await actualizarRolUsuarioAdmin(usuario.id, nuevoRol);
    if (!res.ok) {
      alert(res.mensaje);
      return;
    }

    alert("Rol actualizado correctamente");

    setUsuarios((prev) =>
      prev.map((u) => (u.id === usuario.id ? res.usuario : u))
    );
    setRolEdit("");
  };

  const handleCambiarPassword = async (usuario) => {
    if (!passwordEdit || passwordEdit.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const res = await actualizarPasswordUsuarioAdmin(usuario.id, passwordEdit);
    if (!res.ok) {
      alert(res.mensaje);
      return;
    }

    alert("Contraseña actualizada correctamente");
    setPasswordEdit("");
  };

  const handleActualizarDatos = async (usuario) => {
    const nombre = nombreEdit || usuario.nombre;
    const email = emailEdit || usuario.email;

    const res = await actualizarDatosBasicosAdmin(usuario.id, nombre, email);
    if (!res.ok) {
      alert(res.mensaje);
      return;
    }

    alert("Datos de usuario actualizados correctamente");

    setUsuarios((prev) =>
      prev.map((u) => (u.id === usuario.id ? res.usuario : u))
    );

    setNombreEdit("");
    setEmailEdit("");
  };

  const handleEliminarUsuario = async (usuario) => {
    if (
      !window.confirm(
        `¿Eliminar al usuario "${usuario.nombre}" (${usuario.email})? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    const res = await eliminarUsuarioAdmin(usuario.id);
    if (!res.ok) {
      alert(res.mensaje);
      return;
    }

    alert("Usuario eliminado correctamente");

    setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));

    if (usuarioSeleccionado?.id === usuario.id) {
      setUsuarioSeleccionado(null);
      setComprasUsuario([]);
    }
  };

  return {
    
    usuarios,
    cargandoUsuarios,
    usuarioSeleccionado,
    comprasUsuario,
    cargandoCompras,
    adminActual,
    rolEdit,
    setRolEdit,
    passwordEdit,
    setPasswordEdit,
    nombreEdit,
    setNombreEdit,
    emailEdit,
    setEmailEdit,
    handleVerCompras,
    handleCambiarRol,
    handleCambiarPassword,
    handleActualizarDatos,
    handleEliminarUsuario,
  };
}
