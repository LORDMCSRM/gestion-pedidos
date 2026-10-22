import React from "react";

function PanelAdministracion() {
  return (
    <div className="card">
      <h2>Panel de Administración</h2>
      <div className="dashboard-card">
        <h3>Resumen General</h3>
        <p>Total usuarios: 5</p>
        <p>Total productos: 10</p>
        <p>Total pedidos: 7</p>
      </div>
      <hr />
      <div className="dashboard-card">
        <h3>Estado del Sistema</h3>
        <p>✅ Sistema funcionando correctamente.</p>
      </div>
    </div>
  );
}

export default PanelAdministracion;