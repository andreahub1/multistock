import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  FiHome,
  FiBox,
  FiGrid,
  FiRepeat,
  FiCamera,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

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
          <FiHome className="menu-icon" />
          Inicio
        </NavLink>

        <NavLink
          to="/productos"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiBox className="menu-icon" />
          Productos
        </NavLink>

        <NavLink
          to="/categorias"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiGrid className="menu-icon" />
          Categorías
        </NavLink>

        <NavLink
          to="/movimientos"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiRepeat className="menu-icon" />
          Movimientos
        </NavLink>

        <NavLink
          to="/escaner"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiCamera className="menu-icon" />
          Escáner
        </NavLink>

        <NavLink
          to="/administracion"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiSettings className="menu-icon" />
          Administración
        </NavLink>
      </nav>

      <NavLink to="/" className="logout-item">
        <FiLogOut className="menu-icon" />
        Cerrar sesión
      </NavLink>
    </aside>
  );
}

export default Sidebar;