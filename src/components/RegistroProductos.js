import React, { useState } from "react";

function RegistroProductos() {
  const [producto, setProducto] = useState({ nombre: "", precio: "" });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Producto registrado: " + producto.nombre);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Productos</h2>
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
      <button type="submit">Registrar</button>
    </form>
  );
}

export default RegistroProductos;
