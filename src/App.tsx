import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import Login from './pages/Login';
import { Perfil } from "./pages/Perfil";
import { EditarPerfil } from "./pages/EditarPerfil";
import { Recomendacoes } from "./pages/Recomendacoes"; // AGORA É A PÁGINA COM IA
import { Trilha } from "./pages/Trilha";
import { Integrantes } from "./pages/Integrantes";
import { Faq } from "./pages/Faq03";
import { Contato } from "./pages/Contato";
import { FavoritosProvider } from "./hooks/useFavoritos";
import { TrilhaProvider } from "./hooks/useTrilha";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <TrilhaProvider>
        <FavoritosProvider>
          <BrowserRouter>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalogo" element={<Catalogo />} />
                  <Route path="/recomendacoes" element={<Recomendacoes />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route path="/editar-perfil" element={<EditarPerfil />} />
                  <Route path="/trilha" element={<Trilha />} />
                  <Route path="/integrantes" element={<Integrantes />} />
                  <Route path="/Faq" element={<Faq />} />
                  <Route path="/contato" element={<Contato />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </FavoritosProvider>
      </TrilhaProvider>
    </AuthProvider>
  );
}
