import { fetchFromApi, buildQueryString } from './tmdbApi';

export const movieApi = {
  // Buscar detalhes de um filme específico
  getMovie: (id, language = 'pt-BR') => {
    const queryParams = buildQueryString({ language });
    return fetchFromApi(`/movie/${id}?${queryParams}`);
  },

  // Buscar créditos de um filme específico
  getMovieCredits: (id, language = 'pt-BR') => {
    const queryParams = buildQueryString({ language });
    return fetchFromApi(`/movie/${id}/credits?${queryParams}`);
  },

  // Titulo Alternativo em Português
  getAlternativeTitles: (id, country = 'BR') => {
    const queryParams = buildQueryString({ country });
    return fetchFromApi(`/movie/${id}/alternative_titles?${queryParams}`);
  },
  
  // Buscar filmes em cartaz
  getNowPlaying: (language = 'pt-BR', page = 1) => {
    const queryParams = buildQueryString({ language, page });
    return fetchFromApi(`/movie/now_playing?${queryParams}`);
  },

  // Buscar filmes populares
  getPopular: (language = 'pt-BR', page = 1) => {
    const queryParams = buildQueryString({ language, page });
    return fetchFromApi(`/movie/popular?${queryParams}`);
  },

  // Buscar filmes de proximas estreias
  getUpcoming: (language = 'pt-BR', page = 1) => {
    const queryParams = buildQueryString({ language, page });
    return fetchFromApi(`/movie/upcoming?${queryParams}`);
  },

  // Buscar filmes mais votados
  getTopRated: (language = 'pt-BR', page = 1) => {
    const queryParams = buildQueryString({ language, page });
    return fetchFromApi(`/movie/top_rated?${queryParams}`);
  },
  
  // Buscar por filmes (search)
  searchMovies: (query, language = 'pt-BR', page = 1) => {
    const queryParams = buildQueryString({ query, language, page });
    return fetchFromApi(`/search/movie?${queryParams}`);
  },
  
};