import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios";
import { useDocumentos } from "../hooks/useDocumentos";
import type { UsuarioDTO, DocumentoDTO } from "../types";

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const { obtenerUsuarioActual } = useUsuarios();
  const { obtenerDocumentosUsuario, subirDocumento } = useDocumentos();
  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<UsuarioDTO | null>(null);
  const [documentos, setDocumentos] = useState<DocumentoDTO[]>([]);
  const [errores, setErrores] = useState<Record<string, string>>({});
  
  // Estado para edición
  const [datosEditables, setDatosEditables] = useState({
    pnombre: "",
    snombre: "",
    papellido: "",
    ntelefono: "",
  });

  // Cargar datos del usuario y documentos al montar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
          alert("Debes iniciar sesión para ver tu perfil");
          navigate("/login");
          return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("No se pudo obtener tu información de usuario");
          navigate("/login");
          return;
        }

        console.log("🔄 Cargando datos del usuario...");
        
        // Obtener datos del usuario desde User Service
        const usuarioData = await obtenerUsuarioActual();
        
        if (!usuarioData) {
          alert("No se pudo cargar tu perfil");
          navigate("/login");
          return;
        }

        setUsuario(usuarioData);
        setDatosEditables({
          pnombre: usuarioData.pnombre,
          snombre: usuarioData.snombre || "",
          papellido: usuarioData.papellido,
          ntelefono: usuarioData.ntelefono,
        });

        // Obtener documentos del usuario desde Document Service
        console.log("📄 Cargando documentos del usuario...");
        const docsData = await obtenerDocumentosUsuario(parseInt(userId), true);
        setDocumentos(docsData);

        console.log("✅ Datos cargados:", {
          usuario: `${usuarioData.pnombre} ${usuarioData.papellido}`,
          documentos: docsData.length
        });

      } catch (error) {
        console.error("❌ Error al cargar datos:", error);
        alert("Error al cargar tu perfil. Por favor intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [navigate]);

  const validarCampos = (): boolean => {
    const nuevosErrores: Record<string, string> = {};

    if (!datosEditables.pnombre.trim()) {
      nuevosErrores.pnombre = "El nombre es obligatorio";
    }
    if (!datosEditables.papellido.trim()) {
      nuevosErrores.papellido = "El apellido es obligatorio";
    }
    if (!datosEditables.ntelefono.trim()) {
      nuevosErrores.ntelefono = "El teléfono es obligatorio";
    } else if (!/^\+?56?\d{9}$/.test(datosEditables.ntelefono.replace(/\s/g, ""))) {
      nuevosErrores.ntelefono = "Formato de teléfono inválido (+56912345678)";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardarCambios = async () => {
    if (!validarCampos()) return;

    setLoading(true);
    try {
      console.log("💾 Actualizando perfil:", datosEditables);
      
      // TODO: Implementar endpoint de actualización en User Service
      // Por ahora simulamos la actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar estado local
      if (usuario) {
        setUsuario({
          ...usuario,
          ...datosEditables
        });
      }
      
      setModoEdicion(false);
      alert("✅ Perfil actualizado exitosamente");
    } catch (error) {
      console.error("❌ Error al actualizar perfil:", error);
      alert("❌ Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    if (usuario) {
      setDatosEditables({
        pnombre: usuario.pnombre,
        snombre: usuario.snombre || "",
        papellido: usuario.papellido,
        ntelefono: usuario.ntelefono,
      });
    }
    setModoEdicion(false);
    setErrores({});
  };

  const getEstadoDocumento = (estadoId: number): { texto: string; badge: string; icono: string } => {
    switch (estadoId) {
      case 1: // PENDIENTE
        return { texto: "Pendiente", badge: "bg-warning", icono: "⏳" };
      case 2: // ACEPTADO
        return { texto: "Aprobado", badge: "bg-success", icono: "✅" };
      case 3: // RECHAZADO
        return { texto: "Rechazado", badge: "bg-danger", icono: "❌" };
      case 4: // EN_REVISION
        return { texto: "En Revisión", badge: "bg-info", icono: "🔍" };
      default:
        return { texto: "Desconocido", badge: "bg-secondary", icono: "❓" };
    }
  };

  const getTipoDocumento = (tipoDocId: number): string => {
    const tipos: Record<number, string> = {
      1: "DNI / Cédula",
      2: "Pasaporte",
      3: "Liquidación de Sueldo",
      4: "Certificado de Antecedentes",
      5: "Certificado AFP",
      6: "Contrato de Trabajo"
    };
    return tipos[tipoDocId] || "Documento";
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando perfil...</span>
        </div>
        <p className="mt-3">Cargando tu información...</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          No se pudo cargar tu perfil. Por favor intenta de nuevo.
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
                {usuario.pnombre.charAt(0)}{usuario.papellido.charAt(0)}
              </div>
              <h2 className="mb-1">
                {usuario.pnombre} {usuario.snombre} {usuario.papellido}
              </h2>
              <p className="text-muted mb-2">{usuario.email}</p>
              
              {/* Badge de rol */}
              <span className={`badge ${
                usuario.rolId === 1 ? "bg-danger" : 
                usuario.rolId === 2 ? "bg-success" : 
                "bg-primary"
              }`}>
                {usuario.rol?.nombre || (
                  usuario.rolId === 1 ? "ADMIN" :
                  usuario.rolId === 2 ? "PROPIETARIO" :
                  "ARRIENDATARIO"
                )}
              </span>
              
              {/* Badge DuocUC VIP */}
              {usuario.duocVip && (
                <span className="badge bg-warning text-dark ms-2">
                  🎓 DuocUC VIP (20% descuento)
                </span>
              )}
              
              {/* Estado de cuenta */}
              <span className={`badge ms-2 ${
                usuario.estadoId === 1 ? "bg-success" : "bg-danger"
              }`}>
                {usuario.estado?.nombre || (usuario.estadoId === 1 ? "ACTIVO" : "INACTIVO")}
              </span>
            </div>
          </div>

          {/* Puntos y código de referido */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="text-muted mb-2">RentifyPoints</h5>
                  <h2 className="text-primary mb-0">{usuario.puntos}</h2>
                  <small className="text-muted">Acumula puntos y obtén descuentos</small>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="text-muted mb-2">Código de Referido</h5>
                  <h4 className="text-success mb-0">{usuario.codigoRef}</h4>
                  <small className="text-muted">Comparte y gana puntos</small>
                </div>
              </div>
            </div>
          </div>

          {/* Información del perfil */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">📋 Información Personal</h5>
              {!modoEdicion && (
                <button 
                  className="btn btn-light btn-sm"
                  onClick={() => setModoEdicion(true)}
                >
                  ✏️ Editar
                </button>
              )}
            </div>
            <div className="card-body">
              {!modoEdicion ? (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Primer Nombre</label>
                    <p className="form-control-plaintext">{usuario.pnombre}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Segundo Nombre</label>
                    <p className="form-control-plaintext">{usuario.snombre || "N/A"}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Apellido</label>
                    <p className="form-control-plaintext">{usuario.papellido}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">RUT</label>
                    <p className="form-control-plaintext">{usuario.rut}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Fecha de Nacimiento</label>
                    <p className="form-control-plaintext">
                      {new Date(usuario.fnacimiento).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Teléfono</label>
                    <p className="form-control-plaintext">{usuario.ntelefono}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Fecha de Registro</label>
                    <p className="form-control-plaintext">
                      {new Date(usuario.fcreacion).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted">Última Actualización</label>
                    <p className="form-control-plaintext">
                      {new Date(usuario.factualizacion).toLocaleDateString('es-CL')}
                    </p>
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
                      className={`form-control ${errores.ntelefono ? "is-invalid" : ""}`}
                      value={datosEditables.ntelefono}
                      onChange={(e) => setDatosEditables({ ...datosEditables, ntelefono: e.target.value })}
                      placeholder="+56912345678"
                    />
                    {errores.ntelefono && <div className="invalid-feedback">{errores.ntelefono}</div>}
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
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">📄 Mis Documentos</h5>
              <button 
                className="btn btn-light btn-sm"
                onClick={() => navigate("/registro")}
              >
                ➕ Subir Documento
              </button>
            </div>
            <div className="card-body">
              {documentos.length === 0 ? (
                <div className="alert alert-warning">
                  <strong>⚠️ No tienes documentos cargados</strong>
                  <p className="mb-0 mt-2">
                    Para poder postular a inmuebles, debes subir al menos:
                  </p>
                  <ul className="mt-2">
                    <li>DNI o Cédula de Identidad</li>
                    <li>Liquidación de Sueldo</li>
                    <li>Certificado de Antecedentes</li>
                  </ul>
                </div>
              ) : (
                <>
                  <div className="alert alert-info mb-3">
                    <strong>ℹ️ Estado de tus documentos:</strong>
                    <ul className="mb-0 mt-2">
                      <li>
                        <span className="badge bg-success">Aprobados:</span> {documentos.filter(d => d.estadoId === 2).length}
                      </li>
                      <li>
                        <span className="badge bg-warning">Pendientes:</span> {documentos.filter(d => d.estadoId === 1).length}
                      </li>
                      <li>
                        <span className="badge bg-danger">Rechazados:</span> {documentos.filter(d => d.estadoId === 3).length}
                      </li>
                    </ul>
                  </div>

                  <div className="list-group">
                    {documentos.map((doc) => {
                      const estado = getEstadoDocumento(doc.estadoId);
                      return (
                        <div key={doc.id} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">
                                {estado.icono} {getTipoDocumento(doc.tipoDocId)}
                              </h6>
                              <small className="text-muted">
                                📎 {doc.nombre}
                              </small>
                              <br />
                              <small className="text-muted">
                                📅 Subido: {new Date(doc.fechaSubido).toLocaleDateString('es-CL')}
                              </small>
                            </div>
                            <span className={`badge ${estado.badge}`}>
                              {estado.texto}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {documentos.filter(d => d.estadoId === 2).length === 0 && (
                    <div className="alert alert-warning mt-3">
                      <strong>⚠️ Acción requerida:</strong> Necesitas al menos un documento aprobado para poder postular a inmuebles.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;