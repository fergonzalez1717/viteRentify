import React, { useState } from "react"; //permite manejar valores dinámicos, como los campos del formulario

// Declara un componente funcional llamado Contacto, significa React Functional Component, y le dice a TypeScript que Home es un componente de React.
const Contacto: React.FC = () => {
  const [nombre, setNombre] = useState(""); //React actualiza el estado y vuelve a renderizar el componente con el nuevo valor.
  const [apellidos, setApellidos] = useState ("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState(""); //useState("") crea un estado inicial vacío para mensaje.

  // Estados para manejar los mensajes de error
  const [errores, setErrores] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    mensaje: "",
  });

  // Función que valida los campos y actualiza los errores
  const validarFormulario = () => {
    const nuevosErrores = { nombre: "",apellidos: "", email: "", mensaje: "" };

    // Validación del nombre
    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre no puede estar vacío.";
    }

     // Validación del nombre
    if (!apellidos.trim()) {
      nuevosErrores.apellidos = "los apellidos no puede estar vacío.";
    }

    // Validación del email con expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nuevosErrores.email = "El email es obligatorio.";
    } else if (!emailRegex.test(email)) {
      nuevosErrores.email = "Formato de email no válido.";
    }

    // Validación del mensaje (mínimo y máximo)
    if (!mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje no puede estar vacío.";
    } else if (mensaje.length < 10) {
      nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    } else if (mensaje.length > 100) {
      nuevosErrores.mensaje = "El mensaje no puede superar los 200 caracteres.";
    }

    setErrores(nuevosErrores);
  };

  // Función que maneja el envío del formulario, evita que la página se recargue y procesa los datos ingresados
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    validarFormulario();

    // Solo enviar si no hay errores
    if (!errores.nombre && !errores.email && !errores.mensaje) {
      alert(`Gracias ${nombre} ${apellidos}, tu mensaje ha sido enviado!`); //Todo lo que pongas dentro de ${} se evalúa y se reemplaza por su valor.
      setNombre("");
      setApellidos ("");
      setEmail("");
      setMensaje("");
      setErrores({ nombre: "",apellidos: "" , email: "", mensaje: "" }); // Limpia los mensajes de error
    }
  };

  // Variable que evalúa si hay errores o campos vacíos para deshabilitar el botón
  const botonDeshabilitado =
    !nombre.trim() ||
    !apellidos.trim() ||
    !email.trim() ||
    !mensaje.trim() ||
    !!errores.nombre ||
    !!errores.email ||
    !!errores.mensaje;

  return (
    <div className="contact-form-container">
      <h1 className="text-white fw-bold display-5 mb-3">Contacto 📨</h1>
      <p className="lead text-white mb-4">
        Completa el formulario y nos pondremos en contacto contigo.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-100"
        style={{ maxWidth: "500px" }}
      >
        {/* Campo Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label text-white">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value); // evento que captura la informacion
              validarFormulario(); // validar mientras escribe
            }}
          />
          {/* Mensaje de error para nombre */}
          {errores.nombre && (
            <p className="text-danger mt-1">{errores.nombre}</p>
          )}
        </div>


        {/* Campo Apellidos */}
       <div className="mb-3">
       <label htmlFor="apellidos" className="form-label text-white">
        Apellidos
       </label>
       <input
      type="text"
      id="apellidos"
      className="form-control"
      value={apellidos}
      onChange={(e) => {
      setApellidos(e.target.value); // captura la información
      validarFormulario(); // validar mientras escribe
      }}
       />
      {/* Mensaje de error para apellidos */}
         {errores.apellidos && (
        <p className="text-danger mt-1">{errores.apellidos}</p>
        )}
       </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validarFormulario(); // validar mientras escribe
            }}
          />
          {/* Mensaje de error para email */}
          {errores.email && <p className="text-danger mt-1">{errores.email}</p>}
        </div>

        {/* Campo Mensaje */}
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label text-white">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            className="form-control"
            value={mensaje}
            onChange={(e) => {
              setMensaje(e.target.value);
              validarFormulario(); // validar mientras escribe
            }}
            rows={4}
          ></textarea>
          {/* Mensaje de error para mensaje */}
          {errores.mensaje && (
            <p className="text-danger mt-1">{errores.mensaje}</p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="btn btn-light w-100"
          disabled={botonDeshabilitado}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;