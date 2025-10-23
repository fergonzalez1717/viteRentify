import React from "react";
import carusel1 from "../assets/carusel1.png"; 

const Home: React.FC = () => { 
  return (
    <div className="main-content">
      {/* CAROUSEL */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade mb-4"
        data-bs-ride="carousel"
        data-bs-interval={2000} // Cambia cada 2 segundos
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={carusel1} className="d-block w-100" alt="imagen1" />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn-e360.s3-sa-east-1.amazonaws.com/marketing-inmobiliario-large-lWnYEILUuH.png"
              className="d-block w-100"
              alt="imagen2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.ciencuadras.com/blog/wp-content/uploads/2024/05/700x200_Arriendo-1.png"
              className="d-block w-100"
              alt="imagen3"
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <h1 className="text-white fw-bold display-5">
        Bienvenidos a Rentify
      </h1>
      <p className="lead">
        Arrendar es sencillo, directo y sin comisiones.
      </p>

      {/* INICIO BUSCADOR DESTACADO */}
      <section className="hero-search-section ">
        <p className="lead mb-3 text-center">
          Completa el buscador para encontrar tu inmueble ideal sin intermediarios.
        </p>
        <form className="row g-3 align-items-center justify-content-center">
          <div className="col-12 col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Ubicación"
              aria-label="Ubicación"
            />
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select" aria-label="Tipo de inmueble">
              <option value="">Tipo de inmueble</option>
              <option value="departamento">Departamento</option>
              <option value="casa">Casa</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select" aria-label="Rango de precio">
              <option value="">Rango de precio</option>
              <option value="0-500">$0 - $500,000</option>
              <option value="501-1000">$501,000 - $100,000,000</option>
              <option value="1001-2000">$1,000,001 - $1,600,000</option>
            </select>
          </div>
          <div className="col-12 mt-3 d-grid">
            <button type="submit" className="btn btn-light">
              Buscar
            </button>
          </div>
        </form>
      </section>
      {/* TERMINO BUSCADOR DESTACADO */}

      {/* SECCIÓN BENEFICIOS */}
      <section className="container my-5 text-center">
        <h3 className="mb-4 fw-bold">¿Por qué elegir Rentify?</h3>
        <div className="row justify-content-center">
          <div className="col-12 col-md-4 mb-4">
            <div className="p-3 border rounded shadow-sm h-100 d-flex flex-column align-items-center">
              <i className="bi bi-speedometer2 fs-1 text-success mb-3"></i>
              <h5>Arrendamiento rápido</h5>
              <p>Encuentra tu inmueble ideal en minutos, sin comisiones ni intermediarios.</p>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <div className="p-3 border rounded shadow-sm h-100 d-flex flex-column align-items-center">
              <i className="bi bi-shield-check fs-1 text-success mb-3"></i>
              <h5>Seguridad garantizada</h5>
              <p>Operaciones transparentes y seguras para que tengas tranquilidad.</p>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <div className="p-3 border rounded shadow-sm h-100 d-flex flex-column align-items-center">
              <i className="bi bi-people fs-1 text-success mb-3"></i>
              <h5>Contacto directo</h5>
              <p>Comunícate directamente con el propietario, sin intermediarios molestos.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
