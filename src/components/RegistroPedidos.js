import React, { useState, useEffect } from "react";

function RegistroPedidos() {
  const [pedido, setPedido] = useState({ producto: "", cantidad: 1 });
  const [pedidos, setPedidos] = useState(() => {
    const guardados = localStorage.getItem("pedidos");
    return guardados ? JSON.parse(guardados) : [];
  });
  const [inventario, setInventario] = useState([]);

  // Cargar inventario y pedidos al iniciar
  useEffect(() => {
    const inv = JSON.parse(localStorage.getItem("inventario")) || [];
    setInventario(inv);
  }, []);

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const registrarPedido = (e) => {
    e.preventDefault();
    
    if (!pedido.producto || pedido.cantidad <= 0) {
      alert("Por favor, selecciona un producto y una cantidad válida.");
      return;
    }

    // 1. Buscar el producto en el inventario
    const indexProducto = inventario.findIndex(
      (item) => item.nombre.toLowerCase() === pedido.producto.toLowerCase()
    );

    if (indexProducto === -1) {
      alert("⚠️ El producto seleccionado no existe en el catálogo.");
      return;
    }

    const stockActual = inventario[indexProducto].existencia;
    const cantidadSolicitada = parseInt(pedido.cantidad);

    // 2. Validar si hay suficiente stock (Aquí va la alerta profesional)
    if (stockActual < cantidadSolicitada) {
      alert(`⚠️ Stock Insuficiente\n\nLo sentimos, no es posible procesar el pedido. El producto "${pedido.producto}" solo cuenta con ${stockActual} unidades disponibles en almacén y usted ha solicitado ${cantidadSolicitada}. Por favor, ajuste la cantidad.`);
      return;
    }

    // 3. Restar del inventario
    const nuevoInventario = [...inventario];
    nuevoInventario[indexProducto].existencia -= cantidadSolicitada;
    setInventario(nuevoInventario);
    localStorage.setItem("inventario", JSON.stringify(nuevoInventario));

    // 4. Guardar el pedido en el historial
    const nuevoPedidoTexto = `${pedido.producto} (x${cantidadSolicitada})`;
    const nuevosPedidos = [...pedidos, nuevoPedidoTexto];
    setPedidos(nuevosPedidos);
    localStorage.setItem("pedidos", JSON.stringify(nuevosPedidos));

    // 5. Limpiar formulario
    setPedido({ producto: "", cantidad: 1 });
    alert(`✅ Pedido procesado con éxito. Se han descontado ${cantidadSolicitada} unidades de "${pedido.producto}" del inventario.`);
  };

  return (
    <div className="card">
      <h2>Registro de Pedidos</h2>
      <form onSubmit={registrarPedido}>
        <select 
          name="producto" 
          value={pedido.producto} 
          onChange={handleChange}
          style={{ padding: "12px", borderRadius: "8px", background: "#2a2a2a", color: "white", border: "none" }}
        >
          <option value="">Selecciona un producto del inventario</option>
          {inventario.map((item, index) => (
            <option key={index} value={item.nombre}>
              {item.nombre} (Stock: {item.existencia})
            </option>
          ))}
        </select>
        
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad a pedir"
          value={pedido.cantidad}
          onChange={handleChange}
          min="1"
        />
        
        <button type="submit">Procesar Pedido</button>
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