import React, { useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import CrearProducto from "./CrearProducto";
import GestionarProductos from "./GestionarProductos";
import Pedidos from "./Pedidos";
import Perfil from "./Perfil";
import "../css/ProductsDemo.css";

const AdminPanel = () => {
  const navigate = useNavigate();
  const toastRef = useRef<Toast>(null);

  return (
    <div className="admin-container">
      {/* Menú de navegación vertical */}
      <div className="vertical-menu">
        <h2 className="menu-title">Panel de Proveedor</h2>
        <ul className="menu-list">
          <li onClick={() => navigate("/admin/newProduct")}>Crear Producto</li>
          <li onClick={() => navigate("/admin/manageProducts")}>Gestionar Productos</li>
          <li onClick={() => navigate("/admin/orders")}>Pedidos</li>
          <li onClick={() => navigate("/admin/profile")}>Perfil</li>
          <li onClick={() => navigate("/login")}>Cerrar Sesión</li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="content">
        <Toast ref={toastRef} />
        <Routes>
          <Route path="newProduct" element={<CrearProducto />} />
          <Route path="manageProducts" element={<GestionarProductos />} />
          <Route path="orders" element={<Pedidos />} />
          <Route path="profile" element={<Perfil />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;