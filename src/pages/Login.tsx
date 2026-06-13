import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const iniciarSesion = async () => {
    // =========================
    // VALIDACIÓN BÁSICA
    // =========================
    if (!usuario || !password) {
      setMensaje("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      setMensaje("");

      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      // =========================
      // GUARDAR USUARIO REAL
      // =========================
      localStorage.setItem("usuario", JSON.stringify(data));

      // =========================
      // REDIRECCIÓN POR ROL
      // =========================
      if (data.rol === "Administrador") {
        navigate("/inicio"); // dashboard admin
      } else {
        navigate("/inicio"); // empleado (puedes cambiar luego)
      }

    } catch (error) {
      setMensaje("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-area">
          <img src={logo} alt="Logo MultiStock" className="logo" />
          <h1>MultiStock</h1>
        </div>

        <p className="subtitle">Sistema de control de inventario</p>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={iniciarSesion} disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>

          <p
            style={{
              color: "#2563eb",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={() =>
              alert(
                "Comuníquese con el administrador para recuperar su contraseña."
              )
            }
          >
            ¿Olvidaste tu contraseña?
          </p>

          {mensaje && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {mensaje}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;