// src/components/AdminUsersTable.jsx
function AdminUsersTable({
  usuarios,
  adminActual,
  nombreEdit,
  setNombreEdit,
  emailEdit,
  setEmailEdit,
  rolEdit,
  setRolEdit,
  passwordEdit,
  setPasswordEdit,
  onActualizarDatos,
  onCambiarRol,
  onCambiarPassword,
  onEliminarUsuario,
  onVerCompras,
}) {
  if (!usuarios || usuarios.length === 0) {
    return <p>No hay usuarios registrados.</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="tabla-admin">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol actual</th>
            <th>Nuevo rol</th>
            <th>Nueva contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => {
            const esAdminActual = adminActual && u.id === adminActual.id;

            return (
              <tr key={u.id}>
                <td>{u.id}</td>

                {/* Nombre editable */}
                <td>
                  {esAdminActual ? (
                    u.nombre
                  ) : (
                    <input
                      className="admin-input"
                      type="text"
                      defaultValue={u.nombre}
                      onChange={(e) => setNombreEdit(e.target.value)}
                    />
                  )}
                </td>

                {/* Email editable */}
                <td>
                  {esAdminActual ? (
                    u.email
                  ) : (
                    <input
                      className="admin-input"
                      type="email"
                      defaultValue={u.email}
                      onChange={(e) => setEmailEdit(e.target.value)}
                    />
                  )}
                </td>

                {/* Rol actual */}
                <td>{u.rol}</td>

                {/* Nuevo rol */}
                <td>
                  {esAdminActual ? (
                    <span>No editable</span>
                  ) : (
                    <>
                      <select
                        className="admin-select"
                        defaultValue={u.rol || "USUARIO"}
                        onChange={(e) => setRolEdit(e.target.value)}
                      >
                        <option value="USUARIO">USUARIO</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                      <button
                        className="admin-btn"
                        style={{ marginLeft: "5px" }}
                        type="button"
                        onClick={() => onCambiarRol(u)}
                      >
                        Guardar rol
                      </button>
                    </>
                  )}
                </td>

                {/* Nueva contraseña */}
                <td>
                  {esAdminActual ? (
                    <span>No editable</span>
                  ) : (
                    <input
                      className="admin-input"
                      type="password"
                      value={passwordEdit}
                      onChange={(e) => setPasswordEdit(e.target.value)}
                      placeholder="Nueva contraseña"
                    />
                  )}
                </td>

                {/* Acciones */}
                <td>
                  {esAdminActual ? (
                    <span>—</span>
                  ) : (
                    <>
                      <button
                        className="admin-btn"
                        type="button"
                        onClick={() => onActualizarDatos(u)}
                      >
                        Guardar datos
                      </button>
                      <br />

                      <button
                        className="admin-btn"
                        type="button"
                        style={{ marginTop: "5px" }}
                        onClick={() => onCambiarPassword(u)}
                      >
                        Cambiar pass
                      </button>
                      <br />

                      <button
                        className="admin-btn"
                        type="button"
                        style={{
                          marginTop: "5px",
                          backgroundColor: "red",
                        }}
                        onClick={() => onEliminarUsuario(u)}
                      >
                        Eliminar usuario
                      </button>
                      <br />

                      <button
                        className="admin-btn"
                        type="button"
                        style={{ marginTop: "5px" }}
                        onClick={() => onVerCompras(u)}
                      >
                        Ver compras
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersTable;
