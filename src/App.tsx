import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./paginas/home";
import Nosotros from "./paginas/nosotros";   
import Contacto from "./paginas/contacto";  
import Arrienda from "./paginas/arrienda";
import Login from "./paginas/login";   
import Registro from "./paginas/Registro";    
import Perfil from "./paginas/perfil";

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const navigate = useNavigate(); // para navegación interna

    // Verificar sesión guardada
    useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/"); // 🔹 redirige al Home sin recargar la página
  };

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top w-100 shadow">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            Rentify
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/arrienda">Arrienda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>

              {/* Mostrar login o cerrar sesión según estado */}
              {!isLoggedIn ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesion</Link>
                </li>
              ) : (
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light ms-2"
                    style={{ borderRadius: "20px", padding: "5px 15px" }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

       {/* CONTENIDO PRINCIPAL */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />    
          <Route path="/contacto" element={<Contacto />} />    
          <Route path="/arrienda" element={<Arrienda />} />    
          <Route
            path="/login"
            element={
              <Login
                onLoginSuccess={() => {
                  localStorage.setItem("isLoggedIn", "true");
                  setIsLoggedIn(true);
                  navigate("/"); // se redirige al Home después del login
                }}
              />
            }
          />

          {/* Si el usuario está logueado, accede al perfil */}
          {isLoggedIn ? (
            <Route path="/perfil" element={<Perfil />} />
          ) : (
            <Route path="/perfil" element={<Home />} /> // Si no está logueado, redirige al Home
          )}

          <Route path="/registro" element={<Registro />} /> {/* Página de registro */}
        </Routes>
      </div>

      {/* FOOTER */}
      <footer className="footer text-center py-3 text-white">
        © 2025 Rentify - Todos los derechos reservados
      </footer>
    </div>
  );
}

export default App;
