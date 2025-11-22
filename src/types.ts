// src/types.ts

export type NivelCursoBackend = 'BASICO' | 'INTERMEDIARIO' | 'AVANCADO';
export type NivelCursoFrontend = 'iniciante' | 'intermediario' | 'avancado';

// Aqui aceitamos OS DOIS tipos de string.
// O frontend continua exibindo bonitinho, mas o TS para de reclamar.
export type NivelCurso = NivelCursoFrontend | NivelCursoBackend;

export type Curso = {
  id: number;
  titulo: string;
  provedor: string;
  cargaHoraria: number;
  nivel: NivelCurso;
  tags: string[];
  rating: number;
  descricao: string;
  youtubeUrl: string;
};

