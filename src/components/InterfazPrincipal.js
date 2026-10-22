import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function InterfazPrincipal() {
  const [stats, setStats] = useState({ usuarios: 0, productos: 0, pedidos: 0 });

  useEffect(() => {
    const usr = JSON.parse(localStorage.getItem("usuarios")) || [];
    const prod = JSON.parse(localStorage.getItem("productos")) || [];
    const ped = JSON.parse(localStorage.getItem("pedidos")) || [];
    setStats({ usuarios: usr.length, productos: prod.length, pedidos: ped.length });
  }, []);

  return (
    <div className="card">
      <h2>Panel Principal</h2>
      <p>Bienvenido al Sistema Web de Gestión de Pedidos.</p>
      
      {/* Gráfica de barras simple */}
      <div style={{ textAlign: "left", margin: "20px 0", background: "#1a1a1a", padding: "15px", borderRadius: "10px" }}>
        <h4 style={{ color: "#00d4ff", marginTop: 0 }}>Resumen del Sistema (Datos en tiempo real):</h4>
        
        <div style={{ marginBottom: "10px" }}>
          <span style={{ fontSize: "14px" }}>Usuarios registrados: {stats.usuarios}</span>
          <div style={{ width: "100%", background: "#333", height: "10px", borderRadius: "5px", marginTop: "5px" }}>
            <div style={{ width: `${Math.min(stats.usuarios * 10, 100)}%`, background: "#00d4ff", height: "100%", borderRadius: "5px", transition: "0.5s" }}></div>
          </div>
        </div>
        
        <div style={{ marginBottom: "10px" }}>
          <span style={{ fontSize: "14px" }}>Productos en catálogo: {stats.productos}</span>
          <div style={{ width: "100%", background: "#333", height: "10px", borderRadius: "5px", marginTop: "5px" }}>
            <div style={{ width: `${Math.min(stats.productos * 5, 100)}%`, background: "#4caf50", height: "100%", borderRadius: "5px", transition: "0.5s" }}></div>
          </div>
        </div>
        
        <div style={{ marginBottom: "10px" }}>
          <span style={{ fontSize: "14px" }}>Pedidos en carrito: {stats.pedidos}</span>
          <div style={{ width: "100%", background: "#333", height: "10px", borderRadius: "5px", marginTop: "5px" }}>
            <div style={{ width: `${Math.min(stats.pedidos * 20, 100)}%`, background: "#ff9800", height: "100%", borderRadius: "5px", transition: "0.5s" }}></div>
          </div>
        </div>
      </div>

      <hr />
      <h3>Accesos Rápidos</h3>
      <div className="dashboard-grid">
        <Link to="/usuarios" className="stat-card">
          <h3>👥 Usuarios</h3>
          <p>Administración de usuarios registrados</p>
        </Link>
        <Link to="/productos" className="stat-card">
          <h3>📦 Productos</h3>
          <p>Control y gestión de productos</p>
        </Link>
        <Link to="/pedidos" className="stat-card">
          <h3>🛒 Pedidos</h3>
          <p>Registro y seguimiento de pedidos</p>
        </Link>
        <Link to="/inventario" className="stat-card">
          <h3>📊 Inventario</h3>
          <p>Consulta de existencias disponibles</p>
        </Link>
      </div>
    </div>
  );
}

export default InterfazPrincipal;