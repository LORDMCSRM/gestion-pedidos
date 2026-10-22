import React, { useState } from "react";

function RegistroProductos() {
  const [producto, setProducto] = useState({ nombre: "", precio: "", cantidad: "" });
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("productos");
    return guardados ? JSON.parse(guardados) : [];
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!producto.nombre || !producto.precio || !producto.cantidad) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    if (producto.precio <= 0 || producto.cantidad <= 0) {
      alert("El precio y la cantidad deben ser mayores a 0.");
      return;
    }

    // 1. Guardar el producto en la lista de productos
    const nuevosProductos = [...productos, producto];
    setProductos(nuevosProductos);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));

    // 2. Sincronizar con el Inventario
    const inventarioActual = JSON.parse(localStorage.getItem("inventario")) || [];
    const productoExistente = inventarioActual.find(p => p.nombre.toLowerCase() === producto.nombre.toLowerCase());

    if (productoExistente) {
      // Si ya existe, sumamos la cantidad
      productoExistente.existencia += parseInt(producto.cantidad);
    } else {
      // Si es nuevo, lo agregamos al inventario
      inventarioActual.push({ nombre: producto.nombre, existencia: parseInt(producto.cantidad) });
    }
    localStorage.setItem("inventario", JSON.stringify(inventarioActual));

    // Limpiar formulario
    setProducto({ nombre: "", precio: "", cantidad: "" });
    alert("¡Producto registrado y añadido al inventario con éxito!");
  };

  return (
    <div className="card">
      <h2>Registro de Productos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={producto.nombre}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio ($)"
          value={producto.precio}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad a Ordenar (Stock)"
          value={producto.cantidad}
          onChange={handleChange}
        />
        <button type="submit">Registrar Producto</button>
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