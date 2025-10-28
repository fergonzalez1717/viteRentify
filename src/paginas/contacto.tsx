import React, { useState } from "react";

const Contacto: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [errores, setErrores] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    mensaje: "",
  });

  // 🔹 Validación del formulario
  const validarFormulario = () => {
    const nuevosErrores = { nombre: "", apellidos: "", email: "", mensaje: "" };

    if (!nombre.trim()) nuevosErrores.nombre = "El nombre no puede estar vacío.";
    if (!apellidos.trim()) nuevosErrores.apellidos = "Los apellidos no pueden estar vacíos.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) nuevosErrores.email = "El email es obligatorio.";
    else if (!emailRegex.test(email)) nuevosErrores.email = "Formato de email no válido.";

    if (!mensaje.trim()) nuevosErrores.mensaje = "El mensaje no puede estar vacío.";
    else if (mensaje.length < 10) nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    else if (mensaje.length > 200) nuevosErrores.mensaje = "El mensaje no puede superar los 200 caracteres.";

    setErrores(nuevosErrores);
    return nuevosErrores;
  };

  // 🔹 Manejo del envío
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const erroresValidacion = validarFormulario();

    if (
      !erroresValidacion.nombre &&
      !erroresValidacion.apellidos &&
      !erroresValidacion.email &&
      !erroresValidacion.mensaje
    ) {
      alert(`Gracias ${nombre} ${apellidos}, tu mensaje ha sido enviado!`);
      setNombre("");
      setApellidos("");
      setEmail("");
      setMensaje("");
      setErrores({ nombre: "", apellidos: "", email: "", mensaje: "" });
    }
  };

  const botonDeshabilitado =
    !nombre.trim() ||
    !apellidos.trim() ||
    !email.trim() ||
    !mensaje.trim() ||
    !!errores.nombre ||
    !!errores.apellidos ||
    !!errores.email ||
    !!errores.mensaje;

  return (
    <div className="contact-form-container">
      <h1 className="text-white fw-bold display-5 mb-3">Contacto 📨</h1>
      <p className="lead text-white mb-4">
        Completa el formulario y nos pondremos en contacto contigo.
      </p>

      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errores.nombre && <p className="text-danger mt-1">{errores.nombre}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="apellidos" className="form-label">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            className="form-control"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
          {errores.apellidos && <p className="text-danger mt-1">{errores.apellidos}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errores.email && <p className="text-danger mt-1">{errores.email}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">Mensaje</label>
          <textarea
            id="mensaje"
            className="form-control"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
          ></textarea>
          {errores.mensaje && <p className="text-danger mt-1">{errores.mensaje}</p>}
        </div>

        <button type="submit" className="btn btn-light w-100" disabled={botonDeshabilitado}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
