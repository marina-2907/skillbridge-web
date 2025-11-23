// src/pages/Recomendacoes.tsx
import { useState } from 'react';
import { Sparkles, TrendingUp, Clock, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api'; 

interface CursoRecomendado {
  id: number | undefined;
  idCurso?: number;
  id_curso?: number;
  nome: string;
  descricao?: string;
  area: string;
  nivel: string;
  cargaHoraria?: number;
  carga_horaria?: number;
  avaliacaoMedia?: number;
  avaliacao_media?: number;
  taxaConclusaoMedia?: number;
  taxa_conclusao_media?: number;
  popularidadeScore?: number;
  popularidade_score?: number;
}

interface RecomendacaoItem {
  rank: number;
  curso: CursoRecomendado;
  scoreRelevancia?: number;
  score_relevancia?: number;
  probabilidadeConclusao?: number;
  probabilidade_conclusao?: number;
  motivo: string;
  modeloIa?: string;
  modelo_ia?: string;
  versaoModelo?: string;
  versao_modelo?: string;
}

export function Recomendacoes() {
  const [recomendacoes, setRecomendacoes] = useState<RecomendacaoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursosInscritos, setCursosInscritos] = useState<Set<number>>(new Set());
  const [inscrevendo, setInscrevendo] = useState<number | null>(null);
  
  const { usuario } = useAuth();
  const usuarioId = usuario?.id || 10001; // Fallback para ID de teste

  // Carregar inscrições do usuário
  const carregarInscricoes = async () => {
    try {
      const response = await api.get<any>(`/api/inscricoes/usuario/${usuarioId}`);
      const inscricoes: any[] = response.data || [];
      const cursosIds = new Set<number>(
        inscricoes
          .map((i: any) => Number(i?.curso?.id))
          .filter((n: number) => !Number.isNaN(n))
      );
      setCursosInscritos(cursosIds);
    } catch (err) {
      console.error('Erro ao carregar inscrições:', err);
    }
  };

  const carregarRecomendacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Buscando recomendações para usuário:', usuarioId);
      
      const response = await api.post(
        `/api/recomendacoes/gerar/${usuarioId}?topN=10`
      );
      
      console.log('✅ Resposta da API:', response.data);
      console.log('📊 Recomendações recebidas:', response.data.recomendacoes);
      
      setRecomendacoes(response.data.recomendacoes || []);
      
      // Carregar inscrições após receber recomendações
      await carregarInscricoes();
    } catch (err: any) {
      console.error('❌ Erro ao buscar recomendações:', err);
      console.error('📝 Detalhes do erro:', err.response?.data);
      setError(
        err.response?.data?.erro ||
        'Erro ao conectar com a API. Verifique se o backend Java está rodando (em dev) ou se a URL da API está correta.'
      );
    } finally {
      setLoading(false);
    }
  };

  const adicionarCurso = async (cursoId: number) => {
    try {
      setInscrevendo(cursoId);
      
      console.log('📤 Adicionando curso à trilha:', cursoId);
      
      // Criar inscrição
      await api.post('/api/inscricoes', {
        usuarioId: usuarioId,
        cursoId: cursoId
      });
      
      // Atualizar lista de cursos inscritos
      setCursosInscritos(prev => new Set([...prev, cursoId]));
      
      console.log('✅ Curso adicionado à trilha:', cursoId);
    } catch (err: any) {
      console.error('❌ Erro ao adicionar curso:', err);
      alert(err.response?.data?.message || 'Erro ao adicionar curso à trilha');
    } finally {
      setInscrevendo(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-lg text-gray-600">Gerando recomendações personalizadas com IA...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <div className="mb-4">
            <Sparkles className="w-16 h-16 mx-auto text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Erro ao Carregar</h2>
          <p className="text-red-600 mb-4 text-sm">{error}</p>
          <div className="text-left bg-gray-50 p-4 rounded mb-4">
            <p className="text-xs font-mono text-gray-700">
              Em desenvolvimento, certifique-se que:<br/>
              1. Backend Java está rodando (porta 8080)<br/>
              2. API Flask está rodando (porta 5000, se estiver usando)<br/>
              3. Banco Oracle configurado
            </p>
          </div>
          <button
            onClick={carregarRecomendacoes}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 px-4 md:px-6 lg:px-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <section className="mt-10 mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Recomendações da IA
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 text-center">
          Cursos Selecionados Para Você
        </h2>

        <p className="text-slate-600 text-center mt-3 max-w-2xl mx-auto">
          Nossa inteligência artificial está pronta para analisar seu perfil e selecionar os melhores cursos para acelerar sua carreira.
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={carregarRecomendacoes}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
            disabled={loading}
          >
            <Sparkles className="w-5 h-5" />
            Gerar Recomendações com IA
          </button>
        </div>

        <div
          className="mx-auto mt-6 h-[3px] w-24 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #0EA5E9, #0369A1)',
          }}
        />
      </section>

      {/* LISTA DE CURSOS RECOMENDADOS */}
      <section>
        {recomendacoes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recomendacoes.map((rec, index) => {
              // Normalizar dados (suportar snake_case e camelCase)
              const cursoId = rec.curso.id_curso || rec.curso.idCurso || rec.curso.id || 0;
              const cargaHoraria = rec.curso.cargaHoraria || rec.curso.carga_horaria || 0;
              const avaliacaoMedia = rec.curso.avaliacaoMedia || rec.curso.avaliacao_media || 0;
              const scoreRelevancia = rec.scoreRelevancia || rec.score_relevancia || 0;
              const rank = rec.rank || (index + 1);

              // DEBUG
              console.log('🔍 DEBUG CURSO:', {
                rec_completo: rec,
                curso: rec.curso,
                id_curso: rec.curso.id_curso,
                idCurso: rec.curso.idCurso,
                cursoId_final: cursoId
              });

              console.log(`📦 Card ${rank}:`, {
                nome: rec.curso.nome,
                avaliacaoMedia,
                scoreRelevancia,
                rank,
                cursoCompleto: rec.curso
              });

              return (
                <div
                  key={cursoId || index}
                  className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Badge de Ranking */}
                  <div className="absolute top-3 left-3 bg-linear-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                    #{rank}
                  </div>

                  {/* Badge de Score */}
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {scoreRelevancia.toFixed(1)}
                  </div>

                  {/* Imagem do Curso */}
                  <div className="h-40 bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-white opacity-50" />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5">
                    {/* Título */}
                    <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 min-h-14">
                      {rec.curso.nome}
                    </h3>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${rec.curso.nivel === 'BASICO' ? 'bg-green-100 text-green-700' : ''}
                        ${rec.curso.nivel === 'INTERMEDIARIO' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${rec.curso.nivel === 'AVANCADO' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {rec.curso.nivel}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {cargaHoraria}h
                      </span>
                    </div>

                    {/* Avaliação */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(avaliacaoMedia)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        {avaliacaoMedia.toFixed(1)}
                      </span>
                    </div>

                    {/* Motivo da Recomendação */}
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-xs text-slate-600 italic line-clamp-3">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        {rec.motivo}
                      </p>
                    </div>

                    {/* Botão Dinâmico */}
                    {cursosInscritos.has(cursoId) ? (
                      <button 
                        disabled
                        className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg font-medium text-sm cursor-not-allowed opacity-90"
                      >
                        Já na sua trilha ✅
                      </button>
                    ) : (
                      <button 
                        onClick={() => adicionarCurso(cursoId)}
                        disabled={inscrevendo === cursoId}
                        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50"
                      >
                        {inscrevendo === cursoId ? 'Adicionando...' : 'Adicionar à Trilha'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center mt-16 max-w-md mx-auto">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-slate-700 text-lg font-medium">
              Clique no botão acima para gerar suas recomendações
            </p>
            <p className="text-slate-400 text-sm mt-2">
              A IA analisará seu perfil e sugerirá os melhores cursos
            </p>
          </div>
        )}
      </section>

      {/* Info sobre a IA */}
      <section className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Como funciona nossa IA?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Utilizamos algoritmos de <strong>Machine Learning (Random Forest)</strong> para 
              analisar seu perfil, experiência e objetivos. A IA calcula um score de relevância 
              para cada curso disponível e seleciona os mais adequados para você.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
