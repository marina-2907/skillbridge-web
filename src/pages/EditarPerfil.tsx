// src/pages/EditarPerfil.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { perfilService } from '../services/perfil.service';
import type { PerfilDTO } from '../types/api.types';

export function EditarPerfil() {
  const { usuario, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<PerfilDTO>({
    objetivoCarreira: '',
    nivelExperiencia: 'JUNIOR',
    tempoDisponivelSemanal: 5,
    idade: undefined,
    escolaridade: '',
    anosExperienciaTotal: 0,
    biografia: '',
    areaAtuacao: '',
    cargoAtual: '',
    objetivoProfissional: '',
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    async function carregarPerfil() {
      if (!usuario?.id) return;

      try {
        setLoading(true);
        const perfil = await perfilService.buscar(usuario.id);
        setFormData({
          objetivoCarreira: perfil.objetivoCarreira || '',
          nivelExperiencia: perfil.nivelExperiencia || 'JUNIOR',
          tempoDisponivelSemanal: perfil.tempoDisponivelSemanal || 5,
          idade: perfil.idade,
          escolaridade: perfil.escolaridade || '',
          anosExperienciaTotal: perfil.anosExperienciaTotal || 0,
          biografia: perfil.biografia || '',
          areaAtuacao: perfil.areaAtuacao || '',
          cargoAtual: perfil.cargoAtual || '',
          objetivoProfissional: perfil.objetivoProfissional || '',
        });
      } catch (err) {
        console.log('Perfil não encontrado, criando novo');
      } finally {
        setLoading(false);
      }
    }

    carregarPerfil();
  }, [usuario?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario?.id) return;

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      await perfilService.atualizar(usuario.id, formData);
      
      setSuccess('Perfil atualizado com sucesso!');
      setTimeout(() => {
        navigate('/perfil');
      }, 1500);
    } catch (err) {
      console.error('Erro ao salvar perfil:', err);
      setError('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/perfil')}
          className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1"
        >
          ← Voltar ao perfil
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Editar Perfil
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Configure suas informações para receber recomendações personalizadas
        </p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Carreira Desejada */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Carreira Desejada *
            </label>
            <select
              required
              value={formData.objetivoCarreira}
              onChange={(e) => setFormData({ ...formData, objetivoCarreira: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option value="Desenvolvedor Full Stack">Desenvolvedor Full Stack</option>
              <option value="Desenvolvedor Frontend">Desenvolvedor Frontend</option>
              <option value="Desenvolvedor Backend">Desenvolvedor Backend</option>
              <option value="Desenvolvedor Mobile">Desenvolvedor Mobile</option>
              <option value="Cientista de Dados">Cientista de Dados</option>
              <option value="Engenheiro de Dados">Engenheiro de Dados</option>
              <option value="Analista de Dados">Analista de Dados</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Designer UX/UI">Designer UX/UI</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Arquiteto de Software">Arquiteto de Software</option>
              <option value="Engenheiro de Machine Learning">Engenheiro de Machine Learning</option>
              <option value="Especialista em Cloud">Especialista em Cloud</option>
              <option value="Analista de Segurança">Analista de Segurança</option>
              <option value="QA/Tester">QA/Tester</option>
            </select>
          </div>

          {/* Área de Atuação */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Área de Atuação Atual
            </label>
            <select
              value={formData.areaAtuacao}
              onChange={(e) => setFormData({ ...formData, areaAtuacao: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option value="Tecnologia da Informação">Tecnologia da Informação</option>
              <option value="Desenvolvimento de Software">Desenvolvimento de Software</option>
              <option value="Ciência de Dados">Ciência de Dados</option>
              <option value="Design">Design</option>
              <option value="Marketing Digital">Marketing Digital</option>
              <option value="Gestão de Produtos">Gestão de Produtos</option>
              <option value="Infraestrutura/Cloud">Infraestrutura/Cloud</option>
              <option value="Segurança da Informação">Segurança da Informação</option>
              <option value="Qualidade de Software">Qualidade de Software</option>
              <option value="Suporte Técnico">Suporte Técnico</option>
              <option value="Estudante">Estudante</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {/* Nível de Experiência */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nível de Experiência *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, nivelExperiencia: 'JUNIOR' })}
                className={`px-4 py-3 rounded-xl border-2 font-semibold transition ${
                  formData.nivelExperiencia === 'JUNIOR'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-300 text-slate-700 hover:border-slate-400'
                }`}
              >
                Júnior
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, nivelExperiencia: 'INTERMEDIARIO' })}
                className={`px-4 py-3 rounded-xl border-2 font-semibold transition ${
                  formData.nivelExperiencia === 'INTERMEDIARIO'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-300 text-slate-700 hover:border-slate-400'
                }`}
              >
                Intermediário
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, nivelExperiencia: 'SENIOR' })}
                className={`px-4 py-3 rounded-xl border-2 font-semibold transition ${
                  formData.nivelExperiencia === 'SENIOR'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-300 text-slate-700 hover:border-slate-400'
                }`}
              >
                Sênior
              </button>
            </div>
          </div>

          {/* Cargo Atual */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Cargo Atual
            </label>
            <input
              type="text"
              value={formData.cargoAtual}
              onChange={(e) => setFormData({ ...formData, cargoAtual: e.target.value })}
              placeholder="Ex: Desenvolvedor Java Júnior"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Anos de Experiência */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Anos de Experiência
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={formData.anosExperienciaTotal}
                onChange={(e) => setFormData({ ...formData, anosExperienciaTotal: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Idade */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Idade
              </label>
              <input
                type="number"
                min="14"
                max="100"
                value={formData.idade || ''}
                onChange={(e) => setFormData({ ...formData, idade: parseInt(e.target.value) || undefined })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Escolaridade */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Escolaridade
            </label>
            <select
              value={formData.escolaridade}
              onChange={(e) => setFormData({ ...formData, escolaridade: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option value="Ensino Fundamental">Ensino Fundamental</option>
              <option value="Ensino Médio">Ensino Médio</option>
              <option value="Técnico">Técnico</option>
              <option value="Superior Incompleto">Superior Incompleto</option>
              <option value="Superior Completo">Superior Completo</option>
              <option value="Pós-graduação">Pós-graduação</option>
              <option value="Mestrado">Mestrado</option>
              <option value="Doutorado">Doutorado</option>
            </select>
          </div>

          {/* Tempo Disponível */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tempo Disponível por Semana: {formData.tempoDisponivelSemanal}h
            </label>
            <input
              type="range"
              min="1"
              max="40"
              value={formData.tempoDisponivelSemanal}
              onChange={(e) => setFormData({ ...formData, tempoDisponivelSemanal: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1h</span>
              <span>20h</span>
              <span>40h</span>
            </div>
          </div>

          {/* Objetivo Profissional */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Objetivo Profissional
            </label>
            <textarea
              value={formData.objetivoProfissional}
              onChange={(e) => setFormData({ ...formData, objetivoProfissional: e.target.value })}
              placeholder="Ex: Conseguir meu primeiro emprego como desenvolvedor em 6 meses"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Biografia */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sobre Você
            </label>
            <textarea
              value={formData.biografia}
              onChange={(e) => setFormData({ ...formData, biografia: e.target.value })}
              placeholder="Conte um pouco sobre você, seus interesses e experiências..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/perfil')}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {saving ? 'Salvando...' : 'Salvar Perfil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
