// src/types/api.types.ts

/**
 * Tipos da API Backend (Java/Quarkus)
 * Mapeamento dos DTOs do backend
 */

// ========== USUÁRIO ==========

export interface UsuarioCreateDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface UsuarioResponseDTO {
  id: number;
  nome: string;
  email: string;
  ativo: string;
  dataCadastro: string;
  ultimoAcesso: string | null;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

// ========== PERFIL ==========

export interface PerfilDTO {
  objetivoCarreira?: string;
  nivelExperiencia?: 'JUNIOR' | 'INTERMEDIARIO' | 'SENIOR';
  tempoDisponivelSemanal?: number;
  idade?: number;
  escolaridade?: string;
  anosExperienciaTotal?: number;
  biografia?: string;
  areaAtuacao?: string;
  cargoAtual?: string;
  objetivoProfissional?: string;
}

// ========== CURSO ==========

export interface CursoAPI {
  id: number;
  nome: string;
  descricao: string;
  area: string;
  nivel: 'BASICO' | 'INTERMEDIARIO' | 'AVANCADO';
  cargaHoraria: number;
  avaliacaoMedia: number;
  taxaConclusaoMedia: number;
  popularidadeScore: number;
  urlExterno: string;
  imagemUrl: string;
  ativo: string;
  dataCriacao: string;
  totalInscritos: number;
}

export interface CursoCreateDTO {
  nome: string;
  descricao: string;
  area: string;
  nivel: 'BASICO' | 'INTERMEDIARIO' | 'AVANCADO';
  cargaHoraria: number;
  urlExterno?: string;
  imagemUrl?: string;
}

// ========== INSCRIÇÃO ==========

export interface InscricaoAPI {
  cursoId: any;
  id: number;
  usuario: {
    id: number;
    nome: string;
  };
  curso: {
    id: number;
    nome: string;
  };
  dataInscricao: string;
  progresso: number;
  status: 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';
  tempoGastoHoras: number;
  dataConclusao: string | null;
  notaAvaliacao: number | null;
}

export interface InscricaoCreateDTO {
  usuarioId: number;
  cursoId: number;
}

export interface ProgressoUpdateDTO {
  progresso: number;
}

export interface ConcluirInscricaoDTO {
  nota?: number;
}

// ========== COMPETÊNCIAS ==========

export interface CompetenciaUsuarioAPI {
  id: number;
  usuario: {
    id: number;
  };
  nomeCompetencia: string;
  nivelDominio: string;
  dataAdicao: string;
  validada: string;
  anosExperiencia: number;
}

// ========== TRILHA ==========

export interface TrilhaAPI {
  id: number;
  usuario: {
    id: number;
  };
  nomeTrilha: string;
  descricao: string;
  geradaPorIa: string;
  dataCriacao: string;
}

// ========== RECOMENDAÇÃO ==========

export interface RecomendacaoAPI {
  id: number;
  usuario: {
    id: number;
  };
  curso: CursoAPI;
  scoreRelevancia: number;
  motivo: string;
  visualizada: string;
  seInscreveu: string;
  dataRecomendacao: string;
  modeloIa: string;
  versaoModelo: string;
}

// ========== MAPEAMENTO ==========

// tipo de nível esperado pelo frontend (definido em src/types.ts)
type NivelFrontend = 'iniciante' | 'intermediario' | 'avancado';

/**
 * Normaliza nível vindo da API para o padrão do frontend
 * API: 'BASICO' | 'INTERMEDIARIO' | 'AVANCADO'
 * Front: 'iniciante' | 'intermediario' | 'avancado'
 */
function mapNivelToFrontend(
  nivel: CursoAPI['nivel']
): NivelFrontend {
  const upper = nivel.toUpperCase() as CursoAPI['nivel'];

  switch (upper) {
    case 'BASICO':
      return 'iniciante';
    case 'INTERMEDIARIO':
      return 'intermediario';
    case 'AVANCADO':
      return 'avancado';
    default:
      // fallback seguro
      return 'iniciante';
  }
}

/**
 * Converte CursoAPI para o tipo Curso do frontend
 */
export function mapCursoAPIToCurso(
  cursoAPI: CursoAPI
): import('../types').Curso {
  return {
    id: cursoAPI.id,
    titulo: cursoAPI.nome,
    provedor: cursoAPI.area, // ou pode ser um campo separado
    cargaHoraria: cursoAPI.cargaHoraria,
    nivel: mapNivelToFrontend(cursoAPI.nivel),
    tags: [cursoAPI.area.toLowerCase()],
    rating: cursoAPI.avaliacaoMedia,
    descricao: cursoAPI.descricao,
    youtubeUrl: cursoAPI.urlExterno || '',
  };
}

/**
 * Converte array de CursoAPI para array de Curso
 */
export function mapCursosAPIToCursos(
  cursosAPI: CursoAPI[]
): import('../types').Curso[] {
  return cursosAPI.map(mapCursoAPIToCurso);
}
// Fim de api.types.ts