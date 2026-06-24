import { movieListsService as realMovieListsService } from "./tmdb_movieLists";
import { mockMovieListsService } from "./mock_movieLists";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

const isDev = process.env.NODE_ENV === "development";

export { isDev }; // útil para exibir banner "MODO DEV" na UI, se quiser

export const movieListsService = isDev
  ? mockMovieListsService
  : realMovieListsService;

export const ITEMS_PER_PAGE = 20;