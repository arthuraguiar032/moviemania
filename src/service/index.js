// service/index.js
// Ponto único de importação do serviço de listas de filmes.
// Em desenvolvimento usa o mock local; em produção usa a API real.
//
// USO nos componentes:
//   import { movieListsService } from "@/service";   ← sempre esta linha

import { movieListsService as realMovieListsService } from "./tmdb_movieLists";
import { mockMovieListsService } from "./mock_movieLists";

const isDev = process.env.NODE_ENV === "development";

export { isDev }; // útil para exibir banner "MODO DEV" na UI, se quiser

export const movieListsService = isDev
  ? mockMovieListsService
  : realMovieListsService;