import React, { useState } from "react";

function RegistroUsuarios() {
  const [usuario, setUsuario] = useState({ nombre: "", correo: "" });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Usuario registrado: " + usuario.nombre);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Usuarios</h2>
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
      <button type="submit">Registrar</button>
    </form>
  );
}

export default RegistroUsuarios;
