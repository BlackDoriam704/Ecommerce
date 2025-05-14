import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/menuVertical.css"; // Archivo CSS para estilos

const VerticalMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="vertical-menu">
      <h2 className="menu-title">Panel de Proveedor</h2>
      <ul className="menu-list">
        <li onClick={() => navigate("/newProduct")}>Crear Producto</li>
        <li onClick={() => navigate("/manageProducts")}>Gestionar Productos</li>
        <li onClick={() => navigate("/orders")}>Pedidos</li>
        <li onClick={() => navigate("/profile")}>Perfil</li>
        <li onClick={() => navigate("/logout")}>Cerrar Sesión</li>
      </ul>
    </div>
  );
};

export default VerticalMenu;