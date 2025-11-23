// src/services/recomendacao.service.ts
import axios from 'axios';

const API_URL = 'https://skillbridge-api-production.up.railway.app';

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
      const response = await axios.post(
        `${API_URL}/recomendacoes/gerar/${usuarioId}?topN=${topN}`
      );
      return response.data;
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
      const response = await axios.get(
        `${API_URL}/recomendacoes/usuario/${usuarioId}?limit=${limit}`
      );
      return response.data;
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
      await axios.put(`${API_URL}/recomendacoes/${recomendacaoId}/visualizar`);
    } catch (error) {
      console.error('Erro ao marcar como visualizada:', error);
    }
  },

  /**
   * Marcar que usuário se inscreveu no curso recomendado
   */
  marcarInscricao: async (recomendacaoId: number): Promise<void> => {
    try {
      await axios.put(`${API_URL}/recomendacoes/${recomendacaoId}/inscreveu`);
    } catch (error) {
      console.error('Erro ao marcar inscrição:', error);
    }
  }
};
