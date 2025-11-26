import React, { useState } from "react";
import { solicitudService } from "../api";
import type { CrearSolicitudRequest } from "../api";

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
  // Lista de inmuebles disponibles
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
  
  // Estados para el manejo de la postulación
  const [estadoPostulacion, setEstadoPostulacion] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error">("success");
  const [cargandoPostulacion, setCargandoPostulacion] = useState(false);

  const handleArrendarClick = (m: Inmueble) => {
    setSelectedInmueble(m);
    setShowModal(true);
    setEstadoPostulacion("");
  };

  const handlePostular = async () => {
    // Verificar si el usuario está logueado
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      setTipoMensaje("error");
      setEstadoPostulacion("Debes iniciar sesión para postular a un arriendo.");
      setTimeout(() => setEstadoPostulacion(""), 5000);
      setShowModal(false);
      return;
    }

    // Verificar rol del usuario
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "ARRIENDATARIO" && userRole !== "ADMIN") {
      setTipoMensaje("error");
      setEstadoPostulacion("Solo usuarios con rol ARRIENDATARIO pueden postular a arriendos.");
      setTimeout(() => setEstadoPostulacion(""), 5000);
      setShowModal(false);
      return;
    }

    if (!selectedInmueble) return;

    setCargandoPostulacion(true);
    setShowModal(false);

    try {
      // TODO: Obtener el userId real desde tu sistema de autenticación
      // Por ahora usamos un ID temporal para desarrollo
      const userId = 1; // IMPORTANTE: Reemplazar con el ID real del usuario logueado
      
      // Crear la solicitud usando el microservicio
      const solicitud: CrearSolicitudRequest = {
        usuarioId: userId,
        propiedadId: selectedInmueble.id,
      };

      const resultado = await solicitudService.crearSolicitud(solicitud);

      // Éxito - Mostrar mensaje positivo
      setTipoMensaje("success");
      setEstadoPostulacion(
        `¡Solicitud enviada con éxito! 🎉\n` +
        `Tu solicitud para el arriendo en ${selectedInmueble.direccion} ` +
        `ha sido registrada con el ID #${resultado.id}. ` +
        `Te contactaremos pronto.`
      );

      console.log("Solicitud creada exitosamente:", resultado);
    } catch (error) {
      // Error - Mostrar mensaje de error
      setTipoMensaje("error");
      
      let mensajeError = "Hubo un problema al procesar tu solicitud. ";
      
      if (error instanceof Error) {
        // Personalizar mensajes de error comunes
        if (error.message.includes("documentos aprobados")) {
          mensajeError = "⚠️ Debes tener todos tus documentos aprobados antes de postular.";
        } else if (error.message.includes("máximo permitido")) {
          mensajeError = "⚠️ Has alcanzado el límite de 3 solicitudes activas.";
        } else if (error.message.includes("solicitud pendiente")) {
          mensajeError = "⚠️ Ya tienes una solicitud pendiente para esta propiedad.";
        } else if (error.message.includes("no existe")) {
          mensajeError = "⚠️ No se pudo verificar la información. Intenta nuevamente.";
        } else if (error.message.includes("Failed to fetch") || error.message.includes("Network")) {
          mensajeError = "⚠️ No se pudo conectar con el servidor. Verifica que el microservicio esté corriendo.";
        } else {
          mensajeError += error.message;
        }
      }
      
      setEstadoPostulacion(mensajeError);
      console.error("Error al crear solicitud:", error);
    } finally {
      setCargandoPostulacion(false);
      
      // Ocultar mensaje después de 7 segundos
      setTimeout(() => {
        setEstadoPostulacion("");
      }, 7000);
    }
  };

  return (
    <>
      {/* ----------------- Mensaje Flotante de Postulación ----------------- */}
      {estadoPostulacion && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ 
            backgroundColor: "rgba(0,0,0,0.4)", 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 2000 
          }}
          onClick={() => setEstadoPostulacion("")} // Click para cerrar
        >
          <div 
            className={`alert ${tipoMensaje === "success" ? "alert-success" : "alert-danger"} p-4 rounded-3 shadow-lg text-center`}
            style={{ 
              maxWidth: '90%', 
              width: '500px',
              backgroundColor: tipoMensaje === "success" ? '#d4edda' : '#f8d7da',
              color: tipoMensaje === "success" ? '#155724' : '#721c24',
              border: `1px solid ${tipoMensaje === "success" ? '#c3e6cb' : '#f5c6cb'}`,
              cursor: 'pointer'
            }}
            role="alert"
            onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer click en el mensaje
          >
            <h4 className="alert-heading fw-bold mb-2">
              {tipoMensaje === "success" ? "¡Solicitud Enviada!" : " Error"}
            </h4>
            <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>
              {estadoPostulacion}
            </p>
            <button 
              className="btn btn-sm btn-secondary mt-3"
              onClick={() => setEstadoPostulacion("")}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* ----------------- Fin Mensaje Flotante ----------------- */}

      {/* Spinner de carga mientras se procesa la solicitud */}
      {cargandoPostulacion && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ 
            backgroundColor: "rgba(0,0,0,0.6)", 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 2000 
          }}
        >
          <div className="text-center text-white">
            <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 fs-5">Enviando solicitud...</p>
          </div>
        </div>
      )}

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
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalles del inmueble */}
      {showModal && selectedInmueble && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.6)", position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }} 
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
                <p><strong>Precio Mensual:</strong> ${selectedInmueble.precio.toLocaleString('es-CL')}</p>
                <div className="d-flex gap-2 justify-content-center flex-wrap">
                  {selectedInmueble.fotosAdicionales?.map((foto, idx) => (
                    <img 
                      key={idx} 
                      src={foto} 
                      alt={`Foto ${idx + 1}`} 
                      style={{ width: "48%", objectFit: "cover", height: "150px", borderRadius: "8px" }} 
                      className="shadow-sm" 
                    />
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-success" 
                  onClick={handlePostular}
                  disabled={cargandoPostulacion}
                >
                  {cargandoPostulacion ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Enviando...
                    </>
                  ) : (
                    "Postular a este arriendo"
                  )}
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
