// ============================================
// TIPOS PARA SOLICITUDES DE ARRIENDO
// ============================================

export interface SolicitudArriendoDTO {
  id?: number;
  usuarioId: number;
  propiedadId: number;
  estado?: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA';
  fechaSolicitud?: string;
  usuario?: UsuarioDTO;
  propiedad?: PropiedadDTO;
}

export interface CrearSolicitudRequest {
  usuarioId: number;
  propiedadId: number;
}

// ============================================
// TIPOS PARA REGISTROS DE ARRIENDO
// ============================================

export interface RegistroArriendoDTO {
  id?: number;
  solicitudId: number;
  fechaInicio: string; // formato: "YYYY-MM-DD"
  fechaFin?: string; // formato: "YYYY-MM-DD"
  montoMensual: number;
  activo?: boolean;
  solicitud?: SolicitudArriendoDTO;
}

export interface CrearRegistroRequest {
  solicitudId: number;
  fechaInicio: string;
  fechaFin?: string;
  montoMensual: number;
}

// ============================================
// TIPOS PARA USUARIO (desde User Service)
// ============================================

export interface UsuarioDTO {
  id: number;
  pnombre: string;
  snombre?: string;
  papellido: string;
  email: string;
  ntelefono: string;
  rolId: number;
  rol?: {
    id: number;
    nombre: string;
  };
  estado?: {
    id: number;
    nombre: string;
  };
  duocVip?: boolean;
}

// ============================================
// TIPOS PARA PROPIEDAD (desde Property Service)
// ============================================

export interface PropiedadDTO {
  id: number;
  codigo: string;
  titulo: string;
  direccion: string;
  precioMensual: number;
  divisa: string;
  m2: number;
  nHabit: number;
  nBanos: number;
  petFriendly: boolean;
  tipoId: number;
  comunaId: number;
  fcreacion: string;
  tipo?: {
    id: number;
    nombre: string;
  };
  comuna?: {
    id: number;
    nombre: string;
  };
}

// ============================================
// TIPOS PARA RESPUESTAS DE ERROR
// ============================================

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  validationErrors?: Record<string, string>;
}

// ============================================
// TIPOS PARA FILTROS Y PARÁMETROS
// ============================================

export interface SolicitudFilters {
  usuarioId?: number;
  propiedadId?: number;
  estado?: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA';
  includeDetails?: boolean;
}

export interface RegistroFilters {
  solicitudId?: number;
  includeDetails?: boolean;
}
