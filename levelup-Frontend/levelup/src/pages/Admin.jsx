// src/pages/Admin.jsx
import "../styles/admin.css";
import "../styles/perfil.css";

import AdminUsersTable from "../components/AdminUsersTable";
import { useAdmin } from "../hooks/useAdmin";

function Admin() {
  const {
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
  } = useAdmin();

  if (cargandoUsuarios) {
    return <p style={{ textAlign: "center" }}>Cargando usuarios...</p>;
  }

  return (
    <main className="admin-container">
      <section className="tarjeta-perfil" style={{ width: "100%" }}>
        <h2 className="admin-title">Panel de Administración</h2>

        <h3>Usuarios registrados</h3>

        <AdminUsersTable
          usuarios={usuarios}
          adminActual={adminActual}
          nombreEdit={nombreEdit}
          setNombreEdit={setNombreEdit}
          emailEdit={emailEdit}
          setEmailEdit={setEmailEdit}
          rolEdit={rolEdit}
          setRolEdit={setRolEdit}
          passwordEdit={passwordEdit}
          setPasswordEdit={setPasswordEdit}
          onActualizarDatos={handleActualizarDatos}
          onCambiarRol={handleCambiarRol}
          onCambiarPassword={handleCambiarPassword}
          onEliminarUsuario={handleEliminarUsuario}
          onVerCompras={handleVerCompras}
        />

        <hr style={{ margin: "20px 0" }} />

        <h3>Compras del usuario seleccionado</h3>

        {!usuarioSeleccionado && (
          <p>Selecciona un usuario para ver sus compras.</p>
        )}

        {usuarioSeleccionado && (
          <>
            <p>
              <strong>{usuarioSeleccionado.nombre}</strong> (
              {usuarioSeleccionado.email})
            </p>

            {cargandoCompras ? (
              <p>Cargando compras...</p>
            ) : comprasUsuario.length === 0 ? (
              <p>No registra compras.</p>
            ) : (
              <ul>
                {comprasUsuario.map((c) => (
                  <li key={c.id}>
                    {new Date(c.fecha).toLocaleString("es-CL")} —{" "}
                    <strong>${c.total.toLocaleString("es-CL")}</strong> —{" "}
                    {c.detalle}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Admin;
