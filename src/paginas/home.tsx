import React from "react";
import carusel1 from "../assets/carusel1.png"; 


const Home: React.FC = () => { // Declara un componente funcional llamado Home, significa React Functional Component, y le dice a TypeScript que Home es un componente de React.
  return (
    <div className="main-content">

        {/* carrousel */}
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade mb-4"
            data-bs-ride="carousel"
            data-bs-interval={2000} // cambia cada 2 segundos
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
      <p className="lead text-white">
        Arrendar es sencillo, directo y sin comisiones.
      </p>
    </div>
  );
};

export default Home;