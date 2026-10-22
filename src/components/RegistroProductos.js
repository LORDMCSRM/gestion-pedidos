import React, { useState } from "react";

function RegistroProductos() {
  const catalogoFijo = [
    { nombre: "Laptop HP", precio: 15000 },
    { nombre: "Mouse Inalámbrico", precio: 350 },
    { nombre: "Teclado Mecánico", precio: 800 },
    { nombre: "Monitor 24 pulgadas", precio: 3500 },
    { nombre: "Impresora Multifuncional", precio: 4200 },
    { nombre: "Memoria USB 64GB", precio: 250 },
    { nombre: "Disco Duro Externo", precio: 1800 },
    { nombre: "Cable HDMI", precio: 150 },
  ];

  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [precioAutomatico, setPrecioAutomatico] = useState("");
  const [cantidad, setCantidad] = useState("");
  
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("productos");
    return guardados ? JSON.parse(guardados) : [];
  });

  const handleProductoChange = (e) => {
    const nombreSeleccionado = e.target.value;
    setProductoSeleccionado(nombreSeleccionado);

    const productoEncontrado = catalogoFijo.find(p => p.nombre === nombreSeleccionado);
    if (productoEncontrado) {
      setPrecioAutomatico(productoEncontrado.precio);
    } else {
      setPrecioAutomatico("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productoSeleccionado || !precioAutomatico || !cantidad) {
      alert("Por favor, selecciona un producto y una cantidad válida.");
      return;
    }
    if (cantidad <= 0) {
      alert("La cantidad debe ser mayor a 0.");
      return;
    }

    const nuevoProducto = {
      nombre: productoSeleccionado,
      precio: precioAutomatico,
      cantidad: parseInt(cantidad)
    };

    // 1. Guardar en la lista de productos registrados
    const nuevosProductos = [...productos, nuevoProducto];
    setProductos(nuevosProductos);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));

    // 2. Sincronizar con el Inventario (AQUÍ ESTÁ EL CAMBIO)
    const inventarioActual = JSON.parse(localStorage.getItem("inventario")) || [];
    const productoExistenteIndex = inventarioActual.findIndex(p => p.nombre === productoSeleccionado);

    if (productoExistenteIndex !== -1) {
      // Si ya existe, ESTABLECEMOS la nueva cantidad exacta (reemplazamos, no sumamos)
      inventarioActual[productoExistenteIndex].existencia = parseInt(cantidad);
    } else {
      // Si es nuevo, lo agregamos con su cantidad inicial
      inventarioActual.push({ nombre: productoSeleccionado, existencia: parseInt(cantidad) });
    }
    localStorage.setItem("inventario", JSON.stringify(inventarioActual));

    // Limpiar formulario
    setProductoSeleccionado("");
    setPrecioAutomatico("");
    setCantidad("");
    alert("¡Stock establecido y guardado en el inventario correctamente!");
  };

  return (
    <div className="card">
      <h2>Registro de Productos</h2>
      <form onSubmit={handleSubmit}>
        <select 
          value={productoSeleccionado} 
          onChange={handleProductoChange}
          className="input-estilo"
        >
          <option value="">Selecciona un producto del catálogo</option>
          {catalogoFijo.map((prod, index) => (
            <option key={index} value={prod.nombre}>{prod.nombre}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Precio automático"
          value={precioAutomatico ? `$${precioAutomatico}` : ""}
          readOnly
          style={{ backgroundColor: "#1a1a1a", color: "#00d4ff", cursor: "not-allowed" }}
        />

        <input
          type="number"
          placeholder="Cantidad exacta en stock"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          min="1"
        />
        
        <button type="submit">Establecer en Inventario</button>
      </form>

      <h3>Historial de Altas de Productos</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad Fijada</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p, index) => (
            <tr key={index}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistroProductos;