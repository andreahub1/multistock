import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPenToSquare,
  faTrash,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface Usuario {
  id: number;
  usuario: string;
  nombre: string;
  password: string;
  rol: string;
}

function Administracion() {
  const [tabActiva, setTabActiva] = useState("resumen");

  // =========================
  // USUARIOS
  // =========================
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const cargarUsuarios = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/usuarios/");
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarProductos = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/productos/");
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // PRODUCTOS
  // =========================
  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {
    cargarUsuarios();
    cargarProductos();
  }, []);

  // =========================
  // FORM USUARIO
  // =========================
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: "",
    nombre: "",
    password: "",
    confirmarPassword: "",
    rol: "Empleado",
  });

  const [verPasswordId, setVerPasswordId] = useState<number | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [usuarioEditado, setUsuarioEditado] = useState<Usuario | null>(null);

  // =========================
  // ALERTAS / RESUMEN
  // =========================
  const totalUsuarios = usuarios.length;
  const totalProductos = productos.length;

  // =========================
  // AGREGAR USUARIO
  // =========================
  const agregarUsuario = async () => {
    if (
      !nuevoUsuario.usuario ||
      !nuevoUsuario.nombre ||
      !nuevoUsuario.password ||
      !nuevoUsuario.confirmarPassword
    ) {
      alert("Completa todos los campos");
      return;
    }

    if (nuevoUsuario.password !== nuevoUsuario.confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await fetch("http://127.0.0.1:8000/api/usuarios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: nuevoUsuario.usuario,
          nombre: nuevoUsuario.nombre,
          password: nuevoUsuario.password,
          rol: nuevoUsuario.rol,
        }),
      });

      setNuevoUsuario({
        usuario: "",
        nombre: "",
        password: "",
        confirmarPassword: "",
        rol: "Empleado",
      });

      cargarUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // ELIMINAR USUARIO
  // =========================
  const eliminarUsuario = async (id: number) => {
    try {
      await fetch(
        `http://127.0.0.1:8000/api/usuarios/${id}/`,
        {
          method: "DELETE",
        }
      );

      cargarUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // EDITAR USUARIO
  // =========================
  const guardarEdicion = async () => {
    if (!usuarioEditado) return;

    try {
      await fetch(
        `http://127.0.0.1:8000/api/usuarios/${usuarioEditado.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioEditado),
        }
      );

      setEditandoId(null);
      setUsuarioEditado(null);

      cargarUsuarios();
    } catch (error) {
      console.error(error);
    }
  };
  // PEGA ESTO AQUÍ
  const iniciarEdicion = (usuario: Usuario) => {
    setEditandoId(usuario.id);
    setUsuarioEditado({ ...usuario });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setUsuarioEditado(null);
  };

  return (
    <DashboardLayout>
      <h1 className="admin-title">Panel de Administración</h1>

      {/* TABS */}
      <div className="admin-tabs">
        <button
          className={tabActiva === "resumen" ? "tab active" : "tab"}
          onClick={() => setTabActiva("resumen")}
        >
          Resumen
        </button>

        <button
          className={tabActiva === "usuarios" ? "tab active" : "tab"}
          onClick={() => setTabActiva("usuarios")}
        >
          Usuarios
        </button>
      </div>

      {/* =========================
          RESUMEN
      ========================= */}
      {tabActiva === "resumen" && (
        <>
          <div className="stats-grid">

            <div className="stat-card">
              <span>Total Usuarios</span>
              <h2>{totalUsuarios}</h2>
            </div>

            <div className="stat-card">
              <span>Total Productos</span>
              <h2>{totalProductos}</h2>
            </div>

            <div className="stat-card">
              <span>Categorías</span>
              <h2>
                {new Set(productos.map((p) => p.categoria)).size}
              </h2>
            </div>

            <div className="stat-card">
              <span>Stock Total</span>
              <h2>
                {productos.reduce(
                  (sum, p) => sum + Number(p.stock || 0),
                  0
                )}
              </h2>
            </div>

          </div>

          <div className="alertas-container">

            <div className="alerta alerta-warning">
              <h3>
                Productos con stock bajo: {
                  productos.filter(
                    (p) =>
                      Number(p.stock) > 0 &&
                      Number(p.stock) <= 5
                  ).length
                }
              </h3>

              <p>
                Productos con menos de 5 unidades disponibles.
              </p>
            </div>

            <div className="alerta alerta-info">
              <h3>
                Stock crítico: {
                  productos.filter(
                    (p) => Number(p.stock) <= 2
                  ).length
                }
              </h3>

              <p>
                Productos con 2 unidades o menos.
              </p>
            </div>

            <div className="alerta alerta-danger">
              <h3>
                Productos agotados: {
                  productos.filter(
                    (p) => Number(p.stock) === 0
                  ).length
                }
              </h3>

              <p>
                Reposición inmediata requerida.
              </p>
            </div>

          </div>
        </>
      )}
      {/* =========================
          USUARIOS
      ========================= */}
      {tabActiva === "usuarios" && (
        <>
          {/* FORM */}
          <div className="admin-card">
            <h2>Nuevo Usuario</h2>

            <div className="admin-form">
              <input
                placeholder="Usuario"
                value={nuevoUsuario.usuario}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, usuario: e.target.value })
                }
              />

              <input
                placeholder="Nombre"
                value={nuevoUsuario.nombre}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={nuevoUsuario.password}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={nuevoUsuario.confirmarPassword}
                onChange={(e) =>
                  setNuevoUsuario({
                    ...nuevoUsuario,
                    confirmarPassword: e.target.value,
                  })
                }
              />

              <select
                value={nuevoUsuario.rol}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
                }
              >
                <option value="Administrador">Administrador</option>
                <option value="Empleado">Empleado</option>
              </select>

              <button onClick={agregarUsuario}>Agregar Usuario</button>
            </div>
          </div>

          {/* TABLE */}
          <div className="admin-card">
            <h2>Usuarios Registrados</h2>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Contraseña</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    {/* USUARIO */}
                    <td>
                      {editandoId === usuario.id ? (
                        <input
                          value={usuarioEditado?.usuario || ""}
                          onChange={(e) =>
                            setUsuarioEditado({
                              ...usuarioEditado!,
                              usuario: e.target.value,
                            })
                          }
                        />
                      ) : (
                        usuario.usuario
                      )}
                    </td>

                    {/* NOMBRE */}
                    <td>
                      {editandoId === usuario.id ? (
                        <input
                          value={usuarioEditado?.nombre || ""}
                          onChange={(e) =>
                            setUsuarioEditado({
                              ...usuarioEditado!,
                              nombre: e.target.value,
                            })
                          }
                        />
                      ) : (
                        usuario.nombre
                      )}
                    </td>


                    {/* ROL */}
                    <td>
                      {editandoId === usuario.id ? (
                        <select
                          value={usuarioEditado?.rol || ""}
                          onChange={(e) =>
                            setUsuarioEditado({
                              ...usuarioEditado!,
                              rol: e.target.value,
                            })
                          }
                        >
                          <option value="Administrador">
                            Administrador
                          </option>

                          <option value="Empleado">
                            Empleado
                          </option>
                        </select>
                      ) : (
                        usuario.rol
                      )}
                    </td>

                    {/* PASSWORD */}
                    <td>
                      {editandoId === usuario.id ? (
                        <input
                          type="text"
                          value={usuarioEditado?.password || ""}
                          onChange={(e) =>
                            setUsuarioEditado({
                              ...usuarioEditado!,
                              password: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <div style={{ display: "flex", gap: "10px" }}>
                          {verPasswordId === usuario.id
                            ? usuario.password
                            : "••••••••"}

                          <button
                            className="btn-view"
                            onClick={() =>
                              setVerPasswordId(
                                verPasswordId === usuario.id
                                  ? null
                                  : usuario.id
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={
                                verPasswordId === usuario.id
                                  ? faEyeSlash
                                  : faEye
                              }
                            />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* ACCIONES */}
                    <td>
                      <div className="action-buttons">
                        {editandoId === usuario.id ? (
                          <>
                            <button className="btn-save" onClick={guardarEdicion}>
                              <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
                            </button>

                            <button className="btn-cancel" onClick={cancelarEdicion}>
                              <FontAwesomeIcon icon={faXmark} /> Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn-edit"
                              onClick={() => iniciarEdicion(usuario)}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} /> Editar
                            </button>

                            <button
                              className="btn-delete"
                              onClick={() => eliminarUsuario(usuario.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} /> Eliminar
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Administracion;