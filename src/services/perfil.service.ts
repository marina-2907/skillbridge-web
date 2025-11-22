// src/services/perfil.service.ts

import { fetchAPI } from '../config/api.config';
import type { PerfilDTO } from '../types/api.types';

/**
 * Serviço para gerenciar perfil profissional
 */
export const perfilService = {
  /**
   * Buscar perfil do usuário
   */
  async buscar(usuarioId: number): Promise<PerfilDTO> {
    return fetchAPI<PerfilDTO>(`/usuarios/${usuarioId}/perfil`, {
      method: 'GET',
    });
  },

  /**
   * Criar perfil
   */
  async criar(usuarioId: number, dados: PerfilDTO): Promise<PerfilDTO> {
    return fetchAPI<PerfilDTO>(`/usuarios/${usuarioId}/perfil`, {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Atualizar perfil
   */
  async atualizar(usuarioId: number, dados: PerfilDTO): Promise<PerfilDTO> {
    return fetchAPI<PerfilDTO>(`/usuarios/${usuarioId}/perfil`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },
};

/**
 * Exemplo de uso:
 * 
 * const perfil = await perfilService.atualizar(1, {
 *   objetivoCarreira: "Desenvolvedor Full Stack",
 *   nivelExperiencia: "INTERMEDIARIO",
 *   tempoDisponivelSemanal: 15,
 *   idade: 28,
 *   areaAtuacao: "Tecnologia da Informação",
 *   cargoAtual: "Desenvolvedor Java"
 * });
 */
