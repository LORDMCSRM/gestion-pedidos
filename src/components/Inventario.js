import React from "react";

function Inventario() {
  const inventario = [
    {
      nombre: "Laptop",
      existencia: 10,
    },
    {
      nombre: "Mouse",
      existencia: 25,
    },
    {
      nombre: "Teclado",
      existencia: 15,
    },
  ];

  return (
    <div>
      <h2>Inventario Disponible</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Existencia</th>
          </tr>
        </thead>

        <tbody>
          {inventario.map((item, index) => (
            <tr key={index}>
              <td>{item.nombre}</td>
              <td>{item.existencia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventario;