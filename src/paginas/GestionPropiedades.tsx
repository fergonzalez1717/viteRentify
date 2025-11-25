import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Propiedad {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  direccion: string;
  propietarioEmail: string;
}

const GestionPropiedades: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "";
  const userRole = localStorage.getItem("userRole") || "";

  // Propiedades de ejemplo (en producción vendrían del backend)
  const [propiedades, setPropiedades] = useState<Propiedad[]>([
    {
      id: 1,
      nombre: "Depto Santiago centro",
      descripcion: "Departamento céntrico de 2 dormitorios",
      imagen: "https://www.toppropiedades.cl/imagenes/c1981u6668coc1ea47.jpg",
      precio: 550000,
      direccion: "Santa Isabel 385, Santiago Centro",
      propietarioEmail: "fs.gonzalez@duocuc.cl"
    },
    {
      id: 2,
      nombre: "Casa en Maipú",
      descripcion: "Casa con patio y jardín amplio, ideal para familias",
      imagen: "https://www.luisduranpropiedades.cl/wp-content/uploads/2022/12/20200729_145338-scaled.jpg",
      precio: 630000,
      direccion: "Leonel Calcagni 389, Maipú",
      propietarioEmail: "fs.gonzalez@duocuc.cl"
    },
    {
      id: 3,
      nombre: "Depto Providencia",
      descripcion: "Moderno departamento en el corazón de Providencia",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_861463-MLC92409060203_092025-O-moderno-dpto-vitacura-101711.webp",
      precio: 750000,
      direccion: "Av. Providencia 1234, Providencia",
      propietarioEmail: "otro.propietario@duocuc.cl"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [propiedadActual, setPropiedadActual] = useState<Propiedad>({
    id: 0,
    nombre: "",
    descripcion: "",
    imagen: "",
    precio: 0,
    direccion: "",
    propietarioEmail: userEmail
  });

  useEffect(() => {
    if (userRole !== "PROPIETARIO" && userRole !== "ADMIN") {
      alert("No tienes permisos para acceder a esta sección");
      navigate("/");
    }
  }, [userRole, navigate]);

  // ADMIN ve todas las propiedades, PROPIETARIO solo las suyas
  const propiedadesFiltradas = userRole === "ADMIN" 
    ? propiedades 
    : propiedades.filter(p => p.propietarioEmail === userEmail);

  const handleAgregarPropiedad = () => {
    setModoEdicion(false);
    setPropiedadActual({
      id: 0,
      nombre: "",
      descripcion: "",
      imagen: "",
      precio: 0,
      direccion: "",
      propietarioEmail: userEmail
    });
    setShowModal(true);
  };

  const handleEditarPropiedad = (propiedad: Propiedad) => {
    if (userRole !== "ADMIN" && propiedad.propietarioEmail !== userEmail) {
      alert("No tienes permisos para editar esta propiedad");
      return;
    }
    setModoEdicion(true);
    setPropiedadActual(propiedad);
    setShowModal(true);
  };

  const handleEliminarPropiedad = (id: number) => {
    const propiedad = propiedades.find(p => p.id === id);
    
    if (userRole !== "ADMIN" && propiedad?.propietarioEmail !== userEmail) {
      alert("No tienes permisos para eliminar esta propiedad");
      return;
    }

    if (window.confirm("¿Estás seguro de eliminar esta propiedad?")) {
      setPropiedades(propiedades.filter(p => p.id !== id));
      alert("Propiedad eliminada exitosamente");
    }
  };

  const handleGuardarPropiedad = (e: React.FormEvent) => {
    e.preventDefault();

    if (!propiedadActual.nombre || !propiedadActual.direccion || propiedadActual.precio <= 0) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    if (modoEdicion) {
      setPropiedades(propiedades.map(p => 
        p.id === propiedadActual.id ? propiedadActual : p
      ));
      alert("Propiedad actualizada exitosamente");
    } else {
      const nuevaPropiedad = {
        ...propiedadActual,
        id: Math.max(...propiedades.map(p => p.id), 0) + 1,
        propietarioEmail: userEmail
      };
      setPropiedades([...propiedades, nuevaPropiedad]);
      alert("Propiedad agregada exitosamente");
    }

    setShowModal(false);
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPropiedadActual({
          ...propiedadActual,
          imagen: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">
          {userRole === "ADMIN" ? "Gestión de Propiedades (Administrador)" : "Mis Propiedades"}
        </h1>
        {/* El botón de agregar SOLO se muestra para PROPIETARIO */}
        {userRole === "PROPIETARIO" && (
          <button className="btn btn-success" onClick={handleAgregarPropiedad}>
            Agregar Propiedad
          </button>
        )}
      </div>

      {/* Mensaje informativo para ADMIN */}
      {userRole === "ADMIN" && (
        <div className="alert alert-info">
          <strong>Modo Administrador:</strong> Puedes ver y gestionar todas las propiedades del sistema.
        </div>
      )}

      {propiedadesFiltradas.length === 0 ? (
        <div className="alert alert-warning text-center">
          {userRole === "ADMIN" 
            ? "No hay propiedades en el sistema." 
            : "No tienes propiedades publicadas. ¡Agrega tu primera propiedad!"}
        </div>
      ) : (
        <div className="row g-4">
          {propiedadesFiltradas.map((propiedad) => (
            <div className="col-md-6 col-lg-4" key={propiedad.id}>
              <div className="card shadow-sm h-100">
                <img 
                  src={propiedad.imagen} 
                  className="card-img-top" 
                  alt={propiedad.nombre}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{propiedad.nombre}</h5>
                  <p className="card-text text-muted small">{propiedad.descripcion}</p>
                  <p className="fw-bold text-success">
                    ${propiedad.precio.toLocaleString('es-CL')}
                  </p>
                  <p className="text-muted small">{propiedad.direccion}</p>
                  
                  {/* ADMIN siempre ve el propietario */}
                  {userRole === "ADMIN" && (
                    <p className="text-muted small">
                      <strong>Propietario:</strong> {propiedad.propietarioEmail}
                    </p>
                  )}

                  <div className="mt-auto d-flex gap-2">
                    {/* ADMIN puede editar cualquier propiedad */}
                    {userRole === "ADMIN" && (
                      <button 
                        className="btn btn-warning btn-sm flex-fill"
                        onClick={() => handleEditarPropiedad(propiedad)}
                      >
                        Editar
                      </button>
                    )}
                    
                    {/* PROPIETARIO solo puede editar sus propias propiedades */}
                    {userRole === "PROPIETARIO" && propiedad.propietarioEmail === userEmail && (
                      <button 
                        className="btn btn-primary btn-sm flex-fill"
                        onClick={() => handleEditarPropiedad(propiedad)}
                      >
                        Editar
                      </button>
                    )}
                    
                    {/* Ambos pueden eliminar (con sus respectivas validaciones) */}
                    <button 
                      className="btn btn-danger btn-sm flex-fill"
                      onClick={() => handleEliminarPropiedad(propiedad.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de agregar/editar - Solo para PROPIETARIO o ADMIN editando */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.6)", position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modoEdicion ? "Editar Propiedad" : "Agregar Nueva Propiedad"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleGuardarPropiedad}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nombre de la Propiedad *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={propiedadActual.nombre}
                      onChange={(e) => setPropiedadActual({
                        ...propiedadActual,
                        nombre: e.target.value
                      })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Descripción</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={propiedadActual.descripcion}
                      onChange={(e) => setPropiedadActual({
                        ...propiedadActual,
                        descripcion: e.target.value
                      })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Dirección *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={propiedadActual.direccion}
                      onChange={(e) => setPropiedadActual({
                        ...propiedadActual,
                        direccion: e.target.value
                      })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Precio Mensual (CLP) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={propiedadActual.precio}
                      onChange={(e) => setPropiedadActual({
                        ...propiedadActual,
                        precio: Number(e.target.value)
                      })}
                      min="0"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Imagen Principal</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImagenChange}
                    />
                    {propiedadActual.imagen && (
                      <img 
                        src={propiedadActual.imagen} 
                        alt="Preview" 
                        className="mt-2"
                        style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success">
                    {modoEdicion ? "Guardar Cambios" : "Agregar Propiedad"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionPropiedades;