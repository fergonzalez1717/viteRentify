import { useState, useEffect } from 'react';
import { registroService } from '../api';
import type { RegistroArriendoDTO, CrearRegistroRequest } from '../api';

/**
 * Hook personalizado para gestión de registros de arriendo
 */
export const useRegistros = () => {
  const [registros, setRegistros] = useState<RegistroArriendoDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga todos los registros
   */
  const cargarRegistros = async (includeDetails: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registroService.listarRegistros(includeDetails);
      setRegistros(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar registros');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crea un nuevo registro
   */
  const crearRegistro = async (registro: CrearRegistroRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const nuevoRegistro = await registroService.crearRegistro(registro);
      setRegistros((prev) => [...prev, nuevoRegistro]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear registro');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Finaliza un registro (lo marca como inactivo)
   */
  const finalizarRegistro = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const actualizado = await registroService.finalizarRegistro(id);
      setRegistros((prev) =>
        prev.map((r) => (r.id === id ? actualizado : r))
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al finalizar registro');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene registros de una solicitud específica
   */
  const cargarRegistrosPorSolicitud = async (solicitudId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registroService.obtenerRegistrosPorSolicitud(solicitudId);
      setRegistros(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar registros de la solicitud');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    registros,
    loading,
    error,
    cargarRegistros,
    crearRegistro,
    finalizarRegistro,
    cargarRegistrosPorSolicitud,
  };
};

/**
 * Hook para obtener un registro específico
 */
export const useRegistro = (id: number | null, includeDetails: boolean = true) => {
  const [registro, setRegistro] = useState<RegistroArriendoDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) return;

    const cargarRegistro = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await registroService.obtenerRegistroPorId(id, includeDetails);
        setRegistro(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar registro');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarRegistro();
  }, [id, includeDetails]);

  return { registro, loading, error };
};
