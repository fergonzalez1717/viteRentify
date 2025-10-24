import React, { useState } from "react";

interface Inmueble {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  fotosAdicionales?: string[];
  direccion?: string;
}

const Arrienda: React.FC = () => {
  const inmueble: Inmueble[] = [
    {
      id: 1,
      nombre: "Depto Santiago centro",
      descripcion: "Departamento céntrico de 2 dormitorios, cercano a estaciones de metro.",
      imagen: "https://www.toppropiedades.cl/imagenes/c1981u6668coc1ea47.jpg",
      precio: 550000,
      fotosAdicionales: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/537939601.jpg?k=d4e31f48d360eae550acff3bfd79b190c011b1303e39e9004ee752946e719baf&o=&hp=1",
        "https://http2.mlstatic.com/D_NQ_NP_723792-MLC93108865073_092025-O-depto-1-dormitorio-1-bano-santiago-centro.webp",
      ],
      direccion: "Santa Isabel 385, Santiago Centro",
    },
    {
      id: 2,
      nombre: "Casa en Maipú",
      descripcion: "Casa con patio y jardín amplio, ideal para familias 3 dormitorios y 2 baños.",
      imagen: "https://www.luisduranpropiedades.cl/wp-content/uploads/2022/12/20200729_145338-scaled.jpg",
      precio: 630000,
      fotosAdicionales: [
        "https://http2.mlstatic.com/D_NQ_NP_2X_912378-MLC89933696258_082025-F-casa-en-venta-de-4-dorm-1-bano-en-maipu.webp",
        "https://http2.mlstatic.com/D_NQ_NP_2X_908110-MLC92623826781_092025-F-amplia-casa-en-venta-5-dormitorios-y-4-banos-97136.webp",
      ],
      direccion: "Leonel Calcagni 389, Maipú",
    },
    {
      id: 3,
      nombre: "Casa Chicureo",
      descripcion: "Amplia y luminosa casa en barrio tranquilo de Chicureo, con 3 dormitorios, 2 baños, jardín y estacionamiento. Cerca de colegios y servicios. Ideal para familia que busca seguridad y comodidad.",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_682250-MLC91589808001_092025-O-arriendo-casa-en-parque-brisas-de-norte-chicureo.webp",
      precio: 890000,
      fotosAdicionales: [
        "https://www.ehaus.cl/wp-content/uploads/2023/03/Monica_Molina_Ehouse_PiedraRoja-7-scaled.jpg",
        "https://img.mitula.com/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTg2YmIyLTVmOTYtNzZhYi05OGJiLWJjZDQ5ZGY3OWU4ZC8wMTk4NmJkMC1hZDQ2LTcyN2UtYTFjNC0wY2U3ZGEzNGFlMTkuanBnIiwiYnJhbmQiOiJtaXR1bGEiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6MzgwLCJoZWlnaHQiOjIzMCwiZml0IjoiY292ZXIifX19",
      ],
      direccion: "La Hacienda Chicureo 5",
    },
    {
      id: 4,
      nombre: "Depto Estacion central",
      descripcion: "Cómodo departamento de 2 dormitorios y 1 baño, ubicado cerca de estaciones de metro y comercio. Ideal para quienes buscan conectividad y vida urbana a buen precio.",
      imagen: "https://img.resemmedia.com/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTU5MGRjLTgxMjAtNzc3ZC04OTdkLTAwYWZjZWJlODE1ZS8wMTk1OTBlMC0yZDdkLTcxMDgtODEzMC02MjEwYWVhYzBkZTQuanBnIiwiYnJhbmQiOiJyZXNlbSIsImVkaXRzIjp7InJvdGF0ZSI6bnVsbCwicmVzaXplIjp7IndpZHRoIjo4NDAsImhlaWdodCI6NjMwLCJmaXQiOiJjb3ZlciJ9fX0=",
      precio: 500000,
      fotosAdicionales: [
        "https://http2.mlstatic.com/D_NQ_NP_2X_786444-MLC78471342449_082024-N-arriendo-3d2b-disponible-arriendo-con-opcion-de-compra.webp",
        "https://http2.mlstatic.com/D_NQ_NP_920222-MLC95626588902_102025-O-arriendo-departamento-1-dormitorio-1-bano-estacion-central.webp",
      ],
      direccion: "Placilla 65, Estación Central",
    },
    {
      id: 5,
      nombre: "Depto Vitacura",
      descripcion: "Moderno departamento de 3 dormitorios y 2 baños, en barrio seguro y exclusivo. Cerca de parques, restaurantes y centros comerciales. Ideal para vivir con comodidad y estilo.",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_861463-MLC92409060203_092025-O-moderno-dpto-vitacura-101711.webp",
      precio: 700000,
      fotosAdicionales: [
        "https://http2.mlstatic.com/D_NQ_NP_2X_670519-MLC95234037961_102025-N-departamento-en-arriendo-de-1-dorm-en-vitacura.webp",
        "https://img.mitula.com/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMTk5OTg5OC1iOGIzLTc3ZGItYWZhMS01M2MwZDgxMjU2NzcvNTFiNGIzMjM2MzM1N2JiMTdjYjMwYTYyZDMzYjZmODdmYmMzNzFjMzlmNDdmMmU2Zjk1MWYwY2Q0NTc0MTRkYS5qcGVnIiwiYnJhbmQiOiJtaXR1bGEiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6MzgwLCJoZWlnaHQiOjIzMCwiZml0IjoiY292ZXIifX19",
      ],
      direccion: "Vía Aurora 9255, Lo Curro",
    },
    {
      id: 6,
      nombre: "Depto Santiago",
      descripcion: "Acogedor departamento de 1 dormitorio y 1 baño, ideal para parejas. Ubicado en zona céntrica, con buena conectividad y cerca de servicios básicos. Perfecto para una vida cómoda y práctica.",
      imagen: "https://image.wasi.co/eyJidWNrZXQiOiJzdGF0aWN3Iiwia2V5IjoiaW5tdWVibGVzXC9nMTgyMzM0MjAyMzA4MzEwNTUyMjUuanBnIiwiZWRpdHMiOnsibm9ybWFsaXNlIjp0cnVlLCJyb3RhdGUiOjAsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY3NSwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
      precio: 550000,
      fotosAdicionales: [
        "https://http2.mlstatic.com/D_NQ_NP_2X_733130-MLC89602302741_082025-N-muy-luminosofull-equi-1d1b-metro-ecuado-y-ahur.webp",
        "https://a0.muscache.com/im/pictures/miso/Hosting-799516926434951974/original/13d7c376-6976-4ef3-bc81-7c96b752ba29.jpeg?im_w=720",
      ],
      direccion: "Arturo Prat 595, Santiago",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedInmueble, setSelectedInmueble] = useState<Inmueble | null>(null);

  const handleArrendarClick = (m: Inmueble) => {
    setSelectedInmueble(m);
    setShowModal(true);
  };

  const handlePostular = () => {
    setShowModal(false);
    alert("Tu solicitud fue ingresada, te enviaremos un correo de confirmación.");
  };

  return (
    <>
      <div className="container my-5">
        <h1 className="text-center mb-4 e fw-bold">Arriendos Disponibles</h1>
        <div className="row g-4">
          {inmueble.map((m) => (
            <div className="col-md-4" key={m.id}>
              <div className="card shadow-sm h-100">
                <img src={m.imagen} className="card-img-top pet-image" alt={m.nombre} />
                <div className="card-body">
                  <h5 className="card-title">{m.nombre}</h5>
                  <p className="card-text">{m.descripcion}</p>
                  <p className="fw-bold">Precio: ${m.precio.toLocaleString('es-CL')}</p>
                  <button className="btn btn-primary w-100" onClick={() => handleArrendarClick(m)}>
                    Arrendar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedInmueble && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedInmueble.nombre}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{selectedInmueble.descripcion}</p>
                <p><strong>Dirección:</strong> {selectedInmueble.direccion}</p>
                <div className="d-flex gap-2">
                  {selectedInmueble.fotosAdicionales?.map((foto, idx) => (
                    <img key={idx} src={foto} alt={`Foto ${idx + 1}`} style={{ width: "50%" }} />
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handlePostular}>
                  Postular a este arriendo
                </button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Arrienda;
