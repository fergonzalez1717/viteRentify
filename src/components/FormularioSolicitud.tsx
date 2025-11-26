import React, { useState } from 'react';
import { useSolicitudes } from '../hooks';
import type { CrearSolicitudRequest } from '../api';

/**
 * Componente de ejemplo para crear solicitudes de arriendo
 * Integrado con el microservicio Application Service
 */
export const FormularioSolicitud: React.FC = () => {
  const { crearSolicitud, loading, error } = useSolicitudes();
  
  const [formData, setFormData] = useState<CrearSolicitudRequest>({
    usuarioId: 0,
    propiedadId: 0,
  });

  const [mensaje, setMensaje] = useState<string>('');
  const [tipoMensaje, setTipoMensaje] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');

    // Validaciones básicas
    if (formData.usuarioId <= 0) {
      setMensaje('Por favor, ingrese un ID de usuario válido');
      setTipoMensaje('error');
      return;
    }

    if (formData.propiedadId <= 0) {
      setMensaje('Por favor, ingrese un ID de propiedad válido');
      setTipoMensaje('error');
      return;
    }

    // Crear solicitud
    const success = await crearSolicitud(formData);

    if (success) {
      setMensaje('¡Solicitud creada exitosamente!');
      setTipoMensaje('success');
      // Resetear formulario
      setFormData({ usuarioId: 0, propiedadId: 0 });
    } else {
      setMensaje(error || 'Error al crear la solicitud');
      setTipoMensaje('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Nueva Solicitud de Arriendo</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="usuarioId" className="form-label">
                    ID Usuario
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="usuarioId"
                    name="usuarioId"
                    value={formData.usuarioId || ''}
                    onChange={handleChange}
                    placeholder="Ingrese el ID del usuario"
                    required
                    min="1"
                  />
                  <small className="form-text text-muted">
                    ID del usuario que solicita el arriendo
                  </small>
                </div>

                <div className="mb-3">
                  <label htmlFor="propiedadId" className="form-label">
                    ID Propiedad
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="propiedadId"
                    name="propiedadId"
                    value={formData.propiedadId || ''}
                    onChange={handleChange}
                    placeholder="Ingrese el ID de la propiedad"
                    required
                    min="1"
                  />
                  <small className="form-text text-muted">
                    ID de la propiedad que desea arrendar
                  </small>
                </div>

                {mensaje && (
                  <div
                    className={`alert ${
                      tipoMensaje === 'success' ? 'alert-success' : 'alert-danger'
                    } alert-dismissible fade show`}
                    role="alert"
                  >
                    {mensaje}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setMensaje('')}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Enviando...
                      </>
                    ) : (
                      'Crear Solicitud'
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="fw-bold">⚠️ Validaciones del Sistema:</h6>
                <ul className="mb-0 small">
                  <li>El usuario debe tener rol ARRIENDATARIO (rolId = 3)</li>
                  <li>Máximo 3 solicitudes activas por usuario</li>
                  <li>No se permiten solicitudes duplicadas para la misma propiedad</li>
                  <li>El usuario debe tener documentos aprobados</li>
                  <li>La propiedad debe estar disponible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
