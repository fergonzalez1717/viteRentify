import { API_CONFIG, COMMON_HEADERS, REQUEST_TIMEOUT } from './config';
import type {
  SolicitudArriendoDTO,
  CrearSolicitudRequest,
  ErrorResponse,
} from './types';

/**
 * Servicio para gestión de Solicitudes de Arriendo
 * Conecta con Application Service en puerto 8084
 */
class SolicitudService {
  private baseUrl = `${API_CONFIG.APPLICATION_SERVICE}/api/solicitudes`;

  /**
   * Maneja errores de las peticiones HTTP
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || 'Error en la petición');
    }
    return response.json();
  }

  /**
   * Crea una nueva solicitud de arriendo
   * @param solicitud - Datos de la solicitud (usuarioId, propiedadId)
   * @returns Promise con la solicitud creada
   */
  async crearSolicitud(solicitud: CrearSolicitudRequest): Promise<SolicitudArriendoDTO> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: COMMON_HEADERS,
        body: JSON.stringify(solicitud),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<SolicitudArriendoDTO>(response);
    } catch (error) {
      console.error('Error al crear solicitud:', error);
      throw error;
    }
  }

  /**
   * Obtiene todas las solicitudes
   * @param includeDetails - Si incluir detalles de usuario y propiedad
   * @returns Promise con array de solicitudes
   */
  async listarSolicitudes(includeDetails: boolean = false): Promise<SolicitudArriendoDTO[]> {
    try {
      const url = `${this.baseUrl}?includeDetails=${includeDetails}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: COMMON_HEADERS,
      });

      return this.handleResponse<SolicitudArriendoDTO[]>(response);
    } catch (error) {
      console.error('Error al listar solicitudes:', error);
      throw error;
    }
  }

  /**
   * Obtiene una solicitud por ID
   * @param id - ID de la solicitud
   * @param includeDetails - Si incluir detalles de usuario y propiedad
   * @returns Promise con la solicitud
   */
  async obtenerSolicitudPorId(
    id: number,
    includeDetails: boolean = true
  ): Promise<SolicitudArriendoDTO> {
    try {
      const url = `${this.baseUrl}/${id}?includeDetails=${includeDetails}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: COMMON_HEADERS,
      });

      return this.handleResponse<SolicitudArriendoDTO>(response);
    } catch (error) {
      console.error(`Error al obtener solicitud ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene todas las solicitudes de un usuario
   * @param usuarioId - ID del usuario
   * @returns Promise con array de solicitudes del usuario
   */
  async obtenerSolicitudesPorUsuario(usuarioId: number): Promise<SolicitudArriendoDTO[]> {
    try {
      const url = `${this.baseUrl}/usuario/${usuarioId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: COMMON_HEADERS,
      });

      return this.handleResponse<SolicitudArriendoDTO[]>(response);
    } catch (error) {
      console.error(`Error al obtener solicitudes del usuario ${usuarioId}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene todas las solicitudes para una propiedad
   * @param propiedadId - ID de la propiedad
   * @returns Promise con array de solicitudes de la propiedad
   */
  async obtenerSolicitudesPorPropiedad(propiedadId: number): Promise<SolicitudArriendoDTO[]> {
    try {
      const url = `${this.baseUrl}/propiedad/${propiedadId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: COMMON_HEADERS,
      });

      return this.handleResponse<SolicitudArriendoDTO[]>(response);
    } catch (error) {
      console.error(`Error al obtener solicitudes de la propiedad ${propiedadId}:`, error);
      throw error;
    }
  }

  /**
   * Actualiza el estado de una solicitud
   * @param id - ID de la solicitud
   * @param estado - Nuevo estado (PENDIENTE, ACEPTADA, RECHAZADA)
   * @returns Promise con la solicitud actualizada
   */
  async actualizarEstado(
    id: number,
    estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA'
  ): Promise<SolicitudArriendoDTO> {
    try {
      const url = `${this.baseUrl}/${id}/estado?estado=${estado}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: COMMON_HEADERS,
      });

      return this.handleResponse<SolicitudArriendoDTO>(response);
    } catch (error) {
      console.error(`Error al actualizar estado de solicitud ${id}:`, error);
      throw error;
    }
  }
}

// Exportar instancia única del servicio
export const solicitudService = new SolicitudService();
