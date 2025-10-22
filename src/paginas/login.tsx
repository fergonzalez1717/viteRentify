import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface LoginProps { // propiedad que puede recibir un login
  onLoginSuccess?: () => void; // función que Login puede llamar cuando el login fue exitoso. 
}

//declara tu componente funcional
//recibe el componente, en este caso solo onLoginSuccess.
const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //estado guarda los errores de validación, Inicialmente es {} ningún error
  const [errors, setErrors] = useState<{ email?: string; password?: string; login?: string }>({});
  const navigate = useNavigate(); // Trae la función de React Router que permite redireccionar a otra ruta sin recargar la página.
// función interna que verifica que los campos estén correctos antes de enviar el formulario.
  const validate = (): boolean => {
  const newErrors: { email?: string; password?: string } = {};


    if (!email) { //Comprueba si la variable email está vacía (""), Cadena vacía "",null,undefined
      newErrors.email = "El correo es obligatorio"; // Si el email está vacío, agregamos un mensaje de error en el objeto newErrors.
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) { // bloque verifica que el email tenga formato válido usando una expresión regular
      newErrors.email = "Formato de correo inválido";// si la verificacion falla agragamos el siguiente error
    }

    if (!password) {//Comprueba si la variable email está vacía (""), Cadena vacía "",null,undefined
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 4) {//Si la contraseña no está vacía, pero su longitud es menor a 4 caracteres, entra en este bloque.
      newErrors.password = "La contraseña debe tener al menos 4 caracteres";
    }

    //Con esto, el componente se vuelve a renderizar y los mensajes de error se muestran debajo de los inputs.
    //devuelve un array con todas las claves del objeto
    //Si no hay errores, length === 0 → devuelve true → el formulario es válido
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Evita que el formulario se envíe de forma tradicional, lo cual recargaría la página.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return; // si hay errores, no sigue

    // validación de credenciales de prueba
    if (email === "vega@gmail.com" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");//Guarda en el localStorage del navegador que el usuario está logueado.
      setErrors({});// limpia errores
      //Llama a la función que viene de App.tsx para actualizar el estado global isLoggedIn y mostrar “Cerrar sesión” en la navbar.
      if (onLoginSuccess) onLoginSuccess();
      navigate("/"); // redirige al Home
    } else {
      setErrors({ login: "Correo o contraseña incorrectos" }); // Si las credenciales no coinciden, asigna un error general de login.
    }
  };

  return (
    <div className="main-content d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="login-container p-4 bg-light rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Iniciar sesión</h2>
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

          {errors.login && <p className="text-danger text-center">{errors.login}</p>}

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;