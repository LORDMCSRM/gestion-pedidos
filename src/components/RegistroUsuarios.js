import React, { useState, useEffect } from "react";

function RegistroUsuarios() {
  const [usuario, setUsuario] = useState({ nombre: "", correo: "" });
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem("usuarios");
    return guardados ? JSON.parse(guardados) : [];
  });

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
    
    // Validar que el correo no esté duplicado
    const existe = usuarios.find(u => u.correo.toLowerCase() === usuario.correo.toLowerCase());
    if (existe) {
      alert("⚠️ Este correo ya está registrado.");
      return;
    }

    setUsuarios([...usuarios, usuario]);
    setUsuario({ nombre: "", correo: "" });
  };

  // Función para eliminar un usuario
  const eliminarUsuario = (index) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${usuarios[index].nombre}"?`)) {
      const nuevosUsuarios = usuarios.filter((_, i) => i !== index);
      setUsuarios(nuevosUsuarios);
    }
  };

  return (
    <div className="card">
      <h2>Registro de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={usuario.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={usuario.correo}
          onChange={handleChange}
        />
        <button type="submit">Registrar Usuario</button>
      </form>

      <h3>Usuarios Registrados</h3>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul className="lista-pedidos">
          {usuarios.map((u, index) => (
            <li key={index} className="pedido-item">
              <span>👤 <strong>{u.nombre}</strong> - {u.correo}</span>
              <button 
                className="btn-eliminar" 
                onClick={() => eliminarUsuario(index)}
              >
                🗑️ Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RegistroUsuarios;