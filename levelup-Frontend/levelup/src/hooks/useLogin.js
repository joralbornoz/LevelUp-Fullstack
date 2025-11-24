// src/hooks/useLogin.js
import { useState } from "react";
import { registrarUsuario, loginUsuario } from "../services/authService";
import { guardarToken, guardarUsuario } from "../services/sesionService";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  
  const [formRegistro, setFormRegistro] = useState({
    nombre: "",
    email: "",
    edad: "",
    password: "",
    preferencias: "",
  });

 
  const actualizarRegistro = (campo, valor) => {
    setFormRegistro((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();

    const resultado = await loginUsuario(loginEmail, loginPassword);

    if (!resultado.ok) {
      alert(resultado.mensaje);
      return;
    }

    const { token, usuario } = resultado;

    guardarToken(token);
    guardarUsuario(usuario);

    if (usuario.rol === "ADMIN") navigate("/admin");
    else navigate("/perfil");
  };

  
  const handleRegistro = async (e) => {
    e.preventDefault();

    const resultado = await registrarUsuario(formRegistro);

    if (!resultado.ok) {
      alert(resultado.mensaje);
      return;
    }

    alert(resultado.mensaje);

    
    setFormRegistro({
      nombre: "",
      email: "",
      edad: "",
      password: "",
      preferencias: "",
    });
  };

  return {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
    formRegistro,
    actualizarRegistro,
    handleRegistro,
  };
}
