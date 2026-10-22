import React from "react";
import { Link } from "react-router-dom"; // Importamos Link para la navegación

function InterfazPrincipal() {
  return (
    <div className="card">
      <h2>Panel Principal</h2>
      <p>Bienvenido al Sistema Web de Gestión de Pedidos.</p>
      <div className="dashboard-grid">
        
        {/* Tarjeta de Usuarios */}
        <Link to="/usuarios" className="stat-card">
          <h3>👥 Usuarios</h3>
          <p>Administración de usuarios registrados</p>
        </Link>

        {/* Tarjeta de Productos */}
        <Link to="/productos" className="stat-card">
          <h3>📦 Productos</h3>
          <p>Control y gestión de productos</p>
        </Link>

        {/* Tarjeta de Pedidos */}
        <Link to="/pedidos" className="stat-card">
          <h3>🛒 Pedidos</h3>
          <p>Registro y seguimiento de pedidos</p>
        </Link>

        {/* Tarjeta de Inventario */}
        <Link to="/inventario" className="stat-card">
          <h3>📊 Inventario</h3>
          <p>Consulta de existencias disponibles</p>
        </Link>

      </div>
    </div>
  );
}

export default InterfazPrincipal;