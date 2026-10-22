import React, { useState, useEffect } from "react";

function RegistroUsuarios() {
  // 1. Inicializamos el estado leyendo el localStorage
  const [usuario, setUsuario] = useState({ nombre: "", correo: "" });
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem("usuarios");
    return guardados ? JSON.parse(guardados) : [];
  });

  // 2. Guardamos en localStorage cada vez que la lista de usuarios cambie
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario.nombre || !usuario.correo) {
      alert("Completa todos los campos");
      return;
    }
    setUsuarios([...usuarios, usuario]);
    setUsuario({ nombre: "", correo: "" });
  };

  return (
    <div className="card">
      <h2>Registro de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={usuario.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={usuario.correo}
          onChange={handleChange}
        />
        <button type="submit">Registrar Usuario</button>
      </form>
      <h3>Usuarios Registrados</h3>
      <ul>
        {usuarios.map((u, index) => (
          <li key={index}>
            {u.nombre} - {u.correo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegistroUsuarios;