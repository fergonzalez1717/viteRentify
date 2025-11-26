import { useState, useEffect } from 'react';
import { solicitudService } from '../api';
import type { SolicitudArriendoDTO, CrearSolicitudRequest } from '../api';

/**
 * Hook personalizado para gestión de solicitudes de arriendo
 */
export const useSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudArriendoDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga todas las solicitudes
   */
  const cargarSolicitudes = async (includeDetails: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await solicitudService.listarSolicitudes(includeDetails);
      setSolicitudes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar solicitudes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crea una nueva solicitud
   */
  const crearSolicitud = async (solicitud: CrearSolicitudRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const nuevaSolicitud = await solicitudService.crearSolicitud(solicitud);
      setSolicitudes((prev) => [...prev, nuevaSolicitud]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear solicitud');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualiza el estado de una solicitud
   */
  const actualizarEstado = async (
    id: number,
    estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA'
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const actualizada = await solicitudService.actualizarEstado(id, estado);
      setSolicitudes((prev) =>
        prev.map((s) => (s.id === id ? actualizada : s))
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar solicitud');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene solicitudes de un usuario específico
   */
  const cargarSolicitudesPorUsuario = async (usuarioId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await solicitudService.obtenerSolicitudesPorUsuario(usuarioId);
      setSolicitudes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar solicitudes del usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene solicitudes de una propiedad específica
   */
  const cargarSolicitudesPorPropiedad = async (propiedadId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await solicitudService.obtenerSolicitudesPorPropiedad(propiedadId);
      setSolicitudes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar solicitudes de la propiedad');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    solicitudes,
    loading,
    error,
    cargarSolicitudes,
    crearSolicitud,
    actualizarEstado,
    cargarSolicitudesPorUsuario,
    cargarSolicitudesPorPropiedad,
  };
};

/**
 * Hook para obtener una solicitud específica
 */
export const useSolicitud = (id: number | null, includeDetails: boolean = true) => {
  const [solicitud, setSolicitud] = useState<SolicitudArriendoDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) return;

    const cargarSolicitud = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await solicitudService.obtenerSolicitudPorId(id, includeDetails);
        setSolicitud(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar solicitud');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarSolicitud();
  }, [id, includeDetails]);

  return { solicitud, loading, error };
};
