import React, { useState } from "react";

function RegistroPedidos() {
  const [pedido, setPedido] = useState("");
  const [pedidos, setPedidos] = useState([]);

  const registrarPedido = (e) => {
    e.preventDefault();

    if (pedido.trim() === "") {
      alert("Ingresa un pedido");
      return;
    }

    setPedidos([...pedidos, pedido]);
    setPedido("");
  };

  return (
    <div>
      <h2>Registro de Pedidos</h2>

      <form onSubmit={registrarPedido}>
        <input
          type="text"
          placeholder="Nombre del pedido"
          value={pedido}
          onChange={(e) => setPedido(e.target.value)}
        />

        <button type="submit">
          Registrar
        </button>
      </form>

      <h3>Historial de Pedidos</h3>

      <ul>
        {pedidos.map((p, index) => (
          <li key={index}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default RegistroPedidos;