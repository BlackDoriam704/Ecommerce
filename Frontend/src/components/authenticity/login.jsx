import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css"; // Asegúrate de tener un archivo CSS para estilos

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch(
      "https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    // Convierte la respuesta a JSON
    const data = await response.json();

    // Imprime los datos recibidos del backend
    console.log("Datos recibidos del backend:", data);

    const { token, roleId, userId } = data;
console.log("Token:", token, "Role ID:", roleId, "User ID:", userId);
    // Guarda el token y la información del usuario en localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("roleId", roleId);

    // Redirigir según el rol del usuario
    if (roleId === 1) {
      navigate("/Panel");
    } else {
      navigate("/");
    }
  } catch (err) {
    setError(err.message);
    console.error("Error al iniciar sesión:", err);
  }
};

  return (
    <div className="login-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <h1>FashionHub</h1>
        </div>
      </nav>

      {/* Login Container */}
      <div className="login-container">
        <div className="left-section2">
          <h1>Bienvenido de nuevo</h1>
          <p>
            Inicia sesión para acceder a las mejores marcas de ropa y gestionar
            tus pedidos.
          </p>
          <p className="register">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="register-link">
              Regístrate aquí
            </a>
          </p>
          <img
            src="https://source.unsplash.com/400x400/?fashion,login"
            alt="Fashion Login"
            className="login-image"
          />
        </div>

        <div className="right-section">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="email"
              className="input"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;