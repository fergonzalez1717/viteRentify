import React, { useState, useMemo } from "react";

// Tipado de la estructura de errores
interface Errores {
  nombre: string;
  apellidos: string;
  email: string;
  mensaje: string;
}

const Contacto: React.FC = () => {
  // Estados para los campos
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estado para los mensajes de error de validación
  const [errores, setErrores] = useState<Errores>({
    nombre: "",
    apellidos: "",
    email: "",
    mensaje: "",
  });
  
  // Estado para mensajes de confirmación o error general de envío
  const [estadoEnvio, setEstadoEnvio] = useState("");

  // ---------------- LÓGICA DE VALIDACIÓN ----------------
  
  /**
   * Valida todos los campos, incluyendo la restricción de solo letras.
   * La validación se ejecuta de forma síncrona con los valores más recientes.
   */
  const validarFormulario = (
    currentNombre: string,
    currentApellidos: string,
    currentEmail: string,
    currentMensaje: string
  ): Errores => {
    const nuevosErrores: Errores = { nombre: "", apellidos: "", email: "", mensaje: "" };

    // Regex para validar solo letras (incluyendo acentos, ñ/Ñ y espacios)
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    
    // --- Validación de Nombre ---
    if (!currentNombre.trim()) {
      nuevosErrores.nombre = "El nombre no puede estar vacío.";
    } else if (!soloLetrasRegex.test(currentNombre)) {
      nuevosErrores.nombre = "⚠️ Ingrese solo letras y espacios.";
    }

    // --- Validación de Apellidos ---
    if (!currentApellidos.trim()) {
      nuevosErrores.apellidos = "Los apellidos no pueden estar vacíos.";
    } else if (!soloLetrasRegex.test(currentApellidos)) {
      nuevosErrores.apellidos = "⚠️ Ingrese solo letras y espacios.";
    }

    // --- Validación de Email ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!currentEmail.trim()) {
      nuevosErrores.email = "El email es obligatorio.";
    } else if (!emailRegex.test(currentEmail)) {
      nuevosErrores.email = "Formato de email no válido.";
    }

    // --- Validación de Mensaje ---
    if (!currentMensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje no puede estar vacío.";
    } else if (currentMensaje.length < 10) {
      nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    } else if (currentMensaje.length > 200) {
      nuevosErrores.mensaje = "El mensaje no puede superar los 200 caracteres.";
    }

    setErrores(nuevosErrores);
    return nuevosErrores;
  };

  // ---------------- MANEJADOR DE CAMBIOS EN TIEMPO REAL ----------------
  
  /**
   * Función central que actualiza el estado del campo y ejecuta la validación inmediatamente
   * para reflejar los errores y el estado del botón en tiempo real.
   */
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    campo: keyof Errores
  ) => {
    setter(value);

    // Obtener el estado actualizado para la validación síncrona
    const currentFormState = { nombre, apellidos, email, mensaje };
    const updatedState = { ...currentFormState, [campo]: value };
    
    // Llamar a validarFormulario con el nuevo estado para actualizar los errores
    validarFormulario(
      updatedState.nombre,
      updatedState.apellidos,
      updatedState.email,
      updatedState.mensaje
    );
  };

  // 🔹 Manejo del envío
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ejecutar la validación final antes de intentar el envío
    const erroresValidacion = validarFormulario(nombre, apellidos, email, mensaje);

    const hayErrores = Object.values(erroresValidacion).some(error => error !== "");

    if (!hayErrores) {
      // Éxito: Simulación de envío
      setEstadoEnvio(`✅ ¡Gracias ${nombre} ${apellidos}! Tu mensaje ha sido enviado correctamente.`);
      
      // Limpiar formulario
      setNombre("");
      setApellidos("");
      setEmail("");
      setMensaje("");
      setErrores({ nombre: "", apellidos: "", email: "", mensaje: "" });
    } else {
      // Error: Notificar al usuario (los errores de campo ya están visibles)
      setEstadoEnvio("❌ Por favor corrige los errores antes de enviar el formulario.");
    }
  };

  // ---------------- LÓGICA DEL BOTÓN DESHABILITADO ----------------
  /**
   * useMemo asegura que el estado de 'disabled' solo se recalcule cuando cambien los valores de los campos o los errores.
   */
  const botonDeshabilitado = useMemo(() => {
    const camposLlenos = nombre.trim() && apellidos.trim() && email.trim() && mensaje.trim();
    // Verifica si hay ALGÚN mensaje de error activo
    const hayErrores = !!errores.nombre || !!errores.apellidos || !!errores.email || !!errores.mensaje;

    // El botón se deshabilita si falta llenar campos O si hay errores de validación.
    return !camposLlenos || hayErrores;
  }, [nombre, apellidos, email, mensaje, errores]); 

  // ---------------- INTERFAZ (Usando Clases de app.css) ----------------
  return (
    // CLASE PRINCIPAL: targeteada por tu CSS (.contact-form-container)
    <div className="contact-form-container"> 
      {/* Las clases de título y lead son targeteadas por tu CSS */}
      <h1 className="fw-bold display-5 mb-3">Contacto 📨</h1>
      <p className="lead mb-4">
        Completa el formulario y nos pondremos en contacto contigo.
      </p>

      {/* Tu CSS usa selectores como .contact-form-container .form-control, por eso usamos las clases originales */}
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "500px" }}>
        
        {/* Campo Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="form-control" // Clase targeteada por tu CSS
            value={nombre}
            onChange={(e) => handleInputChange(setNombre, e.target.value, 'nombre')}
            // Tu CSS maneja el estilo de :focus y .form-control
          />
          {/* Clase targeteada por tu CSS (.contact-form-container .text-danger) */}
          {errores.nombre && <p className="text-danger mt-1">{errores.nombre}</p>}
        </div>

        {/* Campo Apellidos */}
        <div className="mb-3">
          <label htmlFor="apellidos" className="form-label">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            className="form-control" // Clase targeteada por tu CSS
            value={apellidos}
            onChange={(e) => handleInputChange(setApellidos, e.target.value, 'apellidos')}
          />
          {/* Clase targeteada por tu CSS (.contact-form-container .text-danger) */}
          {errores.apellidos && <p className="text-danger mt-1">{errores.apellidos}</p>}
        </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control" // Clase targeteada por tu CSS
            value={email}
            onChange={(e) => handleInputChange(setEmail, e.target.value, 'email')}
          />
          {/* Clase targeteada por tu CSS (.contact-form-container .text-danger) */}
          {errores.email && <p className="text-danger mt-1">{errores.email}</p>}
        </div>

        {/* Campo Mensaje */}
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">Mensaje</label>
          <textarea
            id="mensaje"
            className="form-control" // Clase targeteada por tu CSS
            value={mensaje}
            onChange={(e) => handleInputChange(setMensaje, e.target.value, 'mensaje')}
            rows={4}
          ></textarea>
          {/* Clase targeteada por tu CSS (.contact-form-container .text-danger) */}
          {errores.mensaje && <p className="text-danger mt-1">{errores.mensaje}</p>}
        </div>

        {/* Botón de envío */}
        <button 
          type="submit" 
          className="btn w-100" // Clase targeteada por tu CSS
          disabled={botonDeshabilitado}
        >
          Enviar
        </button>
      </form>

      {/* Mensaje de estado de envío (Éxito o Error) */}
      {estadoEnvio && (
        <div 
          // Estilos inline para el mensaje de estado, usando colores que complementan tu tema verde
          style={{ 
            marginTop: '1rem', 
            padding: '10px', 
            borderRadius: '6px', 
            textAlign: 'center', 
            fontWeight: '600',
            backgroundColor: estadoEnvio.startsWith('✅') ? '#a5d6a7' : '#ffcdd2', // Verde claro / Rosa pálido
            color: estadoEnvio.startsWith('✅') ? '#064420' : '#d32f2f', // Verde oscuro / Rojo oscuro
            border: `1px solid ${estadoEnvio.startsWith('✅') ? '#2e6b3a' : '#ef9a9a'}` // Bordes
          }}
        >
          {estadoEnvio}
        </div>
      )}
      
    </div>
  );
};

export default Contacto;