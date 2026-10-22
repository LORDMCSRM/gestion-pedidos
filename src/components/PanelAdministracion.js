import React, { useState, useEffect } from "react";

function PanelAdministracion() {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalPedidos, setTotalPedidos] = useState(0);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    setTotalUsuarios(usuarios.length);
    setTotalProductos(inventario.length);
    setTotalPedidos(pedidos.length);
  }, []);

  return (
    <div className="card">
      <h2>Panel de Administración</h2>
      <div className="dashboard-card">
        <h3>Resumen General (Datos Reales)</h3>
        <p>Total usuarios registrados: <strong>{totalUsuarios}</strong></p>
        <p>Productos en catálogo: <strong>{totalProductos}</strong></p>
        <p>Pedidos activos en carrito: <strong>{totalPedidos}</strong></p>
      </div>
      <hr />
      <div className="dashboard-card">
        <h3>Estado del Sistema</h3>
        <p>✅ Sistema funcionando correctamente y conectado a la base de datos local.</p>
      </div>
    </div>
  );
}

export default PanelAdministracion;