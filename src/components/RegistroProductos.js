import React, { useState } from "react";

function RegistroProductos() {

  const [producto, setProducto] = useState({
    nombre: "",
    precio: ""
  });

  const [productos, setProductos] = useState([]);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!producto.nombre || !producto.precio) {
      alert("Completa todos los campos");
      return;
    }

    setProductos([...productos, producto]);

    setProducto({
      nombre: "",
      precio: ""
    });
  };

  return (
    <div>

      <h2>Registro de Productos</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={producto.nombre}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Registrar Producto
        </button>

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