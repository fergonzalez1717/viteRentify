/**
 * User Service API
 * Maneja autenticación y gestión de usuarios
 */

import API_CONFIG from '../config/apiConfig';
import type { UsuarioDTO, LoginRequest, LoginResponse,RolDTO,EstadoUsuarioDTO } from '../types';

const BASE_URL = API_CONFIG.USER_SERVICE;

/**
 * Manejo centralizado de errores
 */
const handleError = (error: any, operation: string): never => {
  console.error(`Error en ${operation}:`, error);
  
  if (error.response) {
    throw new Error(error.response.data?.message || `Error del servidor: ${error.response.status}`);
  } else if (error.request) {
    throw new Error('No se pudo conectar con el servidor. Verifica que el User Service esté corriendo en puerto 8081');
  } else {
    throw new Error(error.message || 'Error desconocido');
  }
};

/**
 * Usuario Service
 */
export const userService = {
  /**
   * Login de usuario
   * @param credentials - Email y contraseña
   * @returns LoginResponse con información del usuario
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('🔐 Intentando login con:', credentials.email);
      
      const response = await fetch(`${BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Credenciales inválidas');
      }

      const data: LoginResponse = await response.json();
      console.log('Login exitoso:', data);
      
      return data;
    } catch (error: any) {
      return handleError(error, 'login');
    }
  },

  /**
   * Obtener usuario por ID
   */
  async obtenerPorId(id: number, includeDetails: boolean = false): Promise<UsuarioDTO> {
    try {
      const url = `${BASE_URL}/usuarios/${id}${includeDetails ? '?includeDetails=true' : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Usuario no encontrado`);
      }

      return await response.json();
    } catch (error: any) {
      return handleError(error, `obtenerUsuarioPorId(${id})`);
    }
  },

  /**
   * Verificar si existe un usuario por ID
   */
  async existe(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/usuarios/${id}/existe`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        return false;
      }

      return await response.json();
    } catch (error: any) {
      console.warn(`⚠️ Error verificando existencia de usuario ${id}:`, error);
      return false;
    }
  },

  
};

/**
 * Servicio de Roles
 */
export const rolService = {
  /**
   * Listar todos los roles
   */
  async listar(): Promise<RolDTO[]> {
    try {
      const response = await fetch(`${BASE_URL}/roles`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron obtener los roles`);
      }

      return await response.json();
    } catch (error: any) {
      return handleError(error, 'listarRoles');
    }
  },

  /**
   * Obtener rol por ID
   */
  async obtenerPorId(id: number): Promise<RolDTO> {
    try {
      const response = await fetch(`${BASE_URL}/roles/${id}`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Rol no encontrado`);
      }

      return await response.json();
    } catch (error: any) {
      return handleError(error, `obtenerRolPorId(${id})`);
    }
  },
};

/**
 * Servicio de Estados de Usuario
 */
export const estadoUsuarioService = {
  /**
   * Listar todos los estados
   */
  async listar(): Promise<EstadoUsuarioDTO[]> {
    try {
      const response = await fetch(`${BASE_URL}/estados`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron obtener los estados`);
      }

      return await response.json();
    } catch (error: any) {
      return handleError(error, 'listarEstadosUsuario');
    }
  },

  /**
   * Obtener estado por ID
   */
  async obtenerPorId(id: number): Promise<EstadoUsuarioDTO> {
    try {
      const response = await fetch(`${BASE_URL}/estados/${id}`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Estado no encontrado`);
      }

      return await response.json();
    } catch (error: any) {
      return handleError(error, `obtenerEstadoPorId(${id})`);
    }
  },
};

export default userService;
