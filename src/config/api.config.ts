// src/config/api.config.ts

/**
 * Configuração da API Backend
 * 
 * IMPORTANTE: Antes de usar, configure a URL correta:
 * - Desenvolvimento local: http://localhost:8080/api
 * - Produção: URL do deploy (Render, Railway, etc)
 */

// URL base da API - CONFIGURE AQUI!
export const API_BASE_URL = 'http://localhost:8080/api';

// Timeout padrão para requisições (em ms)
export const API_TIMEOUT = 30000;

// Headers padrão
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

/**
 * Helper para fazer requisições HTTP
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Se não for OK, lança erro com mensagem
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Erro na requisição: ${response.status}`
      );
    }

    // Se for 204 No Content, retorna objeto vazio
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao chamar ${endpoint}:`, error);
    throw error;
  }
}
