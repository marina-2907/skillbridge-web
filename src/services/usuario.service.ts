// src/services/usuario.service.ts
import { api } from "./api";
import type {
  LoginDTO,
  UsuarioCreateDTO,
  UsuarioResponseDTO,
} from "../types/api.types";

export const usuarioService = {
  async login(data: LoginDTO): Promise<UsuarioResponseDTO> {
    try {
      const resp = await api.post<UsuarioResponseDTO>(
        "/api/usuarios/login",
        data
      );
      console.log("✅ Login OK:", resp.data);
      return resp.data;
    } catch (err: any) {
      console.error("❌ Erro no login:", err);

      // Axios: Network Error (CORS/servidor fora do ar)
      if (err.message === "Network Error") {
        throw new Error(
          "Não foi possível conectar à API. Verifique se o backend está online no Railway."
        );
      }

      if (err.response) {
        const msgBackend =
          err.response.data?.mensagem ||
          err.response.data?.error ||
          err.response.data?.message;

        throw new Error(
          msgBackend || `Erro no login (HTTP ${err.response.status})`
        );
      }

      throw new Error("Erro desconhecido ao fazer login.");
    }
  },

  async criar(data: UsuarioCreateDTO): Promise<UsuarioResponseDTO> {
    try {
      const resp = await api.post<UsuarioResponseDTO>("/api/usuarios", data);
      console.log("✅ Cadastro OK:", resp.data);
      return resp.data;
    } catch (err: any) {
      console.error("❌ Erro no cadastro:", err);

      if (err.message === "Network Error") {
        throw new Error(
          "Não foi possível conectar à API. Verifique se o backend está online no Railway."
        );
      }

      if (err.response) {
        const msgBackend =
          err.response.data?.mensagem ||
          err.response.data?.error ||
          err.response.data?.message;

        throw new Error(
          msgBackend || `Erro no cadastro (HTTP ${err.response.status})`
        );
      }

      throw new Error("Erro desconhecido ao criar usuário.");
    }
  },
};
