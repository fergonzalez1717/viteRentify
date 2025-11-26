import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(true);

  // Datos del usuario desde localStorage
  const [datosUsuario, setDatosUsuario] = useState({
    id: localStorage.getItem("userId") || "",
    email: localStorage.getItem("userEmail") || "",
    rol: localStorage.getItem("userRole") || "",
    pnombre: "Juan",
    snombre: "Carlos",
    papellido: "Pérez",
    rut: "12345678-9",
    telefono: "+56912345678",
    fnacimiento: "1995-05-15",
    direccion: "Av. Providencia 1234, Depto 501",
    duocVip: localStorage.getItem("userEmail")?.includes("@duoc.cl") || false,
    puntos: 0,
    codigoRef: "ABC123XYZ",
  });

  const [datosEditables, setDatosEditables] = useState({ ...datosUsuario });
  const [errores, setErrores] = useState<Record<string, string>>({});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para ver tu perfil");
      navigate("/login");
      return;
    }
    setTimeout(() => setLoading(false), 500);
  }, [navigate]);

  const validarCampos = (): boolean => {
    const nuevosErrores: Record<string, string> = {};

    if (!datosEditables.pnombre.trim()) {
      nuevosErrores.pnombre = "El nombre es obligatorio";
    }
    if (!datosEditables.papellido.trim()) {
      nuevosErrores.papellido = "El apellido es obligatorio";
    }
    if (!datosEditables.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
    } else if (!/^\+?56?\d{9}$/.test(datosEditables.telefono.replace(/\s/g, ""))) {
      nuevosErrores.telefono = "Formato de teléfono inválido";
    }
    if (!datosEditables.direccion.trim()) {
      nuevosErrores.direccion = "La dirección es obligatoria";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardarCambios = async () => {
    if (!validarCampos()) return;

    setLoading(true);
    try {
      console.log("Actualizando usuario:", datosEditables);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDatosUsuario({ ...datosEditables });
      setModoEdicion(false);
      alert("✅ Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("❌ Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setDatosEditables({ ...datosUsuario });
    setModoEdicion(false);
    setErrores({});
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando perfil...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Header del perfil */}
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center py-4">
              <div 
                className="rounded-circle bg-primary text-white mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: "120px", height: "120px", fontSize: "3rem" }}
              >
                {datosUsuario.pnombre.charAt(0)}{datosUsuario.papellido.charAt(0)}
              </div>
              <h2 className="mb-1">{datosUsuario.pnombre} {datosUsuario.snombre} {datosUsuario.papellido}</h2>
              <p className="text-muted mb-2">{datosUsuario.email}</p>
              <span className={`badge ${datosUsuario.rol === "ADMIN" ? "bg-danger" : datosUsuario.rol === "PROPIETARIO" ? "bg-success" : "bg-primary"}`}>
                {datosUsuario.rol}
              </span>
              {datosUsuario.duocVip && (
                <span className="badge bg-warning text-dark ms-2">🎓 DuocUC VIP</span>
              )}
            </div>
          </div>

          {/* Puntos y código de referido */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="text-muted mb-2">RentifyPoints</h5>
                  <h2 className="text-primary mb-0">{datosUsuario.puntos}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="text-muted mb-2">Código de Referido</h5>
                  <h4 className="text-success mb-0">{datosUsuario.codigoRef}</h4>
                  <small className="text-muted">Comparte y gana puntos</small>
                </div>
              </div>
            </div>
          </div>

          {/* Información del perfil */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Información Personal</h5>
              {!modoEdicion && (
                <button 
                  className="btn btn-light btn-sm"
                  onClick={() => setModoEdicion(true)}
                >
                  Editar
                </button>
              )}
            </div>
            <div className="card-body">
              {!modoEdicion ? (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Primer Nombre</label>
                    <p className="form-control-plaintext">{datosUsuario.pnombre}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Segundo Nombre</label>
                    <p className="form-control-plaintext">{datosUsuario.snombre || "N/A"}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Apellido</label>
                    <p className="form-control-plaintext">{datosUsuario.papellido}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">RUT</label>
                    <p className="form-control-plaintext">{datosUsuario.rut}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Fecha de Nacimiento</label>
                    <p className="form-control-plaintext">
                      {new Date(datosUsuario.fnacimiento).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Teléfono</label>
                    <p className="form-control-plaintext">{datosUsuario.telefono}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold text-muted">Dirección</label>
                    <p className="form-control-plaintext">{datosUsuario.direccion}</p>
                  </div>
                </div>
              ) : (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Primer Nombre *</label>
                    <input
                      type="text"
                      className={`form-control ${errores.pnombre ? "is-invalid" : ""}`}
                      value={datosEditables.pnombre}
                      onChange={(e) => setDatosEditables({ ...datosEditables, pnombre: e.target.value })}
                    />
                    {errores.pnombre && <div className="invalid-feedback">{errores.pnombre}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Segundo Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={datosEditables.snombre}
                      onChange={(e) => setDatosEditables({ ...datosEditables, snombre: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Apellido *</label>
                    <input
                      type="text"
                      className={`form-control ${errores.papellido ? "is-invalid" : ""}`}
                      value={datosEditables.papellido}
                      onChange={(e) => setDatosEditables({ ...datosEditables, papellido: e.target.value })}
                    />
                    {errores.papellido && <div className="invalid-feedback">{errores.papellido}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Teléfono *</label>
                    <input
                      type="tel"
                      className={`form-control ${errores.telefono ? "is-invalid" : ""}`}
                      value={datosEditables.telefono}
                      onChange={(e) => setDatosEditables({ ...datosEditables, telefono: e.target.value })}
                    />
                    {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">Dirección *</label>
                    <input
                      type="text"
                      className={`form-control ${errores.direccion ? "is-invalid" : ""}`}
                      value={datosEditables.direccion}
                      onChange={(e) => setDatosEditables({ ...datosEditables, direccion: e.target.value })}
                    />
                    {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                  </div>
                  <div className="col-12">
                    <div className="d-flex gap-2 mt-3">
                      <button 
                        type="button" 
                        className="btn btn-secondary flex-fill"
                        onClick={handleCancelar}
                        disabled={loading}
                      >
                        Cancelar
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-primary flex-fill"
                        onClick={handleGuardarCambios}
                        disabled={loading}
                      >
                        {loading ? "Guardando..." : "Guardar Cambios"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Documentos */}
          <div className="card shadow-sm mt-4 mb-4">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">📄 Mis Documentos</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <strong>Estado de tus documentos:</strong>
                <ul className="mb-0 mt-2">
                  <li>✅ DNI - Aprobado</li>
                  <li>✅ Liquidación de Sueldo - Aprobado</li>
                  <li>⏳ Certificado de Antecedentes - En revisión</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;