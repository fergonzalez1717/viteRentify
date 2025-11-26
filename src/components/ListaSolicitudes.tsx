import React, { useEffect, useState } from 'react';
import { useSolicitudes } from '../hooks';

/**
 * Componente de ejemplo para listar solicitudes de arriendo
 * Integrado con el microservicio Application Service
 */
export const ListaSolicitudes: React.FC = () => {
  const {
    solicitudes,
    loading,
    error,
    cargarSolicitudes,
    actualizarEstado,
  } = useSolicitudes();

  const [incluirDetalles, setIncluirDetalles] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<string>('TODAS');

  useEffect(() => {
    cargarSolicitudes(incluirDetalles);
  }, [incluirDetalles]);

  const handleActualizarEstado = async (
    id: number,
    estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA'
  ) => {
    const confirmar = window.confirm(
      `¿Está seguro de cambiar el estado a ${estado}?`
    );
    if (confirmar) {
      await actualizarEstado(id, estado);
    }
  };

  const solicitudesFiltradas =
    filtroEstado === 'TODAS'
      ? solicitudes
      : solicitudes.filter((s) => s.estado === filtroEstado);

  const getEstadoBadge = (estado?: string) => {
    switch (estado) {
      case 'PENDIENTE':
        return 'bg-warning text-dark';
      case 'ACEPTADA':
        return 'bg-success';
      case 'RECHAZADA':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Solicitudes de Arriendo</h3>
              <button
                className="btn btn-light btn-sm"
                onClick={() => cargarSolicitudes(incluirDetalles)}
                disabled={loading}
              >
                🔄 Recargar
              </button>
            </div>
            <div className="card-body">
              {/* Controles */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="incluirDetalles"
                      checked={incluirDetalles}
                      onChange={(e) => setIncluirDetalles(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="incluirDetalles">
                      Incluir detalles de usuario y propiedad
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                  >
                    <option value="TODAS">Todas las solicitudes</option>
                    <option value="PENDIENTE">Pendientes</option>
                    <option value="ACEPTADA">Aceptadas</option>
                    <option value="RECHAZADA">Rechazadas</option>
                  </select>
                </div>
              </div>

              {/* Mensajes de error o loading */}
              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-2">Cargando solicitudes...</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  <strong>Error:</strong> {error}
                </div>
              )}

              {/* Tabla de solicitudes */}
              {!loading && !error && (
                <>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Usuario</th>
                          <th>Propiedad</th>
                          <th>Estado</th>
                          <th>Fecha</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {solicitudesFiltradas.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center py-4">
                              No se encontraron solicitudes
                            </td>
                          </tr>
                        ) : (
                          solicitudesFiltradas.map((solicitud) => (
                            <tr key={solicitud.id}>
                              <td>#{solicitud.id}</td>
                              <td>
                                {incluirDetalles && solicitud.usuario ? (
                                  <>
                                    <strong>
                                      {solicitud.usuario.pnombre}{' '}
                                      {solicitud.usuario.papellido}
                                    </strong>
                                    <br />
                                    <small className="text-muted">
                                      {solicitud.usuario.email}
                                    </small>
                                  </>
                                ) : (
                                  `Usuario #${solicitud.usuarioId}`
                                )}
                              </td>
                              <td>
                                {incluirDetalles && solicitud.propiedad ? (
                                  <>
                                    <strong>{solicitud.propiedad.titulo}</strong>
                                    <br />
                                    <small className="text-muted">
                                      ${solicitud.propiedad.precioMensual.toLocaleString()} /mes
                                    </small>
                                  </>
                                ) : (
                                  `Propiedad #${solicitud.propiedadId}`
                                )}
                              </td>
                              <td>
                                <span
                                  className={`badge ${getEstadoBadge(
                                    solicitud.estado
                                  )}`}
                                >
                                  {solicitud.estado}
                                </span>
                              </td>
                              <td>
                                {solicitud.fechaSolicitud
                                  ? new Date(
                                      solicitud.fechaSolicitud
                                    ).toLocaleDateString('es-CL')
                                  : 'N/A'}
                              </td>
                              <td>
                                {solicitud.estado === 'PENDIENTE' && (
                                  <div className="btn-group btn-group-sm">
                                    <button
                                      className="btn btn-success"
                                      onClick={() =>
                                        handleActualizarEstado(
                                          solicitud.id!,
                                          'ACEPTADA'
                                        )
                                      }
                                    >
                                      ✓ Aceptar
                                    </button>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() =>
                                        handleActualizarEstado(
                                          solicitud.id!,
                                          'RECHAZADA'
                                        )
                                      }
                                    >
                                      ✗ Rechazar
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Estadísticas */}
                  <div className="mt-3 p-3 bg-light rounded">
                    <div className="row text-center">
                      <div className="col-md-4">
                        <h5>
                          {solicitudes.filter((s) => s.estado === 'PENDIENTE').length}
                        </h5>
                        <small className="text-muted">Pendientes</small>
                      </div>
                      <div className="col-md-4">
                        <h5>
                          {solicitudes.filter((s) => s.estado === 'ACEPTADA').length}
                        </h5>
                        <small className="text-muted">Aceptadas</small>
                      </div>
                      <div className="col-md-4">
                        <h5>
                          {solicitudes.filter((s) => s.estado === 'RECHAZADA').length}
                        </h5>
                        <small className="text-muted">Rechazadas</small>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
