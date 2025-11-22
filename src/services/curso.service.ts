// src/services/curso.service.ts

import { fetchAPI } from '../config/api.config';
import type { CursoAPI, CursoCreateDTO } from '../types/api.types';

/**
 * Serviço para gerenciar cursos
 */
export const cursoService = {
  /**
   * Listar todos os cursos ativos
   */
  async listar(): Promise<CursoAPI[]> {
    return fetchAPI<CursoAPI[]>('/cursos', {
      method: 'GET',
    });
  },

  /**
   * Buscar curso por ID
   */
  async buscarPorId(id: number): Promise<CursoAPI> {
    return fetchAPI<CursoAPI>(`/cursos/${id}`, {
      method: 'GET',
    });
  },

  /**
   * Buscar cursos por área
   */
  async buscarPorArea(area: string): Promise<CursoAPI[]> {
    return fetchAPI<CursoAPI[]>(`/cursos/area/${area}`, {
      method: 'GET',
    });
  },

  /**
   * Buscar cursos por nível
   */
  async buscarPorNivel(nivel: string): Promise<CursoAPI[]> {
    return fetchAPI<CursoAPI[]>(`/cursos/nivel/${nivel}`, {
      method: 'GET',
    });
  },

  /**
   * Pesquisar cursos por nome
   */
  async pesquisar(nome: string): Promise<CursoAPI[]> {
    return fetchAPI<CursoAPI[]>(`/cursos/pesquisar?nome=${encodeURIComponent(nome)}`, {
      method: 'GET',
    });
  },

  /**
   * Criar novo curso (apenas admin)
   */
  async criar(dados: CursoCreateDTO): Promise<CursoAPI> {
    return fetchAPI<CursoAPI>('/cursos', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Atualizar curso (apenas admin)
   */
  async atualizar(id: number, dados: CursoCreateDTO): Promise<CursoAPI> {
    return fetchAPI<CursoAPI>(`/cursos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Inativar curso (apenas admin)
   */
  async deletar(id: number): Promise<void> {
    return fetchAPI<void>(`/cursos/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Exemplo de uso:
 * 
 * // Listar todos os cursos
 * const cursos = await cursoService.listar();
 * 
 * // Buscar por área
 * const cursosTech = await cursoService.buscarPorArea('Tecnologia');
 * 
 * // Pesquisar
 * const resultados = await cursoService.pesquisar('java');
 */
