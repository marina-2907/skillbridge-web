import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PRIMARY = "#0EA5E9";
const PRIMARY_DARK = "#0369A1";

const IconMenu = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconLogin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path
      d="M10 7L8.5 5.5C8.2 5.2 7.8 5 7.4 5H6A2 2 0 0 0 4 7v10a2 2 0 0 0 2 2h1.4c.4 0 .8-.2 1.1-.5L10 17"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 8l3 4-3 4M9 12h8"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconLogout = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 17l5-5-5-5M21 12H9"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconUser = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <circle
      cx="12"
      cy="8"
      r="4"
      stroke="currentColor"
      strokeWidth="1.7"
      fill="none"
    />
    <path
      d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const linkBase =
    "relative px-3 py-2 text-xs md:text-sm font-medium rounded-xl transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100";
  const linkActive = "text-slate-900 font-semibold bg-slate-100 shadow-sm";

  const NavItem = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group ${linkBase} ${isActive ? linkActive : ""}`
      }
    >
      <span className="relative inline-flex items-center gap-1">
        {children}
        <span
          className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full transition-all group-hover:w-full"
          style={{
            background: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_DARK})`,
          }}
        />
      </span>
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Linha fina de cor da marca */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_DARK})`,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        {/* LOGO + NOME */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="SkillBridge"
            className="h-8 w-auto md:h-9 transition group-hover:scale-[1.03]"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-base md:text-lg font-semibold tracking-tight text-slate-900">
              Skill
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(120deg, ${PRIMARY}, ${PRIMARY_DARK})`,
                }}
              >
                Bridge
              </span>
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-slate-400">
              Seu próximo passo, guiado por IA
            </span>
          </div>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1.5 border border-slate-200">
          <NavItem to="/">Início</NavItem>
          <NavItem to="/catalogo">Catálogo</NavItem>
          <NavItem to="/recomendacoes">Recomendações</NavItem>
          <NavItem to="/trilha">Minha Trilha</NavItem>
          <NavItem to="/faq">FAQ</NavItem>
          <NavItem to="/contato">Contato</NavItem>
          <NavItem to="/integrantes">Integrantes</NavItem>
          {isLoggedIn && <NavItem to="/perfil">Perfil</NavItem>}
        </nav>

        {/* ÁREA DE AUTENTICAÇÃO DESKTOP */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {/* Nome do usuário */}
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700">
                <IconUser className="text-blue-600" />
                <span className="font-medium max-w-[120px] truncate">
                  {usuario?.nome?.split(' ')[0] || 'Usuário'}
                </span>
              </div>
              
              {/* Botão de logout */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-xl text-white shadow-md hover:shadow-lg hover:-translate-y-px active:translate-y-0 transition bg-red-500 hover:bg-red-600"
              >
                <IconLogout />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-xl text-white shadow-md hover:shadow-lg hover:-translate-y-px active:translate-y-0 transition"
              style={{
                background: `linear-gradient(120deg, ${PRIMARY}, ${PRIMARY_DARK})`,
              }}
            >
              <IconLogin />
              <span>Entrar</span>
            </Link>
          )}
        </div>

        {/* BOTÃO MOBILE */}
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white active:scale-95 transition text-slate-700"
          onClick={() => setOpen(true)}
        >
          <IconMenu />
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col md:hidden">
          
          {/* topo do menu mobile */}
          <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="SkillBridge" className="h-7 w-auto" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-slate-900">
                  SkillBridge
                </span>
                <span className="text-[10px] text-slate-400">
                  {isLoggedIn ? `Olá, ${usuario?.nome?.split(' ')[0]}!` : 'Explore novas habilidades'}
                </span>
              </div>
            </div>

            <button
              className="h-9 w-9 inline-flex items-center justify-center rounded-xl hover:bg-slate-100 active:scale-95 transition"
              onClick={() => setOpen(false)}
            >
              <IconX />
            </button>
          </div>

          {/* LINKS MOBILE */}
          <nav className="px-4 py-4 flex flex-col gap-2 text-sm">
            <Link to="/" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium">Início</Link>
            <Link to="/catalogo" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium">Catálogo</Link>
            <Link to="/recomendacoes" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium">Recomendações</Link>
            <Link to="/trilha" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium">Minha Trilha</Link>
            <Link to="/faq" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium">FAQ</Link>
            <Link to="/contato" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium">Contato</Link>
            <Link to="/integrantes" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium">Integrantes</Link>

            {isLoggedIn && (
              <Link to="/perfil" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium">Perfil</Link>
            )}
          </nav>

          {/* AUTENTICAÇÃO MOBILE */}
          <div className="mt-auto px-4 pb-6 pt-2 border-t border-slate-200">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white shadow-md active:scale-[0.99] transition bg-red-500"
              >
                <IconLogout />
                <span>Sair da conta</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white shadow-md active:scale-[0.99] transition"
                style={{
                  background: `linear-gradient(120deg, ${PRIMARY}, ${PRIMARY_DARK})`,
                }}
              >
                <IconLogin />
                <span>Entrar na plataforma</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
