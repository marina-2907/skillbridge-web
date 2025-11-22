// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usuarioService } from '../services/usuario.service';
import type { LoginDTO, UsuarioCreateDTO } from '../types/api.types';

export default function Login() {
  const navigate = useNavigate();
  const { login: loginAuth } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Estado para login
  const [loginData, setLoginData] = useState<LoginDTO>({
    email: '',
    senha: '',
  });

  // Estado para cadastro
  const [cadastroData, setCadastroData] = useState<UsuarioCreateDTO>({
    nome: '',
    email: '',
    senha: '',
  });

  /**
   * Fazer login
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const usuario = await usuarioService.login(loginData);
      
      // Usar o contexto de autenticação
      loginAuth(usuario);
      
      // Redirecionar para home
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Criar conta
   */
  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await usuarioService.criar(cadastroData);
      
      // Fazer login automático após cadastro
      const usuario = await usuarioService.login({
        email: cadastroData.email,
        senha: cadastroData.senha,
      });
      
      // Usar o contexto de autenticação
      loginAuth(usuario);
      
      // Redirecionar para perfil (configuração inicial)
      navigate('/perfil');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {/* Logo e Título */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">SkillBridge</h1>
          <p className="mt-2 text-sm text-gray-600">
            Seu próximo passo, guiado por IA
          </p>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </h2>
        </div>

        {/* Abas Login/Cadastro */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              isLogin
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              !isLogin
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Cadastro
          </button>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {isLogin ? (
          // ==================== FORMULÁRIO DE LOGIN ====================
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email-login"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="senha-login" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  id="senha-login"
                  name="senha"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  value={loginData.senha}
                  onChange={(e) =>
                    setLoginData({ ...loginData, senha: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </button>
            </div>
          </form>
        ) : (
          // ==================== FORMULÁRIO DE CADASTRO ====================
          <form className="mt-8 space-y-6" onSubmit={handleCadastro}>
            <div className="space-y-4">
              <div>
                <label htmlFor="nome-cadastro" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo
                </label>
                <input
                  id="nome-cadastro"
                  name="nome"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="João Silva"
                  value={cadastroData.nome}
                  onChange={(e) =>
                    setCadastroData({ ...cadastroData, nome: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="email-cadastro" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email-cadastro"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  value={cadastroData.email}
                  onChange={(e) =>
                    setCadastroData({ ...cadastroData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="senha-cadastro" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  id="senha-cadastro"
                  name="senha"
                  type="password"
                  required
                  minLength={6}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                  value={cadastroData.senha}
                  onChange={(e) =>
                    setCadastroData({ ...cadastroData, senha: e.target.value })
                  }
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use pelo menos 6 caracteres
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Criando conta...
                  </span>
                ) : (
                  'Criar conta'
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Ao criar uma conta, você concorda com nossos Termos de Uso
            </p>
          </form>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Teste rápido? Use:{' '}
            <button
              onClick={() => {
                setIsLogin(true);
                setLoginData({
                  email: 'teste.final@email.com',
                  senha: 'senha123',
                });
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Conta de demonstração
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
