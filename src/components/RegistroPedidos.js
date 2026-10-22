import React, { useState, useEffect } from "react";

function RegistroPedidos() {
  // Ahora el pedido incluye al usuario
  const [pedido, setPedido] = useState({ usuario: "", producto: "", cantidad: 1 });
  const [pedidos, setPedidos] = useState(() => {
    const guardados = localStorage.getItem("pedidos");
    return guardados ? JSON.parse(guardados) : [];
  });
  const [inventario, setInventario] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Cargar inventario y usuarios al iniciar
  useEffect(() => {
    const inv = JSON.parse(localStorage.getItem("inventario")) || [];
    const usr = JSON.parse(localStorage.getItem("usuarios")) || [];
    setInventario(inv);
    setUsuarios(usr);
  }, []);

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const registrarPedido = (e) => {
    e.preventDefault();
    
    if (!pedido.usuario || !pedido.producto || pedido.cantidad <= 0) {
      alert("Por favor, selecciona un usuario, un producto y una cantidad válida.");
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

    // 2. Agregar al historial de pedidos
    // Verificamos si este mismo usuario ya pidió este mismo producto para agruparlo
    const existeEnPedidos = pedidos.findIndex(
      p => p.usuario === pedido.usuario && p.producto === pedido.producto
    );
    
    if (existeEnPedidos !== -1) {
      const nuevosPedidos = [...pedidos];
      nuevosPedidos[existeEnPedidos].cantidad += cantidadSolicitada;
      setPedidos(nuevosPedidos);
    } else {
      setPedidos([...pedidos, { 
        usuario: pedido.usuario, 
        producto: pedido.producto, 
        cantidad: cantidadSolicitada 
      }]);
    }

    setPedido({ usuario: pedido.usuario, producto: "", cantidad: 1 }); // Mantenemos el usuario seleccionado por comodidad
    alert(`✅ Pedido procesado para ${pedido.usuario}. Se descontaron ${cantidadSolicitada} unidades de "${pedido.producto}".`);
  };

  // --- FUNCIONES DE CONTROL (Ajustar y Eliminar) ---
  const restarUnidad = (indexPedido, nombreProducto) => {
    const nuevosPedidos = [...pedidos];
    const pedidoActual = nuevosPedidos[indexPedido];

    if (pedidoActual.cantidad > 1) {
      pedidoActual.cantidad -= 1;
      setPedidos(nuevosPedidos);
    } else {
      eliminarPedido(indexPedido, nombreProducto);
      return;
    }

    const indexInv = inventario.findIndex(p => p.nombre === nombreProducto);
    if (indexInv !== -1) {
      const nuevoInventario = [...inventario];
      nuevoInventario[indexInv].existencia += 1;
      setInventario(nuevoInventario);
      localStorage.setItem("inventario", JSON.stringify(nuevoInventario));
    }
  };

  const eliminarPedido = (indexPedido, nombreProducto) => {
    if (window.confirm(`¿Estás seguro de que deseas cancelar el pedido de "${nombreProducto}"? Las unidades volverán al inventario.`)) {
      const pedidoAEliminar = pedidos[indexPedido];

      const indexInv = inventario.findIndex(p => p.nombre === nombreProducto);
      if (indexInv !== -1) {
        const nuevoInventario = [...inventario];
        nuevoInventario[indexInv].existencia += pedidoAEliminar.cantidad;
        setInventario(nuevoInventario);
        localStorage.setItem("inventario", JSON.stringify(nuevoInventario));
      }

      const nuevosPedidos = pedidos.filter((_, index) => index !== indexPedido);
      setPedidos(nuevosPedidos);
    }
  };

  return (
    <div className="card">
      <h2>Registro de Pedidos</h2>
      
      {/* Si no hay usuarios, mostramos advertencia */}
      {usuarios.length === 0 && (
        <p style={{ color: "#ff4d4d", fontWeight: "bold" }}>
          ⚠️ Debes registrar al menos un usuario antes de crear pedidos.
        </p>
      )}

      <form onSubmit={registrarPedido}>
        {/* Selector de Usuario */}
        <select 
          name="usuario" 
          value={pedido.usuario} 
          onChange={handleChange}
          className="input-estilo"
          disabled={usuarios.length === 0}
        >
          <option value="">Selecciona el cliente / usuario</option>
          {usuarios.map((u, index) => (
            <option key={index} value={u.nombre}>{u.nombre}</option>
          ))}
        </select>

        {/* Selector de Producto */}
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
        
        <button type="submit" disabled={usuarios.length === 0}>Agregar Pedido</button>
      </form>

      <h3>Carrito / Lista de Pedidos Actual</h3>
      {pedidos.length === 0 ? (
        <p>No hay pedidos en la lista.</p>
      ) : (
        <ul className="lista-pedidos">
          {pedidos.map((p, index) => (
            <li key={index} className="pedido-item">
              {/* Mostramos el usuario asignado al pedido */}
              <span>
                <strong style={{ color: "#00d4ff" }}>{p.usuario}</strong> pidió: {p.producto} (x{p.cantidad})
              </span>
              
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