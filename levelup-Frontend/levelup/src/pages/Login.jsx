import "../styles/styles.css";
import "../styles/login.css";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const {
    
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,

    formRegistro,
    actualizarRegistro,
    handleRegistro,
  } = useLogin();

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Acceso a tu cuenta</h2>

      <main>
        {/* LOGIN */}
        <section className="formulario">
          <h3>Iniciar Sesión</h3>

          <form onSubmit={handleLogin}>
            <label>Correo:</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />

            <label>Contraseña:</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />

            <button type="submit">Ingresar</button>
          </form>
        </section>

        {/* REGISTRO */}
        <section className="formulario">
          <h3>Crear Cuenta</h3>

          <form onSubmit={handleRegistro}>
            <label>Nombre completo:</label>
            <input
              type="text"
              value={formRegistro.nombre}
              onChange={(e) =>
                actualizarRegistro("nombre", e.target.value)
              }
              required
            />

            <label>Correo:</label>
            <input
              type="email"
              value={formRegistro.email}
              onChange={(e) => actualizarRegistro("email", e.target.value)}
              required
            />

            <label>Edad:</label>
            <input
              type="number"
              min="18"
              value={formRegistro.edad}
              onChange={(e) => actualizarRegistro("edad", e.target.value)}
              required
            />

            <label>Contraseña:</label>
            <input
              type="password"
              value={formRegistro.password}
              onChange={(e) =>
                actualizarRegistro("password", e.target.value)
              }
              required
            />

            <label>Preferencias:</label>
            <input
              type="text"
              value={formRegistro.preferencias}
              onChange={(e) =>
                actualizarRegistro("preferencias", e.target.value)
              }
            />

            <button type="submit">Registrarse</button>
          </form>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Level-Up Gamer</p>
      </footer>
    </>
  );
}

export default Login;
