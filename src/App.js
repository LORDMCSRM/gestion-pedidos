import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import InterfazPrincipal from "./components/InterfazPrincipal";
import RegistroUsuarios from "./components/RegistroUsuarios";
import RegistroProductos from "./components/RegistroProductos";
import RegistroPedidos from "./components/RegistroPedidos";
import Inventario from "./components/Inventario";
import PanelAdministracion from "./components/PanelAdministracion";

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <h1>Sistema de Gestión de Pedidos</h1>

        <nav>
          <Link to="/">Inicio</Link> |{" "}
          <Link to="/usuarios">Usuarios</Link> |{" "}
          <Link to="/productos">Productos</Link> |{" "}
          <Link to="/pedidos">Pedidos</Link> |{" "}
          <Link to="/inventario">Inventario</Link> |{" "}
          <Link to="/admin">Administración</Link>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<InterfazPrincipal />} />
          <Route path="/usuarios" element={<RegistroUsuarios />} />
          <Route path="/productos" element={<RegistroProductos />} />
          <Route path="/pedidos" element={<RegistroPedidos />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/admin" element={<PanelAdministracion />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;