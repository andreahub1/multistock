import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo-area">
        <img
          src={logo}
          alt="Logo MultiStock"
          className="sidebar-logo"
        />
        <h2>MultiStock</h2>
      </div>

      <nav className="sidebar-menu">
        <NavLink
          to="/inicio"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/productos"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Productos
        </NavLink>

        <NavLink
          to="/categorias"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Categorías
        </NavLink>

        <NavLink
          to="/movimientos"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Movimientos
        </NavLink>

        <NavLink
          to="/administracion"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Administración
        </NavLink>
      </nav>

      <NavLink to="/" className="logout-item">
        Cerrar sesión
      </NavLink>
    </aside>
  );
}

export default Sidebar;