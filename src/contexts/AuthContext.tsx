// src/contexts/AuthContext.tsx
import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { UsuarioResponseDTO } from '../types/api.types';

interface AuthContextType {
  usuario: UsuarioResponseDTO | null;
  isLoggedIn: boolean;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioResponseDTO | null>(null);

  // Carregar do localStorage
  useEffect(() => {
    const salvou = localStorage.getItem("usuario");
    if (salvou) {
      try {
        const parsed = JSON.parse(salvou);
        setUsuario(parsed);
      } catch {
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  const login = (data: any) => {
    // Normalizar formatos possíveis da API
    const user =
      data?.usuario ||
      data?.user ||
      data ||
      null;

    // Garantir que o ID exista
    const userId =
      user?.id ||
      user?.id_usuario ||
      user?.usuarioId ||
      null;

    if (!userId) {
      console.error("❌ API retornou usuário sem ID. Resposta recebida:", data);
      return;
    }

    const usuarioNormalizado: UsuarioResponseDTO = {
      id: userId,
      nome: user?.nome || "",
      email: user?.email || "",
      disponibilidadeSemanal: 0,
      competencias: undefined,
      interesses: undefined,
      ativo: "",
      dataCadastro: "",
      ultimoAcesso: null
    };

    setUsuario(usuarioNormalizado);

    localStorage.setItem("usuario", JSON.stringify(usuarioNormalizado));
    localStorage.setItem("usuarioId", userId.toString());
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioId");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isLoggedIn: !!usuario,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
