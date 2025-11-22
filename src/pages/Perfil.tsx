// src/pages/Perfil.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { perfilService } from '../services/perfil.service';
import { useFavoritos } from '../hooks/useFavoritos';
import type { PerfilDTO } from '../types/api.types';

export function Perfil() {
  const { usuario: usuarioAuth, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState<PerfilDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const { favoritos } = useFavoritos();

  // Redirecionar para login se não estiver logado
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Buscar perfil do usuário logado
  useEffect(() => {
    async function carregarPerfil() {
      if (!usuarioAuth?.id) return;

      try {
        setLoading(true);
        const perfilData = await perfilService.buscar(usuarioAuth.id);
        setPerfil(perfilData);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        // Se não tiver perfil, não exibe erro, apenas não mostra os dados
        setPerfil(null);
      } finally {
        setLoading(false);
      }
    }

    carregarPerfil();
  }, [usuarioAuth?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!usuarioAuth) return null;

  const iniciais =
    usuarioAuth.nome
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase() || 'SB';

  const nivelLabel =
    perfil?.nivelExperiencia === 'INTERMEDIARIO'
      ? 'Intermediário'
      : perfil?.nivelExperiencia === 'SENIOR'
      ? 'Sênior'
      : 'Júnior';

  return (
    <div className="pb-16 px-4 md:px-6 lg:px-10 max-w-7xl mx-auto">
      {/* HEADER DO PERFIL */}
      <section className="mt-8 mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-600">
          Perfil do aluno
        </p>

        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Olá, {usuarioAuth.nome}
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-xl">
              Aqui você acompanha seus dados, interesses e como a SkillBridge
              monta recomendações e trilhas sob medida para o seu momento.
            </p>
          </div>

          <div className="mt-2 flex flex-col items-start gap-2 md:items-end md:mt-0">
            <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 border border-sky-100">
              Disponibilidade:{' '}
              <span className="ml-1 font-semibold">
                {perfil?.tempoDisponivelSemanal || 0}h/sem
              </span>
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-50">
              Nível atual: <span className="ml-1 font-semibold">{nivelLabel}</span>
            </span>
          </div>
        </div>

        <div
          className="mx-auto mt-5 h-[3px] w-24 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #0EA5E9, #0369A1)',
          }}
        />
      </section>

      {/* BLOCO PRINCIPAL: FOTO + INFO */}
      <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,280px),minmax(0,1fr)] items-start">
        {/* CARD: AVATAR + INFO BÁSICA */}
        <div className="rounded-3xl bg-white/95 border border-slate-100 shadow-md px-5 py-6 flex flex-col items-center text-center">
          {/* Avatar com iniciais */}
          <div className="h-24 w-24 rounded-full bg-linear-to-br from-sky-500 to-sky-700 flex items-center justify-center text-3xl font-bold text-white shadow-md">
            {iniciais}
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            {usuarioAuth.nome}
          </h2>
          <p className="text-xs text-slate-500">{usuarioAuth.email}</p>
          <p className="mt-1 text-[11px] text-slate-500">
            Aluno SkillBridge · {nivelLabel}
          </p>

          <button 
            onClick={() => navigate('/editar-perfil')}
            className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Editar informações
          </button>

          <p className="mt-4 text-[11px] text-slate-400 leading-relaxed">
            Os dados exibidos aqui foram preenchidos no seu cadastro. Em versões
            futuras, você poderá editar seu perfil e atualizar objetivos.
          </p>
        </div>

        {/* CARD: CARREIRA E COMPETÊNCIAS */}
        <div className="rounded-3xl bg-white/95 border border-slate-100 shadow-md px-5 py-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Sobre sua carreira
          </h3>

          <div className="space-y-4">
            {/* Carreira desejada */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 mb-1">
                Carreira desejada
              </p>
              <p className="text-sm text-slate-700 font-medium">
                {perfil?.objetivoCarreira || 'Não definida ainda'}
              </p>
              {!perfil?.objetivoCarreira && (
                <p className="text-[11px] text-slate-400 mt-1">
                  Configure seu perfil para receber recomendações personalizadas
                </p>
              )}
            </div>

            {/* Disponibilidade */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 mb-1">
                Tempo para estudos
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-bold text-lg">
                  {perfil?.tempoDisponivelSemanal || 0}
                </span>{' '}
                horas por semana
              </p>
            </div>

            {/* Nível */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 mb-1">
                Nível de experiência
              </p>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-200">
                {nivelLabel}
              </span>
            </div>

            {/* Biografia se tiver */}
            {perfil?.biografia && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 mb-1">
                  Sobre
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {perfil.biografia}
                </p>
              </div>
            )}
          </div>

          {/* Resumo da leitura do perfil */}
          <div className="mt-5 rounded-2xl bg-sky-50/70 border border-sky-100 px-4 py-3">
            <p className="text-xs font-semibold text-sky-800 mb-1">
              Como usamos seu perfil
            </p>
            <p className="text-[11px] text-sky-900/90 leading-relaxed">
              A SkillBridge cruza sua carreira desejada, nível ({nivelLabel}) e
              tempo disponível ({perfil?.tempoDisponivelSemanal || 0}h/sem) para
              sugerir cursos e trilhas que façam sentido para o seu momento,
              sem sobrecarregar sua rotina.
            </p>
          </div>
        </div>
      </section>

      {/* MÉTRICAS / VISÃO GERAL */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white/95 border border-slate-100 shadow-sm px-4 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Tempo disponível
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {perfil?.tempoDisponivelSemanal || 0}h/sem
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Usado para montar sua carga ideal de estudos.
          </p>
        </div>

        <div className="rounded-2xl bg-white/95 border border-slate-100 shadow-sm px-4 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Data de cadastro
          </p>
          <p className="mt-2 text-lg font-bold text-slate-900">
            {new Date(usuarioAuth.dataCadastro).toLocaleDateString('pt-BR')}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Membro desde essa data
          </p>
        </div>

        <div className="rounded-2xl bg-white/95 border border-slate-100 shadow-sm px-4 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Favoritos
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {favoritos.length}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Cursos marcados com o coração no catálogo.
          </p>
        </div>
      </section>

      {/* Aviso sobre perfil incompleto */}
      {!perfil?.objetivoCarreira && (
        <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0">
              <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-900">
                Complete seu perfil
              </h3>
              <p className="mt-1 text-xs text-amber-800">
                Configure sua carreira desejada e disponibilidade para receber
                recomendações personalizadas de cursos e trilhas de aprendizado.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
