// src/services/usuario.service.ts

import { fetchAPI } from '../config/api.config';
import type {
  UsuarioCreateDTO,
  UsuarioResponseDTO,
  LoginDTO,
} from '../types/api.types';

/**
 * Serviço para gerenciar usuários
 */
export const usuarioService = {
  /**
   * Criar novo usuário
   */
  async criar(dados: UsuarioCreateDTO): Promise<UsuarioResponseDTO> {
    return fetchAPI<UsuarioResponseDTO>('/usuarios', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Fazer login
   */
  async login(dados: LoginDTO): Promise<UsuarioResponseDTO> {
    return fetchAPI<UsuarioResponseDTO>('/usuarios/login', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Buscar usuário por ID
   */
  async buscarPorId(id: number): Promise<UsuarioResponseDTO> {
    return fetchAPI<UsuarioResponseDTO>(`/usuarios/${id}`, {
      method: 'GET',
    });
  },

  /**
   * Listar todos os usuários
   */
  async listar(): Promise<UsuarioResponseDTO[]> {
    return fetchAPI<UsuarioResponseDTO[]>('/usuarios', {
      method: 'GET',
    });
  },

  /**
   * Atualizar usuário
   */
  async atualizar(
    id: number,
    dados: UsuarioCreateDTO
  ): Promise<UsuarioResponseDTO> {
    return fetchAPI<UsuarioResponseDTO>(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Deletar usuário
   */
  async deletar(id: number): Promise<void> {
    return fetchAPI<void>(`/usuarios/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Exemplo de uso:
 * 
 * // Criar usuário
 * const novoUsuario = await usuarioService.criar({
 *   nome: "João Silva",
 *   email: "joao@email.com",
 *   senha: "senha123"
 * });
 * 
 * // Login
 * const usuario = await usuarioService.login({
 *   email: "joao@email.com",
 *   senha: "senha123"
 * });
 * 
 * // Salvar no localStorage
 * localStorage.setItem('usuario', JSON.stringify(usuario));
 */
