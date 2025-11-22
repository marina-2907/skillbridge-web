# SkillBridge – Plataforma de Trilhas de Aprendizado com IA

Aplicação front-end desenvolvida em **React + TypeScript + Vite**, que simula uma plataforma de recomendações de trilhas de aprendizado personalizadas, usando IA para conectar pessoas a cursos e conteúdos alinhados aos seus objetivos de carreira.

Este projeto foi desenvolvido como parte das atividades acadêmicas da **FIAP**, com foco em **Front-End, UI/UX e Integração com Banco de Dados**.

---

<<<<<<< HEAD
##  Objetivo do Projeto
=======
## 🎯 Objetivo do Projeto
>>>>>>> dd535d8 (feat: atualiza projeto skillbridge-web)

A SkillBridge nasce para resolver um problema comum:  
> *“Existe conteúdo demais, pouca direção e nenhuma trilha clara de aprendizado.”*

A proposta é oferecer uma experiência onde o usuário:

- Informa seu **perfil e objetivos**
- Recebe **recomendações de cursos**
- Acompanha sua **trilha de aprendizado**
- Tem acesso a uma navegação moderna, responsiva e agradável

---

<<<<<<< HEAD
##  Principais Funcionalidades (Front-End)
=======
## 🖥️ Principais Funcionalidades (Front-End)
>>>>>>> dd535d8 (feat: atualiza projeto skillbridge-web)

- **Navbar responsiva** com:
  - Logo SkillBridge
  - Links: Início, Catálogo, Recomendações, Minha Trilha, FAQ, Contato, Integrantes, Perfil
  - Botão de **Login** em destaque
  - Menu mobile em tela cheia

- **Home**
  - Apresentação da plataforma
  - Identidade visual na paleta azul SkillBridge

- **Catálogo**
  - Listagem de cursos em cards
  - Layout em grid, responsivo e organizado

- **Recomendações**
  - Área dedicada às recomendações de cursos geradas com base no perfil do usuário (simulado no front)

- **Minha Trilha**
  - Visualização da jornada de aprendizado do usuário
  - Organização por etapas/trilhas

- **Perfil**
  - Dados do usuário (nome, e-mail, etc.)
  - Espaço para favoritos / trilhas (simulados)

- **FAQ**
  - FAQ interativo com acordeão
  - Filtro por categoria (Geral, Plataforma, Conta)
  - Conteúdo organizado e fácil de navegar

- **Contato**
  - Formulário com:
    - Nome
    - E-mail
    - Tipo de mensagem (dúvida, sugestão, bug, etc.)
    - Campo de mensagem
  - Simulação de envio com feedback visual

- **Integrantes**
  - Cards com foto, nome, RM/turma
  - Botões com links para **LinkedIn** e **GitHub** de cada membro

---

<<<<<<< HEAD
##  Tecnologias Utilizadas

-  **React** (com **TypeScript**)
-  **Vite**
-  **TailwindCSS**
-  **React Router DOM**
-  **Lucide React** (ícones)
-  ESLint (config padrão Vite/TS)  
-  HTML5, CSS3, JavaScript (ES6+)

---

##  Estrutura Geral do Projeto
=======
## 🛠️ Tecnologias Utilizadas

- ⚛ **React** (com **TypeScript**)
- ⚡ **Vite**
- 🎨 **TailwindCSS**
- 🧭 **React Router DOM**
- 🔣 **Lucide React** (ícones)
- 🧹 ESLint (config padrão Vite/TS)  
- 🌐 HTML5, CSS3, JavaScript (ES6+)

---

## 📁 Estrutura Geral do Projeto
>>>>>>> dd535d8 (feat: atualiza projeto skillbridge-web)

```bash
skillbridge-web/
├─ public/
│  ├─ logo.png
│  ├─ aluno1.jpeg
│  ├─ aluno2.jpg
│  └─ aluno3.jpg
├─ src/
│  ├─ components/
│  │  ├─ Navbar.tsx
│  │  └─ Footer.tsx
│  ├─ pages/
│  │  ├─ Home.tsx
│  │  ├─ Catalogo.tsx
│  │  ├─ Login.tsx
│  │  ├─ Perfil.tsx
│  │  ├─ Recomendacoes.tsx
│  │  ├─ Trilha.tsx
│  │  ├─ Faq.tsx
│  │  └─ Contato.tsx
│  │  └─ Integrantes.tsx
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ styles / config do Tailwind
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js / tailwind.config.ts
└─ vite.config.ts


<<<<<<< HEAD
- Como Rodar o Projeto Localmente
=======
🚀 Como Rodar o Projeto Localmente
>>>>>>> dd535d8 (feat: atualiza projeto skillbridge-web)

1️⃣ Clonar o repositório

bash
Copiar código
git clone https://github.com/marina-2907/skillbridge-web.git 
cd skillbridge-web

2️⃣ Instalar dependências

bash
Copiar código
npm install

3️⃣ Rodar em ambiente de desenvolvimento

bash
Copiar código

npm run dev

Depois, acesse:

text
Copiar código
http://localhost:5173
(porta padrão do Vite – pode variar)

<<<<<<< HEAD
 Scripts Disponíveis
=======
🧪 Scripts Disponíveis
>>>>>>> dd535d8 (feat: atualiza projeto skillbridge-web)
No package.json, você encontra alguns scripts úteis:

bash
Copiar código
npm run dev      
npm run build    
npm run preview 
npm run lint     


<<<<<<< HEAD
- Equipe

* Nome	RM / Turma	GitHub	LinkedIn

Bruno Vinicius Barbosa	566366 / 1TDSPY	 ---- https://github.com/brunovinicius02	https://www.linkedin.com/in/brunovbarbosaa
João Pedro Bitencourt Goldoni	564339 / 1TDSPX	----- https://github.com/JoaoPedroBitencourtGoldoni	https://www.linkedin.com/in/joaopedrogoldoni
Marina Tamagnini Magalhães	561786 / 1TDSPX ----	https://github.com/marina-2907/marina	https://www.linkedin.com/in/marina-t-36b14328b

- Contexto Acadêmico
=======
👥 Equipe

* Nome	RM / Turma	GitHub	LinkedIn

Bruno Vinicius Barbosa	566366 / 1TDSPY	https://github.com/brunovinicius02	https://www.linkedin.com/in/brunovbarbosaa
João Pedro Bitencourt Goldoni	564339 / 1TDSPX	https://github.com/JoaoPedroBitencourtGoldoni	https://www.linkedin.com/in/joaopedrogoldoni
Marina Tamagnini Magalhães	561786 / 1TDSPX	https://github.com/marina-2907/marina	https://www.linkedin.com/in/marina-t-36b14328b

📚 Contexto Acadêmico
>>>>>>> dd535d8 (feat: atualiza projeto skillbridge-web)
Este projeto faz parte do desenvolvimento integrado das disciplinas de:

Building Relational Database

Front-End / React

Outras disciplinas correlatas no semestre (UI/UX, Engenharia de Software, etc.)

O foco do repositório é a camada de front-end, mas o sistema foi pensado para integração com uma API e banco de dados Oracle, modelados à parte.

<<<<<<< HEAD
- Observações
=======
📌 Observações
>>>>>>> dd535d8 (feat: atualiza projeto skillbridge-web)
O sistema é um protótipo acadêmico, sem fins comerciais.

Alguns fluxos (login, envio de formulário, recomendações de IA) são simulados no front-end.

Melhorias futuras podem incluir:

Integração real com back-end / API

Autenticação JWT

Recomendações dinâmicas a partir de dados reais

<<<<<<< HEAD
Links Importantes

 Repositório no GitHub
https://github.com/marina-2907/skillbridge-web

 Vídeo de Apresentação (YouTube)
https://youtu.be/zNGS5CmAJ2w

 Deploy no Vercel
=======
* Links Importantes

📦 Repositório no GitHub
https://github.com/marina-2907/skillbridge-web

▶️ Vídeo de Apresentação (YouTube)
https://youtu.be/zNGS5CmAJ2w

🌐 Deploy no Vercel
>>>>>>> dd535d8 (feat: atualiza projeto skillbridge-web)
https://skillbridge-web-indol.vercel.app



💙 Agradecimentos
<<<<<<< HEAD
Agradecemos à FIAP e aos professores envolvidos pela orientação e pela oportunidade de desenvolver um projeto completo, unindo design, código e modelagem de dados.
=======
Agradecemos à FIAP e aos professores envolvidos pela orientação e pela oportunidade de desenvolver um projeto completo, unindo design, código e modelagem de dados.
>>>>>>> dd535d8 (feat: atualiza projeto skillbridge-web)
