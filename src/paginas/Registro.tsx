import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Definimos los tipos de rol para tener un código más limpio y tipado.
type Rol = "PROPIETARIO" | "ARRIENDATARIO" | "";

const Registro: React.FC<{ onRegisterSuccess: () => void }> = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Estado para almacenar el rol seleccionado.
  const [rol, setRol] = useState<Rol>("");
  const [errors, setErrors] = useState<{ 
    email?: string; 
    password?: string; 
    confirmPassword?: string; 
    // Error para la validación del rol.
    rol?: string; 
  }>({});
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: { 
        email?: string; 
        password?: string; 
        confirmPassword?: string; 
        rol?: string; 
    } = {};

    if (!email) {
      newErrors.email = "El correo es obligatorio";
    } 
    // CORRECCIÓN DE REGEX: El patrón ahora es correcto para la validación de email.
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) { 
      newErrors.email = "Formato de correo inválido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 4) {
      newErrors.password = "La contraseña debe tener al menos 4 caracteres";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    // Validación para asegurar que se seleccione un rol.
    if (!rol) {
        newErrors.rol = "Debe seleccionar un tipo de cuenta";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    
    // En este punto, los datos están validados y listos para enviar al microservicio
    console.log("Datos de Registro listos:", { email, password, rol });

     // Guardar sesión
     localStorage.setItem("isLoggedIn", "true");
     localStorage.setItem("userEmail", email);
     // IMPORTANTE: Aquí deberías guardar el rol. Lo pongo aquí temporalmente, 
     // pero idealmente el rol lo confirmaría el microservicio al registrar.
     localStorage.setItem("userRole", rol); 

      // Avisar a App que el usuario ya está logueado
    onRegisterSuccess();

     // Redirigir al perfil
    navigate("/perfil");
};


  return (
    <div className="main-content d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      {/* Contenedor con la clase de diseño del formulario de contacto */}
      <div className="contact-form-container p-4 rounded shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-bold">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
          
          {/* Campo de Selección de Rol con Margen Fuerte */}
          <div className="mb-3">
            <label className={`form-label fw-bold ${errors.rol ? "text-danger" : ""}`}>Tipo de Cuenta</label>
            {/* Se usa justify-content-center y 'me-5' para dar un margen más fuerte */}
            <div className="d-flex justify-content-center"> 
                <div className="form-check me-5"> {/* Margen fuerte a la derecha */}
                    <input
                        className={`form-check-input ${errors.rol ? "is-invalid" : ""}`}
                        type="radio"
                        name="rolOptions"
                        id="rolPropietario"
                        value="PROPIETARIO"
                        checked={rol === "PROPIETARIO"}
                        onChange={(e) => setRol(e.target.value as Rol)}
                    />
                    <label className="form-check-label" htmlFor="rolPropietario">
                        Propietario
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className={`form-check-input ${errors.rol ? "is-invalid" : ""}`}
                        type="radio"
                        name="rolOptions"
                        id="rolArrendatario"
                        value="ARRIENDATARIO"
                        checked={rol === "ARRIENDATARIO"}
                        onChange={(e) => setRol(e.target.value as Rol)}
                    />
                    <label className="form-check-label" htmlFor="rolArrendatario">
                        Arrendatario
                    </label>
                </div>
            </div>
             {errors.rol && <div className="invalid-feedback d-block text-center mt-2">{errors.rol}</div>}
          </div>
          {/* Fin Campo de Selección de Rol */}

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;