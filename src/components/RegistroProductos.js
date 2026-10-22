import React, { useState } from "react";

function RegistroProductos() {
  // Catálogo fijo de productos y precios (aquí puedes agregar más)
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

  // Cuando el usuario cambia el producto en el select
  const handleProductoChange = (e) => {
    const nombreSeleccionado = e.target.value;
    setProductoSeleccionado(nombreSeleccionado);

    // Buscamos el producto en el catálogo para sacar su precio automático
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

    // 1. Guardar en la lista de productos (historial de entradas)
    const nuevosProductos = [...productos, nuevoProducto];
    setProductos(nuevosProductos);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));

    // 2. Sincronizar con el Inventario
    const inventarioActual = JSON.parse(localStorage.getItem("inventario")) || [];
    const productoExistenteIndex = inventarioActual.findIndex(p => p.nombre === productoSeleccionado);

    if (productoExistenteIndex !== -1) {
      // Si ya existe, sumamos la cantidad
      inventarioActual[productoExistenteIndex].existencia += parseInt(cantidad);
    } else {
      // Si no existe, lo agregamos
      inventarioActual.push({ nombre: productoSeleccionado, existencia: parseInt(cantidad) });
    }
    localStorage.setItem("inventario", JSON.stringify(inventarioActual));

    // Limpiar formulario
    setProductoSeleccionado("");
    setPrecioAutomatico("");
    setCantidad("");
    alert("¡Producto añadido al inventario con éxito!");
  };

  return (
    <div className="card">
      <h2>Registro de Productos</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Selector de Producto */}
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

        {/* Precio (Bloqueado / Solo lectura) */}
        <input
          type="text"
          placeholder="Precio automático"
          value={precioAutomatico ? `$${precioAutomatico}` : ""}
          readOnly // Esto evita que el usuario lo modifique
          style={{ backgroundColor: "#1a1a1a", color: "#00d4ff", cursor: "not-allowed" }}
        />

        {/* Cantidad a Ordenar */}
        <input
          type="number"
          placeholder="Cantidad a añadir al stock"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          min="1"
        />
        
        <button type="submit">Registrar en Inventario</button>
      </form>

      <h3>Productos Registrados</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p, index) => (
            <tr key={index}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistroProductos;