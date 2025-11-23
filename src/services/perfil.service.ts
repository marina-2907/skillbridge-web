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

    return fetchAPI<PerfilDTO>(`/api/usuarios/${usuarioId}/perfil`, {

      method: 'GET',

    });

  },
 
  /**

   * Criar perfil

   */

  async criar(usuarioId: number, dados: PerfilDTO): Promise<PerfilDTO> {

    return fetchAPI<PerfilDTO>(`/api/usuarios/${usuarioId}/perfil`, {

      method: 'POST',

      body: JSON.stringify(dados),

    });

  },
 
  /**

   * Atualizar perfil

   */

  async atualizar(usuarioId: number, dados: PerfilDTO): Promise<PerfilDTO> {

    return fetchAPI<PerfilDTO>(`/api/usuarios/${usuarioId}/perfil`, {

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
 
// src/services/recomendacao.service.ts

export interface CursoRecomendado {

  idCurso: number;

  nome: string;

  descricao: string;

  area: string;

  nivel: string;

  cargaHoraria: number;

  avaliacaoMedia: number;

  taxaConclusaoMedia: number;

  popularidadeScore: number;

}
 
export interface RecomendacaoItem {

  rank: number;

  curso: CursoRecomendado;

  scoreRelevancia: number;

  probabilidadeConclusao: number;

  motivo: string;

  modeloIa: string;

  versaoModelo: string;

}
 
export interface RecomendacaoResponse {

  message?: string;

  total: number;

  recomendacoes: RecomendacaoItem[];

}
 
export const recomendacaoService = {

  /**

   * Gerar novas recomendações via IA

   */

  gerarRecomendacoes: async (usuarioId: number, topN: number = 10): Promise<RecomendacaoResponse> => {

    try {

      return await fetchAPI<RecomendacaoResponse>(

        `/api/recomendacoes/gerar/${usuarioId}?topN=${topN}`,

        { method: 'POST' }

      );

    } catch (error) {

      console.error('Erro ao gerar recomendações:', error);

      throw error;

    }

  },
 
  /**

   * Buscar recomendações já geradas para um usuário

   */

  buscarRecomendacoes: async (usuarioId: number, limit: number = 10): Promise<RecomendacaoResponse> => {

    try {

      return await fetchAPI<RecomendacaoResponse>(

        `/api/recomendacoes/usuario/${usuarioId}?limit=${limit}`,

        { method: 'GET' }

      );

    } catch (error) {

      console.error('Erro ao buscar recomendações:', error);

      throw error;

    }

  },
 
  /**

   * Marcar recomendação como visualizada

   */

  marcarVisualizada: async (recomendacaoId: number): Promise<void> => {

    try {

      await fetchAPI<void>(

        `/api/recomendacoes/${recomendacaoId}/visualizar`,

        { method: 'PUT' }

      );

    } catch (error) {

      console.error('Erro ao marcar como visualizada:', error);

    }

  },
 
  /**

   * Marcar que usuário se inscreveu no curso recomendado

   */

  marcarInscricao: async (recomendacaoId: number): Promise<void> => {

    try {

      await fetchAPI<void>(

        `/api/recomendacoes/${recomendacaoId}/inscreveu`,

        { method: 'PUT' }

      );

    } catch (error) {

      console.error('Erro ao marcar inscrição:', error);

    }

  }

};
 