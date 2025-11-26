// Configuración de URLs de los microservicios
export const API_CONFIG = {
  APPLICATION_SERVICE: 'http://localhost:8084',
  USER_SERVICE: 'http://localhost:8081',
  PROPERTY_SERVICE: 'http://localhost:8082',
  DOCUMENT_SERVICE: 'http://localhost:8083',
  CONTACT_SERVICE: 'http://localhost:8085',
  REVIEW_SERVICE: 'http://localhost:8086',
};

// Timeout para las peticiones (en ms)
export const REQUEST_TIMEOUT = 10000;

// Headers comunes
export const COMMON_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
