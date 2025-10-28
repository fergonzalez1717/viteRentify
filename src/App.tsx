import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    const correosPermitidos = ["da.olaver@duocuc.cl", "fs.gonzalez@duocuc.cl"];

    if (
      correosPermitidos.map(c => c.toLowerCase()).includes(email.toLowerCase()) &&
      password === "1234"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top w-100 shadow">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">Rentify</Link>
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
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/arrienda">Arrienda</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>

              {!isLoggedIn ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar sesión</Link>
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

      <div
        className={`main-content ${isHome ? "home-page" : ""}`}
        style={{ marginTop: isHome? "0" : "80px", minHeight: "calc(100vh - 160px)" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/arrienda" element={<Arrienda />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/registro"
            element={<Registro onRegisterSuccess={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/perfil"
            element={isLoggedIn ? <Perfil /> : <Home />}
          />
        </Routes>
      </div>

      <footer className="footer text-center py-3 text-white">
        © 2025 Rentify - Todos los derechos reservados
        <p>Síguenos en nuestras RRSS:</p>
        <div className="mt-2">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width={25} height={25} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
            <img src="https://cdn.pixabay.com/photo/2017/08/23/11/30/twitter-2672572_640.jpg" alt="Twitter" width={25} height={25} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
