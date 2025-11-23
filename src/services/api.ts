import type { Curso } from "../types";
import type { UsuarioResponseDTO as Usuario } from "../types/api.types";



export const cursos: Curso[] = [
  {
    id: 1,
    titulo: "Lógica de Programação",
    provedor: "Alura",
    cargaHoraria: 10,
    nivel: "iniciante",
    tags: ["logica", "programacao", "carreira"],
    rating: 4.6,
    descricao:
      "Fundamentos de lógica, variáveis, decisões e repetições para você entender como pensar como programador em qualquer linguagem.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=curso+introducao+logica+de+programacao",
  },
  {
    id: 2,
    titulo: "Introdução a Dados com Python",
    provedor: "Coursera",
    cargaHoraria: 20,
    nivel: "iniciante",
    tags: ["python", "dados"],
    rating: 4.8,
    descricao:
      "Primeiros passos em análise de dados usando Python, Jupyter, bibliotecas básicas e leitura de arquivos.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=python+dados+para+iniciante",
  },
  {
    id: 3,
    titulo: "SQL para Análise",
    provedor: "Udemy",
    cargaHoraria: 16,
    nivel: "intermediario",
    tags: ["sql", "dados", "bi"],
    rating: 4.7,
    descricao:
      "Consulta de bancos relacionais com SELECT, JOINs, filtros, agregações e criação de visões para relatórios.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=curso+sql+para+analise+de+dados",
  },
  {
    id: 4,
    titulo: "Noções de IA Generativa",
    provedor: "DIO",
    cargaHoraria: 8,
    nivel: "iniciante",
    tags: ["ia", "generativa"],
    rating: 4.5,
    descricao:
      "Visão geral de modelos generativos, uso de prompts, limitações e aplicações práticas de IA no dia a dia.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=introducao+ia+generativa",
  },
  {
    id: 5,
    titulo: "Machine Learning Prático",
    provedor: "Kaggle",
    cargaHoraria: 24,
    nivel: "intermediario",
    tags: ["ml", "python", "dados"],
    rating: 4.9,
    descricao:
      "Construção de modelos de classificação e regressão em Python, usando conjuntos de dados reais do Kaggle.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=machine+learning+basico+com+python",
  },

  {
    id: 6,
    titulo: "JavaScript Moderno ES6+",
    provedor: "Udemy",
    cargaHoraria: 18,
    nivel: "iniciante",
    tags: ["javascript", "web", "frontend"],
    rating: 4.7,
    descricao:
      "Sintaxe moderna do JavaScript (ES6+): arrow functions, módulos, promises, map/filter/reduce e boas práticas.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=javascript+moderno+es6+curso",
  },
  {
    id: 7,
    titulo: "React para Iniciantes",
    provedor: "Alura",
    cargaHoraria: 14,
    nivel: "iniciante",
    tags: ["react", "frontend", "javascript"],
    rating: 4.8,
    descricao:
      "Conceitos principais do React: componentes, props, estado e renderização de interfaces reativas.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=react+para+iniciante+curso",
  },
  {
    id: 8,
    titulo: "TypeScript Completo",
    provedor: "DIO",
    cargaHoraria: 12,
    nivel: "intermediario",
    tags: ["typescript", "frontend", "backend"],
    rating: 4.6,
    descricao:
      "Tipagem estática, interfaces, generics e integração do TypeScript com projetos front e back-end.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=curso+typescript+completo",
  },
  {
    id: 9,
    titulo: "Node.js API com Express",
    provedor: "Rocketseat",
    cargaHoraria: 16,
    nivel: "intermediario",
    tags: ["node", "backend", "api"],
    rating: 4.9,
    descricao:
      "Criação de APIs REST com Express, rotas, middlewares, conexão com banco e boas práticas de organização.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=node+js+api+rest+express",
  },
  {
    id: 10,
    titulo: "PostgreSQL para Desenvolvedores",
    provedor: "Udemy",
    cargaHoraria: 20,
    nivel: "iniciante",
    tags: ["sql", "postgres", "banco"],
    rating: 4.7,
    descricao:
      "Modelagem básica, comandos SQL e recursos específicos do PostgreSQL para aplicações modernas.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=curso+postgresql+para+desenvolvedores",
  },

  {
    id: 11,
    titulo: "MongoDB Essencial",
    provedor: "Mongo University",
    cargaHoraria: 10,
    nivel: "intermediario",
    tags: ["mongodb", "nosql", "backend"],
    rating: 4.6,
    descricao:
      "Introdução ao modelo de documentos, coleções, consultas, índices e boas práticas com MongoDB.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=curso+mongodb+essencial",
  },
  {
    id: 12,
    titulo: "Python para Análise de Dados",
    provedor: "DataCamp",
    cargaHoraria: 22,
    nivel: "iniciante",
    tags: ["python", "pandas", "dados"],
    rating: 4.8,
    descricao:
      "Uso de pandas, NumPy e visualizações para explorar, limpar e analisar conjuntos de dados.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=python+analise+de+dados+pandas+curso",
  },
  {
    id: 13,
    titulo: "Machine Learning com Scikit-Learn",
    provedor: "Coursera",
    cargaHoraria: 25,
    nivel: "intermediario",
    tags: ["ml", "python", "dados"],
    rating: 4.9,
    descricao:
      "Pipeline completo de machine learning com scikit-learn: treino, validação, métricas e tuning de modelos.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=scikit+learn+curso+machine+learning",
  },
  {
    id: 14,
    titulo: "Power BI – Dashboards Profissionais",
    provedor: "FIAP",
    cargaHoraria: 15,
    nivel: "iniciante",
    tags: ["bi", "powerbi", "dashboards"],
    rating: 4.7,
    descricao:
      "Criação de relatórios interativos, dashboards e publicação de painéis no Power BI Service.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=curso+power+bi+dashboards+profissionais",
  },
  {
    id: 15,
    titulo: "AWS Cloud Practitioner",
    provedor: "AWS",
    cargaHoraria: 12,
    nivel: "iniciante",
    tags: ["aws", "cloud", "devops"],
    rating: 4.8,
    descricao:
      "Fundamentos da AWS: serviços principais, modelos de cobrança, boas práticas de nuvem e certificação inicial.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=aws+cloud+practitioner+introducao",
  },

  {
    id: 16,
    titulo: "Azure Fundamentals AZ-900",
    provedor: "Microsoft",
    cargaHoraria: 10,
    nivel: "iniciante",
    tags: ["azure", "cloud"],
    rating: 4.7,
    descricao:
      "Visão geral dos serviços Azure, conceitos de nuvem, segurança, gestão de custos e preparação para AZ-900.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=azure+fundamentals+az+900+resumo",
  },
  {
    id: 17,
    titulo: "UX/UI – Fundamentos e Figma",
    provedor: "Alura",
    cargaHoraria: 18,
    nivel: "iniciante",
    tags: ["ux", "ui", "figma"],
    rating: 4.8,
    descricao:
      "Princípios de UX, hierarquia visual, fluxos de navegação e criação de interfaces no Figma.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=ux+ui+fundamentos+figma+curso",
  },
  {
    id: 18,
    titulo: "Figma Avançado – Prototipagem",
    provedor: "Origamid",
    cargaHoraria: 9,
    nivel: "intermediario",
    tags: ["figma", "ui", "design"],
    rating: 4.6,
    descricao:
      "Prototipagem avançada, componentes dinâmicos, auto-layout e boas práticas para design systems no Figma.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=figma+avancado+prototipagem",
  },
  {
    id: 19,
    titulo: "DevOps com Docker e CI/CD",
    provedor: "Coursera",
    cargaHoraria: 20,
    nivel: "intermediario",
    tags: ["devops", "docker", "cicd"],
    rating: 4.7,
    descricao:
      "Criação de pipelines de entrega contínua, versionamento de imagens Docker e integração com repositórios.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=docker+devops+ci+cd+pipeline",
  },
  {
    id: 20,
    titulo: "Kubernetes Essencial",
    provedor: "Udemy",
    cargaHoraria: 16,
    nivel: "avancado",
    tags: ["kubernetes", "cloud", "devops"],
    rating: 4.8,
    descricao:
      "Conceitos de clusters, pods, deployments, services e orquestração de containers em produção.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=curso+kubernetes+essencial+basico",
  },

  {
    id: 21,
    titulo: "Machine Learning Avançado com Python",
    provedor: "Coursera",
    cargaHoraria: 28,
    nivel: "avancado",
    tags: ["ml", "python", "ia"],
    rating: 4.9,
    descricao:
      "Técnicas avançadas de ML, regularização, ensembles, tuning pesado de hiperparâmetros e avaliação robusta.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=machine+learning+avancado+python",
  },
  {
    id: 22,
    titulo: "Arquitetura de Software – Microsserviços",
    provedor: "Alura",
    cargaHoraria: 22,
    nivel: "avancado",
    tags: ["arquitetura", "microsservicos", "backend"],
    rating: 4.8,
    descricao:
      "Princípios de microsserviços, comunicação entre serviços, padrões de resiliência e desenho de APIs.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=arquitetura+de+software+microsservicos",
  },
  {
    id: 23,
    titulo: "Advanced React – Patterns e Performance",
    provedor: "Udemy",
    cargaHoraria: 14,
    nivel: "avancado",
    tags: ["react", "frontend", "performance"],
    rating: 4.7,
    descricao:
      "Padrões avançados de componentes, otimização de renderizações e boas práticas de performance em React.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=react+advanced+patterns+performance",
  },
  {
    id: 24,
    titulo: "Cloud AWS – Arquitetura Profissional",
    provedor: "AWS Academy",
    cargaHoraria: 30,
    nivel: "avancado",
    tags: ["aws", "cloud", "arquitetura"],
    rating: 4.9,
    descricao:
      "Desenho de arquiteturas escaláveis e seguras na AWS, com múltiplos serviços integrados e boas práticas.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=aws+solution+architect+overview",
  },
  {
    id: 25,
    titulo: "Data Engineering Avançado",
    provedor: "DataCamp",
    cargaHoraria: 26,
    nivel: "avancado",
    tags: ["dados", "engenharia", "etl"],
    rating: 4.8,
    descricao:
      "Pipelines de dados em produção, orquestração, ETL/ELT, data lakes e boas práticas de engenharia de dados.",
    youtubeUrl:
      "https://www.youtube.com/results?search_query=data+engineering+advanced+pipeline",
  },
];

export const usuarioDemo: Usuario = {
  id: 1,
  nome: "Marina",
  competencias: ["html", "css", "figma", "python-basico"],
  interesses: ["dados", "ia", "ux"],
  disponibilidadeSemanal: 6,
  email: "",
  ativo: "",
  dataCadastro: "",
  ultimoAcesso: null
};

export function recomendarCursos(
  user: Usuario,
  base: Curso[] = cursos
): Curso[] {
  const interesseSet = new Set([
    ...user.interesses,
    ...user.competencias.map((c: string) => c.split("-")[0]),
  ]);

  const score = (c: Curso) => {
    const match = c.tags.filter((t) => interesseSet.has(t)).length;
    const cargaOk =
      user.disponibilidadeSemanal >=
      Math.min(6, Math.ceil(c.cargaHoraria / 4))
        ? 1
        : 0;
    return match * 2 + cargaOk + c.rating / 5;
  };

  return [...base].sort((a, b) => score(b) - score(a));
}
