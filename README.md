# 🎬 MovieMania

Aplicação web de descoberta de filmes, construída com **Next.js**, **React** e **CSS Modules**, consumindo a API do [TMDB](https://www.themoviedb.org/).

---

## Tecnologias

- [Next.js](https://nextjs.org/) — Pages Router
- [React 19](https://react.dev/)
- CSS Modules
- [Axios](https://axios-http.com/) — requisições HTTP
- [TMDB API](https://developer.themoviedb.org/docs) — dados de filmes

---

## Como rodar localmente

**Pré-requisitos:** Node.js >= 20.9.0

```bash
# Clone o repositório
git clone https://github.com/arthuraguiar032/moviemania.git
cd moviemania

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o .env.local com suas credenciais do TMDB

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_API_KEY=sua_chave_aqui
```

Para obter uma chave de API, crie uma conta em [themoviedb.org](https://www.themoviedb.org/) e acesse as configurações de API.

---

## Estrutura do projeto

```
src/
├── components/
│   ├── layout/        # Componentes estruturais
│   └── ui/            # Componentes reutilizáveis
├── pages/             # Rotas do Next.js
├── service/           # Camada de comunicação com a API
├── styles/            # Estilos globais
└── utils/             # Funções utilitárias (formatadores, helpers de imagem)
```

---

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Lint do código
```

---

## Autor

Feito por [Arthur Aguiar](https://github.com/arthuraguiar032) como projeto de aprendizado em desenvolvimento frontend.
