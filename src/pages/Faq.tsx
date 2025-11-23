import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const PRIMARY = "#0EA5E9";
const PRIMARY_DARK = "#0369A1";

type FaqItem = {
  pergunta: string;
  resposta: string;
  categoria: "Geral" | "Plataforma" | "Conta";
};

const FAQS: FaqItem[] = [
  {
    categoria: "Geral",
    pergunta: "O que é a SkillBridge?",
    resposta:
      "A SkillBridge é uma plataforma que conecta pessoas a trilhas de aprendizado personalizadas, usando IA para recomendar cursos, conteúdos e caminhos de carreira alinhados ao seu perfil e objetivos.",
  },
  {
    categoria: "Geral",
    pergunta: "A SkillBridge é apenas um projeto acadêmico?",
    resposta:
      "Este protótipo foi desenvolvido como projeto acadêmico na FIAP, mas foi pensado com visão de produto real, escalável e pronto para ser evoluído para o mercado.",
  },
  {
    categoria: "Plataforma",
    pergunta: "Como funcionam as recomendações de cursos?",
    resposta:
      "A partir das informações do seu perfil (objetivo, experiência, tempo disponível e interesses), a IA sugere cursos priorizando o que gera maior impacto na sua carreira em menos tempo.",
  },
  {
    categoria: "Plataforma",
    pergunta: "O que é a Minha Trilha?",
    resposta:
      "É a sua jornada personalizada dentro da plataforma: uma sequência organizada de cursos, desafios e conteúdos sugeridos para você evoluir passo a passo.",
  },
  {
    categoria: "Plataforma",
    pergunta: "Posso favoritar cursos para ver depois?",
    resposta:
      "Sim! Você pode favoritar cursos no catálogo e acessá-los rapidamente em suas recomendações ou na área de perfil.",
  },
  {
    categoria: "Conta",
    pergunta: "Preciso criar conta para usar a plataforma?",
    resposta:
      "Algumas partes podem ser exploradas livremente, mas para salvar trilhas, favoritos e histórico de aprendizado, é necessário criar uma conta.",
  },
  {
    categoria: "Conta",
    pergunta: "Meus dados ficam seguros?",
    resposta:
      "Sim. As informações do seu perfil são usadas apenas para personalizar sua experiência na plataforma. O projeto também considera boas práticas de LGPD na modelagem dos dados.",
  },
  {
    categoria: "Conta",
    pergunta: "Esqueci minha senha. E agora?",
    resposta:
      "Na versão completa da plataforma, você poderá recuperar o acesso informando seu e-mail cadastrado. Neste protótipo, o foco está na experiência de navegação e recomendações.",
  },
];

export function Faq() {
  const [filtro, setFiltro] = useState<"Todos" | "Geral" | "Plataforma" | "Conta">("Todos");
  const [aberta, setAberta] = useState<string | null>(FAQS[0]?.pergunta ?? null);

  const categorias: Array<"Todos" | "Geral" | "Plataforma" | "Conta"> = [
    "Todos",
    "Geral",
    "Plataforma",
    "Conta",
  ];

  const faqsFiltradas =
    filtro === "Todos"
      ? FAQS
      : FAQS.filter((faq) => faq.categoria === filtro);

  const toggle = (pergunta: string) => {
    setAberta((atual) => (atual === pergunta ? null : pergunta));
  };

  return (
    <main
      className="min-h-screen px-6 py-16"
      style={{
        background: "linear-gradient(to bottom, #f8fcff, #ffffff)",
      }}
    >
      <section className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 border text-[13px] font-semibold shadow-sm"
            style={{
              background: `${PRIMARY}15`,
              borderColor: `${PRIMARY}40`,
              color: PRIMARY,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: PRIMARY }}
            />
            Central de Dúvidas
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-black text-slate-900">
            FAQ • Perguntas Frequentes
          </h1>

          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Reunimos as principais dúvidas sobre a SkillBridge, como funciona a
            plataforma e o que estamos construindo neste projeto.
          </p>
        </div>

        {/* FILTRO DE CATEGORIAS */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categorias.map((cat) => {
            const ativo = filtro === cat;
            return (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold border transition-all"
                style={
                  ativo
                    ? {
                        background: `linear-gradient(120deg, ${PRIMARY}, ${PRIMARY_DARK})`,
                        borderColor: PRIMARY_DARK,
                        color: "#ffffff",
                        boxShadow: "0 6px 18px rgba(15,118,178,0.22)",
                      }
                    : {
                        background: "#f9fafb",
                        borderColor: "#e5e7eb",
                        color: "#4b5563",
                      }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* LISTA DE FAQ */}
        <div className="mt-10 space-y-3">
          {faqsFiltradas.map((faq) => {
            const isOpen = aberta === faq.pergunta;
            return (
              <div
                key={faq.pergunta}
                className="rounded-2xl border bg-white/90 backdrop-blur shadow-sm hover:shadow-md transition-all"
              >
                <button
                  onClick={() => toggle(faq.pergunta)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <div>
                    <span className="inline-flex items-center rounded-full bg-slate-100 text-[11px] font-semibold px-2.5 py-1 text-slate-600 mb-1">
                      {faq.categoria}
                    </span>
                    <p className="text-sm md:text-base font-semibold text-slate-900">
                      {faq.pergunta}
                    </p>
                  </div>

                  <ChevronDown
                    className={`shrink-0 transition-transform text-slate-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-slate-600 border-t border-slate-100">
                    <p className="pt-3 leading-relaxed">{faq.resposta}</p>
                  </div>
                )}
              </div>
            );
          })}

          {faqsFiltradas.length === 0 && (
            <p className="text-center text-sm text-slate-500 mt-6">
              Nenhuma pergunta encontrada para essa categoria.
            </p>
          )}
        </div>

        {/* CTA FINAL */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600 mb-3">
            Não encontrou a resposta que procurava?
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-px active:translate-y-0 transition"
            style={{
              background: `linear-gradient(120deg, ${PRIMARY}, ${PRIMARY_DARK})`,
            }}
          >
            Falar com a equipe
          </Link>
        </div>
      </section>
    </main>
  );
}
