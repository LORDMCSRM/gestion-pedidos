import React from "react";

function InterfazPrincipal() {
  return (
    <div className="card">
      <h2>Panel Principal</h2>

      <p>
        Bienvenido al Sistema Web de Gestión de Pedidos.
      </p>

      <div className="dashboard-grid">

        <div className="stat-card">
          <h3>👤 Usuarios</h3>
          <p>Administración de usuarios registrados</p>
        </div>

        <div className="stat-card">
          <h3>📦 Productos</h3>
          <p>Control y gestión de productos</p>
        </div>

        <div className="stat-card">
          <h3>🛒 Pedidos</h3>
          <p>Registro y seguimiento de pedidos</p>
        </div>

        <div className="stat-card">
          <h3>📊 Inventario</h3>
          <p>Consulta de existencias disponibles</p>
        </div>

      </div>
    </div>
  );
}

export default InterfazPrincipal;