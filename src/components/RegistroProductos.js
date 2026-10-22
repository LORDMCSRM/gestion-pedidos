import React, { useState, useEffect } from "react";

function RegistroProductos() {
  const [producto, setProducto] = useState({ nombre: "", precio: "" });
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("productos");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación extra: que el precio sea mayor a 0
    if (!producto.nombre || !producto.precio || producto.precio <= 0) {
      alert("Completa todos los campos y asegúrate de que el precio sea mayor a 0");
      return;
    }
    setProductos([...productos, producto]);
    setProducto({ nombre: "", precio: "" });
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
          placeholder="Precio"
          value={producto.precio}
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