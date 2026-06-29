import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaBoxOpen,
  FaTags,
  FaExclamationTriangle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";

type Producto = {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
};

function Inicio() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/productos/");
      const data = await res.json();

      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setCargando(false);
    }
  };

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [productos, busqueda]);

  const totalProductos = productos.length;

  const totalCategorias = new Set(
    productos.map((producto) => producto.categoria)
  ).size;

  const stockBajo = productos.filter(
    (producto) => producto.stock > 0 && producto.stock <= 8
  ).length;

  const agotados = productos.filter((producto) => producto.stock === 0).length;

  const productosStockBajo = productos.filter(
    (producto) => producto.stock > 0 && producto.stock <= 8
  );

  const productosAgotados = productos.filter(
    (producto) => producto.stock === 0
  );

  return (
    <DashboardLayout>
      <div className="inicio-container">
        <div className="welcome-section">
          <div>
            <h1>¡Bienvenido, Admin!</h1>
            <p>Resumen general de tu inventario</p>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {cargando && <p>Cargando productos...</p>}

        {busqueda && (
          <div className="search-results">
            <h3>Resultados de búsqueda</h3>

            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <div key={producto.id} className="search-result-item">
                  <div>
                    <strong>{producto.nombre}</strong>
                    <p>{producto.categoria}</p>
                  </div>

                  <span>Stock: {producto.stock}</span>
                </div>
              ))
            ) : (
              <p>No se encontraron productos.</p>
            )}
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-box blue-bg">
              <FaBoxOpen />
            </div>

            <div>
              <h3>Total de Productos</h3>
              <span>{totalProductos}</span>
              <p>Inventario registrado</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box green-bg">
              <FaTags />
            </div>

            <div>
              <h3>Categorías</h3>
              <span>{totalCategorias}</span>
              <p>Clasificación actual</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box orange-bg">
              <FaExclamationTriangle />
            </div>

            <div>
              <h3>Stock Bajo</h3>
              <span>{stockBajo}</span>
              <p className="warning">Requieren atención</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box red-bg">
              <FaTimesCircle />
            </div>

            <div>
              <h3>Agotados</h3>
              <span>{agotados}</span>
              <p className="danger">Sin disponibilidad</p>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="card">
            <div className="card-header">
              <h2>Productos con stock bajo</h2>
            </div>

            {productosStockBajo.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                  </tr>
                </thead>

                <tbody>
                  {productosStockBajo.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.codigo}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoria}</td>
                      <td>
                        <span className="badge warning-badge">
                          {producto.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay productos con stock bajo.</p>
            )}
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Productos agotados</h2>
            </div>

            {productosAgotados.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                  </tr>
                </thead>

                <tbody>
                  {productosAgotados.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoria}</td>
                      <td>
                        <span className="badge salida">Agotado</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay productos agotados.</p>
            )}
          </div>
        </div>

        <div className="status-card">
          <div>
            <h3>Resumen del inventario</h3>
            <p>
              Tienes {totalProductos} productos registrados, {stockBajo} con
              stock bajo y {agotados} agotados.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Inicio;