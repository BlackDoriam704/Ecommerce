import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';
        const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <h1>FashionHub</h1>
      </div>
      <ul className="navbar-links">
        <li onClick={() => navigate("/")}>Inicio</li>
        <li onClick={() => navigate("/products")}>Productos</li>
        <li onClick={() => navigate("/contact")}>Contacto</li>
      </ul>
      <div className="navbar-actions">
        <ul className="navbar-links">
          <li onClick={() => navigate("/cart")} icon="pi pi-shopping-cart">Carrito</li>
          <li onClick={() => navigate("/login")}>Iniciar Sesión</li>
          <li className="p-button-secondary" onClick={() => navigate("/register")}
          >
            Registrarse
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
