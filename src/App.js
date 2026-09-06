import React from "react";
import RegistroUsuarios from "./components/RegistroUsuarios";
import RegistroProductos from "./components/RegistroProductos";
import InterfazPrincipal from "./components/InterfazPrincipal";

function App() {
  return (
    <div>
      <h1>Sistema de Gestión de Pedidos</h1>
      <InterfazPrincipal />
      <RegistroUsuarios />
      <RegistroProductos />
    </div>
  );
}

export default App;
