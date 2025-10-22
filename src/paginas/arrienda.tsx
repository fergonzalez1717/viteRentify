import React from "react";

interface Inmueble {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const Arrienda: React.FC = () => {
  const inmueble: Inmueble[] = [
    {
      id: 1,
      nombre: "Depto Centro",
      descripcion: "Departamento céntrico de 2 dormitorios, cerca de todo.",
      imagen: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600",
    },
    {
      id: 2,
      nombre: "Casa Jardín",
      descripcion: "Casa con patio y jardín amplio, ideal para familias.",
      imagen: "https://placedog.net/300/200",
    },
    {
      id: 3,
      nombre: "Loft Moderno",
      descripcion: "Loft con diseño moderno y mucha luz natural.",
      imagen: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600",
    },
  ];

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-white fw-bold">Arriendos Disponibles</h1>
      <div className="row g-4">
        {inmueble.map((m) => (
          <div className="col-md-4" key={m.id}>
            <div className="card shadow-sm h-100">
              <img src={m.imagen} className="card-img-top pet-image" alt={m.nombre} />
              <div className="card-body">
                <h5 className="card-title">{m.nombre}</h5>
                <p className="card-text">{m.descripcion}</p>
                <button className="btn btn-primary w-100">Arrendar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arrienda;
