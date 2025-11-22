// src/services/inscricao.service.ts

import { fetchAPI } from '../config/api.config';
import type {
  InscricaoAPI,
  InscricaoCreateDTO,
  ProgressoUpdateDTO,
  ConcluirInscricaoDTO,
} from '../types/api.types';

/**
 * Serviço para gerenciar inscrições em cursos
 */
export const inscricaoService = {
  /**
   * Listar inscrições do usuário
   */
  async listarPorUsuario(usuarioId: number): Promise<InscricaoAPI[]> {
    return fetchAPI<InscricaoAPI[]>(`/inscricoes/usuario/${usuarioId}`, {
      method: 'GET',
    });
  },

  /**
   * Listar cursos em andamento
   */
  async listarEmAndamento(usuarioId: number): Promise<InscricaoAPI[]> {
    return fetchAPI<InscricaoAPI[]>(
      `/inscricoes/usuario/${usuarioId}/em-andamento`,
      { method: 'GET' }
    );
  },

  /**
   * Listar cursos concluídos
   */
  async listarConcluidos(usuarioId: number): Promise<InscricaoAPI[]> {
    return fetchAPI<InscricaoAPI[]>(
      `/inscricoes/usuario/${usuarioId}/concluidos`,
      { method: 'GET' }
    );
  },

  /**
   * Buscar inscrição por ID
   */
  async buscarPorId(id: number): Promise<InscricaoAPI> {
    return fetchAPI<InscricaoAPI>(`/inscricoes/${id}`, {
      method: 'GET',
    });
  },

  /**
   * Criar nova inscrição
   */
  async criar(dados: InscricaoCreateDTO): Promise<InscricaoAPI> {
    return fetchAPI<InscricaoAPI>('/inscricoes', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Atualizar progresso da inscrição
   */
  async atualizarProgresso(
    id: number,
    progresso: number
  ): Promise<InscricaoAPI> {
    const dados: ProgressoUpdateDTO = { progresso };
    return fetchAPI<InscricaoAPI>(`/inscricoes/${id}/progresso`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Marcar inscrição como concluída
   */
  async concluir(id: number, nota?: number): Promise<InscricaoAPI> {
    const dados: ConcluirInscricaoDTO = { nota };
    return fetchAPI<InscricaoAPI>(`/inscricoes/${id}/concluir`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Cancelar inscrição
   */
  async cancelar(id: number): Promise<void> {
    return fetchAPI<void>(`/inscricoes/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Exemplo de uso:
 * 
 * // Inscrever em curso
 * const inscricao = await inscricaoService.criar({
 *   usuarioId: 1,
 *   cursoId: 5
 * });
 * 
 * // Atualizar progresso
 * await inscricaoService.atualizarProgresso(inscricao.id, 50);
 * 
 * // Marcar como concluído
 * await inscricaoService.concluir(inscricao.id, 9.5);
 * 
 * // Listar cursos em andamento
 * const emAndamento = await inscricaoService.listarEmAndamento(1);
 */
