import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-area">
          <img src={logo} alt="Logo MultiStock" className="logo" />
          <h1>MultiStock</h1>
        </div>

        <p className="subtitle">Sistema de control de inventario</p>

        <form className="login-form">
          <input type="text" placeholder="Usuario" />
          <input type="password" placeholder="Contraseña" />

          <button type="button" onClick={() => navigate("/inicio")}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;