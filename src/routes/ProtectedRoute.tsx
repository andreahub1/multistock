import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/" />;
  }

  // Admin puede acceder a todo
  if (usuario.rol === "Administrador") {
    return children;
  }

  // Empleado con restricción de rutas
  if (role && usuario.rol !== role) {
    return <Navigate to="/inicio" />;
  }

  return children;
}

export default ProtectedRoute;