import React from "react";

// Declara un componente funcional llamado Nosotros, significa React Functional Component, y le dice a TypeScript que Nosotros es un componente de React.
const Nosotros: React.FC = () => {
  return (
    <div className="main-content">
    <div className="nosotros-container">
      <h1 className="text-white fw-bold display-5">Sobre Nosotros </h1>
      <p className="lead text-white">
        <strong>Rentify</strong> es una plataforma inmobiliaria que permite gestionar propiedades de manera sencilla, directa y sin comisiones.
      </p>
      <p className="text-white">
        Nuestra mision es simplificar el arriendo inmobiliario conectando directamente a propietarios e interesados, sin intermediarios. 
        En Rentify impulsamos una experiencia transparente, segura y eficiente, donde cada usuario puede gestionar su propiedad o encontrar
        su hogar con confianza y facilidad.
      </p>
    </div>
    </div>
  );
};

export default Nosotros;