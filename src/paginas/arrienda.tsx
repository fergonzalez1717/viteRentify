import React from "react";

interface Inmueble {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
}

const Arrienda: React.FC = () => {
  const inmueble: Inmueble[] = [
    {
      id: 1,
      nombre: "Depto Santiago centro",
      descripcion: "Departamento céntrico de 2 dormitorios, cercano a estaciones de metro.",
      imagen: "https://www.toppropiedades.cl/imagenes/c1981u6668coc1ea47.jpg",
      precio: 550000,
    },
    {
      id: 2,
      nombre: "Casa en Maipú",
      descripcion: "Casa con patio y jardín amplio, ideal para familias 3 dormitorios y 2 baños .",
      imagen: "https://www.luisduranpropiedades.cl/wp-content/uploads/2022/12/20200729_145338-scaled.jpg",
      precio: 630000,
    },
    {
      id: 3,
      nombre: "casa Chicureo",
      descripcion: "Amplia y luminosa casa en barrio tranquilo de Chicureo, con 3 dormitorios, 2 baños, jardín y estacionamiento. Cerca de colegios y servicios. Ideal para familia que busca seguridad y comodidad.",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_682250-MLC91589808001_092025-O-arriendo-casa-en-parque-brisas-de-norte-chicureo.webp",
      precio: 890000,
    },
    {
      id: 4,
      nombre: "Depto Estacion central",
      descripcion: "Cómodo departamento de 2 dormitorios y 1 baño, ubicado cerca de estaciones de metro y comercio. Ideal para quienes buscan conectividad y vida urbana a buen precio.",
      imagen: "https://img.resemmedia.com/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTU5MGRjLTgxMjAtNzc3ZC04OTdkLTAwYWZjZWJlODE1ZS8wMTk1OTBlMC0yZDdkLTcxMDgtODEzMC02MjEwYWVhYzBkZTQuanBnIiwiYnJhbmQiOiJyZXNlbSIsImVkaXRzIjp7InJvdGF0ZSI6bnVsbCwicmVzaXplIjp7IndpZHRoIjo4NDAsImhlaWdodCI6NjMwLCJmaXQiOiJjb3ZlciJ9fX0=",
      precio: 500000,
    },
    {
      id: 5,
      nombre: "Depto vitacura",
      descripcion: "Moderno departamento de 3 dormitorios y 2 baños, en barrio seguro y exclusivo. Cerca de parques, restaurantes y centros comerciales. Ideal para vivir con comodidad y estilo.",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_861463-MLC92409060203_092025-O-moderno-dpto-vitacura-101711.webp",
      precio: 700000,
    },
    {
      id: 6,
      nombre: "Depto Santiago",
      descripcion: "Acogedor departamento de 1 dormitorio y 1 baño, ideal para parejas. Ubicado en zona céntrica, con buena conectividad y cerca de servicios básicos. Perfecto para una vida cómoda y práctica.",
      imagen: "https://image.wasi.co/eyJidWNrZXQiOiJzdGF0aWN3Iiwia2V5IjoiaW5tdWVibGVzXC9nMTgyMzM0MjAyMzA4MzEwNTUyMjUuanBnIiwiZWRpdHMiOnsibm9ybWFsaXNlIjp0cnVlLCJyb3RhdGUiOjAsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY3NSwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
      precio: 550000,
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
                <p className="fw-bold">Precio: ${m.precio.toLocaleString('es-CL')}</p>
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
