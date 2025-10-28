import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  onLogin: (email: string, password: string) => void; // App.tsx le pasa esta función
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  if (!email || !password) {
    alert("Por favor ingrese correo y contraseña");
    return; //No llama a onLogin si faltan datos
  }

  onLogin(email, password);
};


  return (
    <div className="main-content d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="login-container p-4 bg-light rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">Iniciar sesión</button>
        </form>

        <p className="text-center mt-3">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-primary">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
