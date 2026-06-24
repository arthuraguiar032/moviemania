import popularMovies  from "@/mock/popular_movies.json";
import upcomingMovies from "@/mock/upcoming_movies.json";
import nowPlaying     from "@/mock/now_playing_movies.json";
import topRated       from "@/mock/top_rated_movies.json";
import { ITEMS_PER_PAGE } from ".";

const MOCK_DATA = {
  popular:     popularMovies,
  upcoming:    upcomingMovies,
  now_playing: nowPlaying,
  top_rated:   topRated,
};

// Replica a assinatura de movieListRequest: recebe endpoint e params como objeto estruturado
const mockListRequest = (type, params = {}) => {
  const data = MOCK_DATA[type];
  const { page = 1 } = params;

  if (!data) {
    return Promise.reject(new Error(`[MOCK] Tipo desconhecido: "${type}"`));
  }

  const start   = (page - 1) * ITEMS_PER_PAGE;
  const results = data.results.slice(start, start + ITEMS_PER_PAGE);

  return Promise.resolve({
    page,
    results,
    total_results: data.total_results ?? data.results.length,
    total_pages:   data.total_pages   ?? Math.ceil(data.results.length / perPage),
  });
};

// Mesma interface e estilo de exportação do movieListsService real
export const mockMovieListsService = {
  getNowPlaying:   (params = {}) => mockListRequest("now_playing", params),
  getPopularMovies:(params = {}) => mockListRequest("popular",     params),
  getTopRated:     (params = {}) => mockListRequest("top_rated",   params),
  getUpcoming:     (params = {}) => mockListRequest("upcoming",    params),
};