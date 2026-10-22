import React, { useState, useEffect } from "react";

function RegistroPedidos() {
  const [pedido, setPedido] = useState({ producto: "", cantidad: 1 });
  
  // Los pedidos ahora se guardan como objetos: { producto: "Mouse", cantidad: 2 }
  const [pedidos, setPedidos] = useState(() => {
    const guardados = localStorage.getItem("pedidos");
    return guardados ? JSON.parse(guardados) : [];
  });
  
  const [inventario, setInventario] = useState([]);

  // Cargar inventario al iniciar
  useEffect(() => {
    const inv = JSON.parse(localStorage.getItem("inventario")) || [];
    setInventario(inv);
  }, []);

  // Guardar pedidos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const registrarPedido = (e) => {
    e.preventDefault();
    
    if (!pedido.producto || pedido.cantidad <= 0) {
      alert("Por favor, selecciona un producto y una cantidad válida.");
      return;
    }

    const indexProducto = inventario.findIndex(
      (item) => item.nombre.toLowerCase() === pedido.producto.toLowerCase()
    );

    if (indexProducto === -1) {
      alert("⚠️ El producto seleccionado no existe en el catálogo.");
      return;
    }

    const stockActual = inventario[indexProducto].existencia;
    const cantidadSolicitada = parseInt(pedido.cantidad);

    if (stockActual < cantidadSolicitada) {
      alert(`⚠️ Stock Insuficiente\n\nLo sentimos, no es posible procesar el pedido. El producto "${pedido.producto}" solo cuenta con ${stockActual} unidades disponibles y has solicitado ${cantidadSolicitada}.`);
      return;
    }

    // 1. Restar del inventario
    const nuevoInventario = [...inventario];
    nuevoInventario[indexProducto].existencia -= cantidadSolicitada;
    setInventario(nuevoInventario);
    localStorage.setItem("inventario", JSON.stringify(nuevoInventario));

    // 2. Verificar si el producto ya está en la lista de pedidos actual
    const existeEnPedidos = pedidos.findIndex(p => p.producto === pedido.producto);
    
    if (existeEnPedidos !== -1) {
      // Si ya existe, le sumamos la cantidad
      const nuevosPedidos = [...pedidos];
      nuevosPedidos[existeEnPedidos].cantidad += cantidadSolicitada;
      setPedidos(nuevosPedidos);
    } else {
      // Si es nuevo, lo agregamos a la lista
      setPedidos([...pedidos, { producto: pedido.producto, cantidad: cantidadSolicitada }]);
    }

    setPedido({ producto: "", cantidad: 1 });
    alert(`✅ Pedido procesado con éxito. Se han descontado ${cantidadSolicitada} unidades del inventario.`);
  };

  // --- FUNCIONES DE CONTROL (Ajustar y Eliminar) ---

  // Devolver 1 unidad al inventario
  const restarUnidad = (indexPedido, nombreProducto) => {
    const nuevosPedidos = [...pedidos];
    const pedidoActual = nuevosPedidos[indexPedido];

    if (pedidoActual.cantidad > 1) {
      pedidoActual.cantidad -= 1;
      setPedidos(nuevosPedidos);
    } else {
      // Si la cantidad llega a 1 y se resta, se elimina el pedido
      eliminarPedido(indexPedido, nombreProducto);
      return;
    }

    // Devolver al inventario
    const indexInv = inventario.findIndex(p => p.nombre === nombreProducto);
    if (indexInv !== -1) {
      const nuevoInventario = [...inventario];
      nuevoInventario[indexInv].existencia += 1;
      setInventario(nuevoInventario);
      localStorage.setItem("inventario", JSON.stringify(nuevoInventario));
    }
  };

  // Eliminar pedido por completo y devolver todo al inventario
  const eliminarPedido = (indexPedido, nombreProducto) => {
    if (window.confirm(`¿Estás seguro de que deseas cancelar el pedido de "${nombreProducto}"? Las unidades volverán al inventario.`)) {
      const pedidoAEliminar = pedidos[indexPedido];

      // Devolver todas las unidades al inventario
      const indexInv = inventario.findIndex(p => p.nombre === nombreProducto);
      if (indexInv !== -1) {
        const nuevoInventario = [...inventario];
        nuevoInventario[indexInv].existencia += pedidoAEliminar.cantidad;
        setInventario(nuevoInventario);
        localStorage.setItem("inventario", JSON.stringify(nuevoInventario));
      }

      // Eliminar de la lista de pedidos
      const nuevosPedidos = pedidos.filter((_, index) => index !== indexPedido);
      setPedidos(nuevosPedidos);
    }
  };

  return (
    <div className="card">
      <h2>Registro de Pedidos</h2>
      <form onSubmit={registrarPedido}>
        <select 
          name="producto" 
          value={pedido.producto} 
          onChange={handleChange}
          className="input-estilo"
        >
          <option value="">Selecciona un producto</option>
          {inventario.map((item, index) => (
            <option key={index} value={item.nombre}>
              {item.nombre} (Stock: {item.existencia})
            </option>
          ))}
        </select>
        
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={pedido.cantidad}
          onChange={handleChange}
          min="1"
        />
        
        <button type="submit">Agregar Pedido</button>
      </form>

      <h3>Carrito / Lista de Pedidos Actual</h3>
      {pedidos.length === 0 ? (
        <p>No hay pedidos en la lista.</p>
      ) : (
        <ul className="lista-pedidos">
          {pedidos.map((p, index) => (
            <li key={index} className="pedido-item">
              <span><strong>{p.producto}</strong> - Cantidad: {p.cantidad}</span>
              
              <div className="acciones-pedido">
                <button 
                  className="btn-ajustar" 
                  onClick={() => restarUnidad(index, p.producto)}
                  title="Quitar 1 unidad"
                >
                  -
                </button>
                <button 
                  className="btn-eliminar" 
                  onClick={() => eliminarPedido(index, p.producto)}
                  title="Eliminar pedido y devolver stock"
                >
                  🗑️ Cancelar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RegistroPedidos;