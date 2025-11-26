import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const { login, loading, error } = useUsuarios();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Por favor ingrese correo y contraseña");
      return;
    }

    try {
      console.log("Intentando login con:", email);
      
      const response = await login({ email, clave: password });

      if (response.success) {
        console.log("Login exitoso, redirigiendo...");
        navigate("/");
        window.location.reload(); // Forzar recarga para actualizar navbar
      } else {
        setErrorMessage(response.message || "Credenciales inválidas");
      }
    } catch (err: any) {
      console.error("Error en login:", err);
      setErrorMessage(err.message || "Error al conectar con el servidor");
    }
  };

  return (
    <div className="main-content d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="login-container p-4 bg-light rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aaa@gmail.com"
              required
              disabled={loading}
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
              placeholder="miau"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        <div className="mt-3 p-3 bg-info bg-opacity-10 border border-info rounded">
          <small className="text-muted d-block mb-2"><strong>Usuarios de prueba:</strong></small>
          <small className="d-block">
            • <strong>Admin:</strong> da.olaver@duocuc.cl / 1234
          </small>
          <small className="d-block">
            • <strong>Propietario:</strong> fs.gonzalez@duocuc.cl / 1234
          </small>
          <small className="d-block">
            • <strong>Arriendatario:</strong> juan.perez@gmail.com / password123
          </small>
        </div>

        <p className="text-center mt-3">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-primary">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;