// src/pages/Trilha.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { inscricaoService } from '../services/inscricao.service';
import type { InscricaoAPI } from '../types/api.types';

export function Trilha() {
  const { usuario, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [inscricoes, setInscricoes] = useState<InscricaoAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirecionar para login se não estiver logado
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Carregar inscrições do usuário
  useEffect(() => {
    async function carregarInscricoes() {
      if (!usuario?.id) return;

      try {
        setLoading(true);
        setError('');
        const dados = await inscricaoService.listarEmAndamento(usuario.id);
        setInscricoes(dados);
      } catch (err) {
        console.error('Erro ao carregar inscrições:', err);
        setError('Erro ao carregar seus cursos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    carregarInscricoes();
  }, [usuario?.id]);

  // Remover curso da trilha (cancelar inscrição)
  const handleRemover = async (inscricaoId: number) => {
    if (!confirm('Deseja realmente remover este curso da sua trilha?')) return;

    try {
      await inscricaoService.cancelar(inscricaoId);
      // Atualizar lista removendo o item
      setInscricoes(inscricoes.filter(i => i.id !== inscricaoId));
    } catch (err) {
      console.error('Erro ao remover curso:', err);
      alert('Erro ao remover curso. Tente novamente.');
    }
  };

  // Limpar trilha (cancelar todas as inscrições)
  const handleLimpar = async () => {
    if (!confirm('Deseja realmente remover TODOS os cursos da sua trilha?')) return;

    try {
      // Cancelar todas as inscrições
      await Promise.all(inscricoes.map(i => inscricaoService.cancelar(i.id)));
      setInscricoes([]);
    } catch (err) {
      console.error('Erro ao limpar trilha:', err);
      alert('Erro ao limpar trilha. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Carregando sua trilha...</p>
        </div>
      </div>
    );
  }

  const cargaTotal = inscricoes.reduce((acc, i) => acc + (i.curso?.cargaHoraria || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 pb-16">
      {/* HEADER */}
      <div className="mt-10 mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-700">
            Minha Trilha
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Seu caminho de estudos organizado
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl">
            Aqui ficam os cursos em que você está inscrito. Use essa trilha
            como roteiro para manter o foco, planejar a semana e acompanhar sua
            evolução.
          </p>
        </div>

        {inscricoes.length > 0 && (
          <div className="flex flex-col items-end gap-2 text-sm">
            <p className="text-slate-500">
              <span className="font-semibold text-slate-800">
                {inscricoes.length}
              </span>{' '}
              curso(s) na trilha •{' '}
              <span className="font-semibold text-slate-800">
                {cargaTotal}h
              </span>{' '}
              no total
            </p>
            <button
              onClick={handleLimpar}
              className="text-xs md:text-sm rounded-xl border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50 transition"
            >
              Limpar trilha
            </button>
          </div>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* LISTA DE CURSOS DA TRILHA */}
      {inscricoes.length > 0 ? (
        <div className="space-y-4">
          {inscricoes.map((inscricao) => {
            const curso = inscricao.curso;
            if (!curso) return null;

            const cargaHoraria = inscricao.tempoGastoHoras || 0;
            const semanas = Math.max(1, Math.ceil(cargaHoraria / 5));
            const dataInscricao = new Date(inscricao.dataInscricao).toLocaleDateString('pt-BR');

            return (
              <div
                key={inscricao.id}
                className="
                  rounded-2xl border border-slate-100 bg-white
                  p-4 md:p-5 shadow-sm
                  flex flex-col gap-4 md:flex-row md:items-stretch
                "
              >
                {/* Bloco esquerdo - info principal */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">
                      {curso.nome}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700 border border-sky-100">
                      Nível: {curso.nivel || 'Não definido'}
                    </span>
                    {inscricao.status === 'EM_ANDAMENTO' && (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700 border border-green-100">
                        Em andamento
                      </span>
                    )}
                    {inscricao.status === 'CONCLUIDO' && (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 border border-emerald-100">
                        Concluído ✅
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs md:text-sm text-slate-500">
                    ID: {curso.id}
                  </p>

                  {/* Progresso */}
                  {inscricao.progresso > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>Progresso</span>
                        <span className="font-semibold">{inscricao.progresso}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-sky-600 h-2 rounded-full transition-all"
                          style={{ width: `${inscricao.progresso}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bloco direito - resumo e ações */}
                <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4 flex flex-col justify-between">
                  <div className="space-y-2 text-xs md:text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-800">
                        Inscrito em:
                      </span>{' '}
                      {dataInscricao}
                    </p>
                    {cargaHoraria > 0 && (
                      <p>
                        <span className="font-semibold text-slate-800">
                          Tempo gasto:
                        </span>{' '}
                        {cargaHoraria} horas
                      </p>
                    )}
                    {inscricao.status === 'CONCLUIDO' && inscricao.dataConclusao && (
                      <p>
                        <span className="font-semibold text-slate-800">
                          Concluído em:
                        </span>{' '}
                        {new Date(inscricao.dataConclusao).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                    {inscricao.notaAvaliacao && (
                      <p>
                        <span className="font-semibold text-slate-800">
                          Nota:
                        </span>{' '}
                        {inscricao.notaAvaliacao}/10
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleRemover(inscricao.id)}
                      className="
                        flex-1 rounded-xl border border-slate-200
                        px-3 py-2 text-xs md:text-sm font-medium
                        text-slate-700 hover:bg-slate-50 transition
                      "
                    >
                      Remover da trilha
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 max-w-md text-center mx-auto">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky-50">
            <svg className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-slate-700 text-lg font-semibold">
            Sua trilha ainda está vazia
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Vá até o catálogo e clique em{' '}
            <span className="font-semibold">"Adicionar à trilha"</span> nos
            cursos que fazem sentido para o seu momento. Eles vão aparecer aqui
            e você poderá acompanhar seu progresso.
          </p>
          <button
            onClick={() => navigate('/catalogo')}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition"
          >
            Ir para o catálogo
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
