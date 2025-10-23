import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  // Manejo del inicio de sesión (simulado)
  const handleLogin = () => {
    // Aquí podrías agregar la lógica de validación del login (por ejemplo, verificar con una API)
    if (email && password) {
      // Guardamos el estado de login en el localStorage
      localStorage.setItem("isLoggedIn", "true");
      onLoginSuccess();
      navigate("/"); // Redirigir a Home después de iniciar sesión
    }
  };

  return (
    <div className="main-content d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="login-container p-4 bg-light rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin} className="btn btn-primary w-100 mt-2">Iniciar sesión</button>

        {/* Enlace para redirigir al registro */}
        <p className="text-center mt-3">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="text-primary">
            Crear cuenta
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
