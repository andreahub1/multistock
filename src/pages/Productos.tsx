import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

// generar código aleatorio
function generarCodigo() {
  return "P-" + Math.floor(10000 + Math.random() * 90000);
}

function Productos() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const isAdmin = usuario?.rol === "Administrador";

  // =========================
  // ESTADO DESDE DJANGO
  // =========================
  const [productos, setProductos] = useState<any[]>([]);

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
  });

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [productoEditado, setProductoEditado] = useState<any>(null);

  // =========================
  // CARGAR PRODUCTOS (DJANGO)
  // =========================
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/productos/");
    const data = await res.json();
    setProductos(data);
  };

  // =========================
  // AGREGAR PRODUCTO (DJANGO)
  // =========================
  const handleAdd = async () => {
    if (!form.nombre) return;

    await fetch("http://127.0.0.1:8000/api/productos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo: generarCodigo(),
        nombre: form.nombre,
        categoria: form.categoria,
        precio: Number(form.precio),
        stock: Number(form.stock),
      }),
    });

    setForm({
      nombre: "",
      categoria: "",
      precio: "",
      stock: "",
    });

    cargarProductos();
  };

  // =========================
  // ELIMINAR (DJANGO)
  // =========================
  const eliminar = async (id: number) => {
    if (!isAdmin) return;

    await fetch(`http://127.0.0.1:8000/api/productos/${id}/`, {
      method: "DELETE",
    });

    cargarProductos();
  };

  // =========================
  // EDITAR (LOCAL + PATCH)
  // =========================
  const iniciarEdicion = (p: any) => {
    if (!isAdmin) return;
    setEditandoId(p.id);
    setProductoEditado({ ...p });
  };

  const guardarEdicion = async () => {
    if (!productoEditado) return;

    await fetch(
      `http://127.0.0.1:8000/api/productos/${productoEditado.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoEditado),
      }
    );

    setEditandoId(null);
    setProductoEditado(null);

    cargarProductos();
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setProductoEditado(null);
  };

  return (
    <DashboardLayout>
      <div className="productos-container">
        <h1>Gestión de Productos</h1>

        {/* =========================
            FORMULARIO
        ========================= */}
        <div className="admin-card">
          <h2>Nuevo Producto</h2>

          <div className="admin-form">
            <input
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) =>
                setForm({ ...form, nombre: e.target.value })
              }
            />

            <input
              placeholder="Categoría"
              value={form.categoria}
              onChange={(e) =>
                setForm({ ...form, categoria: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Precio"
              value={form.precio}
              onChange={(e) =>
                setForm({ ...form, precio: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
            />

            <button className="btn-save" onClick={handleAdd}>
              Agregar Producto
            </button>
          </div>
        </div>

        {/* =========================
            TABLA
        ========================= */}
        <div className="admin-card">
          <h2>Productos Registrados</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                {isAdmin && <th>Acciones</th>}
              </tr>
            </thead>

            <tbody>
              {productos.map((p: any) => (
                <tr key={p.id}>
                  <td>{p.codigo}</td>

                  <td>
                    {editandoId === p.id ? (
                      <input
                        value={productoEditado?.nombre || ""}
                        onChange={(e) =>
                          setProductoEditado({
                            ...productoEditado,
                            nombre: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.nombre
                    )}
                  </td>

                  <td>
                    {editandoId === p.id ? (
                      <input
                        value={productoEditado?.categoria || ""}
                        onChange={(e) =>
                          setProductoEditado({
                            ...productoEditado,
                            categoria: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.categoria
                    )}
                  </td>

                  <td>
                    {editandoId === p.id ? (
                      <input
                        type="number"
                        value={productoEditado?.precio || ""}
                        onChange={(e) =>
                          setProductoEditado({
                            ...productoEditado,
                            precio: Number(e.target.value),
                          })
                        }
                      />
                    ) : (
                      `$${p.precio}`
                    )}
                  </td>

                  <td>
                    {editandoId === p.id ? (
                      <input
                        type="number"
                        value={productoEditado?.stock || ""}
                        onChange={(e) =>
                          setProductoEditado({
                            ...productoEditado,
                            stock: Number(e.target.value),
                          })
                        }
                      />
                    ) : (
                      p.stock
                    )}
                  </td>

                  {isAdmin && (
                    <td>
                      <div className="action-buttons">
                        {editandoId === p.id ? (
                          <>
                            <button
                              className="btn-save"
                              onClick={guardarEdicion}
                            >
                              <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
                            </button>

                            <button
                              className="btn-cancel"
                              onClick={cancelarEdicion}
                            >
                              <FontAwesomeIcon icon={faXmark} /> Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn-edit"
                              onClick={() => iniciarEdicion(p)}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} /> Editar
                            </button>

                            <button
                              className="btn-delete"
                              onClick={() => eliminar(p.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} /> Eliminar
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Productos;