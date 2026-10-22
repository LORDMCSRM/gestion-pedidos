import React, { useState, useEffect } from "react";

function Inventario() {
  const [inventario, setInventario] = useState([]);

  // Cargamos el inventario desde localStorage
  useEffect(() => {
    const guardados = localStorage.getItem("inventario");
    if (guardados) {
      setInventario(JSON.parse(guardados));
    } else {
      // Inventario inicial por defecto si no hay nada guardado
      const inicial = [
        { nombre: "Laptop HP", existencia: 15 },
        { nombre: "Mouse Inalámbrico", existencia: 40 },
        { nombre: "Teclado Mecánico", existencia: 25 },
        { nombre: "Monitor 24 pulgadas", existencia: 10 },
        { nombre: "Impresora Multifuncional", existencia: 5 },
        { nombre: "Memoria USB 64GB", existencia: 50 },
        { nombre: "Disco Duro Externo", existencia: 8 },
        { nombre: "Cable HDMI", existencia: 30 },
      ];
      setInventario(inicial);
      localStorage.setItem("inventario", JSON.stringify(inicial));
    }
  }, []);

  return (
    <div className="card">
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
              <td style={{ color: item.existencia === 0 ? "#ff4d4d" : "white", fontWeight: "bold" }}>
                {item.existencia === 0 ? "AGOTADO" : item.existencia}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventario;