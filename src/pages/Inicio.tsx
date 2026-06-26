import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaBoxOpen,
  FaTags,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

function Inicio() {
  return (
    <DashboardLayout>
      <div className="inicio-container">
        <div className="welcome-section">
          <div>
            <h1>Bienvenido, Admin 👋</h1>
            <p>Resumen general de tu inventario</p>
          </div>

          <input
            type="text"
            placeholder="Buscar productos..."
            className="search-input"
          />
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <FaBoxOpen className="stat-icon blue" />
            <div>
              <h3>Total Productos</h3>
              <span>5</span>
            </div>
          </div>

          <div className="stat-card">
            <FaTags className="stat-icon purple" />
            <div>
              <h3>Categorías</h3>
              <span>10</span>
            </div>
          </div>

          <div className="stat-card">
            <FaExclamationTriangle className="stat-icon orange" />
            <div>
              <h3>Stock Bajo</h3>
              <span>8</span>
            </div>
          </div>

          <div className="stat-card">
            <FaTimesCircle className="stat-icon red" />
            <div>
              <h3>Agotados</h3>
              <span>3</span>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="card">
            <h2>Resumen de movimientos</h2>

            <div className="fake-chart">
              <div className="chart-line chart-green"></div>
              <div className="chart-line chart-blue"></div>
            </div>
          </div>

          <div className="card">
            <h2>Últimos movimientos</h2>

            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Teclado Mecánico</td>
                  <td className="entrada">Entrada</td>
                  <td>15</td>
                </tr>

                <tr>
                  <td>Mouse Inalámbrico</td>
                  <td className="salida">Salida</td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>Monitor 24"</td>
                  <td className="entrada">Entrada</td>
                  <td>8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Inicio;