import { API_CONFIG, COMMON_HEADERS, REQUEST_TIMEOUT } from './config';
import type {
  RegistroArriendoDTO,
  CrearRegistroRequest,
  ErrorResponse,
} from './types';

/**
 * Servicio para gestión de Registros de Arriendo
 * Conecta con Application Service en puerto 8084
 */
class RegistroService {
  private baseUrl = `${API_CONFIG.APPLICATION_SERVICE}/api/registros`;

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
   * Crea un nuevo registro de arriendo
   * @param registro - Datos del registro
   * @returns Promise con el registro creado
   */
  async crearRegistro(registro: CrearRegistroRequest): Promise<RegistroArriendoDTO> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: COMMON_HEADERS,
        body: JSON.stringify(registro),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<RegistroArriendoDTO>(response);
    } catch (error) {
      console.error('Error al crear registro:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los registros
   * @param includeDetails - Si incluir detalles de la solicitud
   * @returns Promise con array de registros
   */
  async listarRegistros(includeDetails: boolean = false): Promise<RegistroArriendoDTO[]> {
    try {
      const url = `${this.baseUrl}?includeDetails=${includeDetails}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: COMMON_HEADERS,
      });

      return this.handleResponse<RegistroArriendoDTO[]>(response);
    } catch (error) {
      console.error('Error al listar registros:', error);
      throw error;
    }
  }

  /**
   * Obtiene un registro por ID
   * @param id - ID del registro
   * @param includeDetails - Si incluir detalles de la solicitud
   * @returns Promise con el registro
   */
  async obtenerRegistroPorId(
    id: number,
    includeDetails: boolean = true
  ): Promise<RegistroArriendoDTO> {
    try {
      const url = `${this.baseUrl}/${id}?includeDetails=${includeDetails}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: COMMON_HEADERS,
      });

      return this.handleResponse<RegistroArriendoDTO>(response);
    } catch (error) {
      console.error(`Error al obtener registro ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene todos los registros de una solicitud
   * @param solicitudId - ID de la solicitud
   * @returns Promise con array de registros de la solicitud
   */
  async obtenerRegistrosPorSolicitud(solicitudId: number): Promise<RegistroArriendoDTO[]> {
    try {
      const url = `${this.baseUrl}/solicitud/${solicitudId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: COMMON_HEADERS,
      });

      return this.handleResponse<RegistroArriendoDTO[]>(response);
    } catch (error) {
      console.error(`Error al obtener registros de la solicitud ${solicitudId}:`, error);
      throw error;
    }
  }

  /**
   * Finaliza un registro (lo marca como inactivo)
   * @param id - ID del registro
   * @returns Promise con el registro finalizado
   */
  async finalizarRegistro(id: number): Promise<RegistroArriendoDTO> {
    try {
      const url = `${this.baseUrl}/${id}/finalizar`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: COMMON_HEADERS,
      });

      return this.handleResponse<RegistroArriendoDTO>(response);
    } catch (error) {
      console.error(`Error al finalizar registro ${id}:`, error);
      throw error;
    }
  }
}

// Exportar instancia única del servicio
export const registroService = new RegistroService();
