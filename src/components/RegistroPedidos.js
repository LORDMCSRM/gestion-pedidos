import React, { useState, useEffect } from "react";

function RegistroPedidos() {
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

    // Restar del inventario
    const nuevoInventario = [...inventario];
    nuevoInventario[indexProducto].existencia -= cantidadSolicitada;
    setInventario(nuevoInventario);
    localStorage.setItem("inventario", JSON.stringify(nuevoInventario));

    // Agregar al historial de pedidos (agrupando si es el mismo usuario y producto)
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

    setPedido({ usuario: pedido.usuario, producto: "", cantidad: 1 });
    alert(`✅ Pedido agregado al carrito de ${pedido.usuario}.`);
  };

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

  // Calcular el total del carrito
  const calcularTotal = () => {
    let total = 0;
    const productosRegistrados = JSON.parse(localStorage.getItem("productos")) || [];
    
    pedidos.forEach(p => {
      const prodInfo = productosRegistrados.find(pr => pr.nombre === p.producto);
      const precio = prodInfo ? prodInfo.precio : 0;
      total += precio * p.cantidad;
    });
    return total;
  };

  const vaciarCarrito = () => {
    if (window.confirm("¿Estás seguro de que deseas vaciar todo el carrito? El stock volverá al inventario.")) {
      const nuevoInventario = [...inventario];
      pedidos.forEach(p => {
        const idx = nuevoInventario.findIndex(i => i.nombre === p.producto);
        if (idx !== -1) nuevoInventario[idx].existencia += p.cantidad;
      });
      setInventario(nuevoInventario);
      localStorage.setItem("inventario", JSON.stringify(nuevoInventario));
      setPedidos([]);
    }
  };

  const confirmarCompra = () => {
    alert(`🎉 ¡Compra confirmada!\n\nTotal pagado: $${calcularTotal()}\n\nLos pedidos han sido procesados con éxito.`);
    setPedidos([]); // Vaciamos el carrito
  };

  return (
    <div className="card">
      <h2>Registro de Pedidos</h2>
      
      {usuarios.length === 0 && (
        <p style={{ color: "#ff4d4d", fontWeight: "bold" }}>
          ⚠️ Debes registrar al menos un usuario antes de crear pedidos.
        </p>
      )}

      <form onSubmit={registrarPedido}>
        <select name="usuario" value={pedido.usuario} onChange={handleChange} className="input-estilo" disabled={usuarios.length === 0}>
          <option value="">Selecciona el cliente / usuario</option>
          {usuarios.map((u, index) => (
            <option key={index} value={u.nombre}>{u.nombre}</option>
          ))}
        </select>

        <select name="producto" value={pedido.producto} onChange={handleChange} className="input-estilo">
          <option value="">Selecciona un producto</option>
          {inventario.map((item, index) => (
            <option key={index} value={item.nombre}>
              {item.nombre} (Stock: {item.existencia})
            </option>
          ))}
        </select>
        
        <input type="number" name="cantidad" placeholder="Cantidad" value={pedido.cantidad} onChange={handleChange} min="1" />
        
        <button type="submit" disabled={usuarios.length === 0}>Agregar Pedido al Carrito</button>
      </form>

      <h3>Carrito / Lista de Pedidos Actual</h3>
      {pedidos.length === 0 ? (
        <p>No hay pedidos en el carrito.</p>
      ) : (
        <ul className="lista-pedidos">
          {pedidos.map((p, index) => (
            <li key={index} className="pedido-item">
              <span>
                <strong style={{ color: "#00d4ff" }}>{p.usuario}</strong> pidió: {p.producto} (x{p.cantidad})
              </span>
              <div className="acciones-pedido">
                <button className="btn-ajustar" onClick={() => restarUnidad(index, p.producto)} title="Quitar 1 unidad">-</button>
                <button className="btn-eliminar" onClick={() => eliminarPedido(index, p.producto)} title="Eliminar pedido">🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {pedidos.length > 0 && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#1a1a1a", borderRadius: "10px", border: "1px solid #00d4ff" }}>
          <h3 style={{ color: "#00d4ff", marginTop: 0, textAlign: "center" }}>
            Total a Pagar: ${calcularTotal()}
          </h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{ background: "#4caf50", flex: 1 }} onClick={confirmarCompra}>
              ✅ Confirmar Compra
            </button>
            <button style={{ background: "#ff4d4d", flex: 1 }} onClick={vaciarCarrito}>
              🗑️ Vaciar Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistroPedidos;