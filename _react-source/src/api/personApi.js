import { fetchFromApi, buildQueryString } from './tmdbApi';


export const personApi = {
    // Buscar detalhes de uma pessoa específica
    getPersonDetails: (id, language = 'pt-BR') => {
      const queryParams = buildQueryString({ language });
      return fetchFromApi(`/person/${id}?${queryParams}`);
    },

    // Buscar créditos de filmes uma pessoa específica
    getPersonCredits: (id, language = 'pt-BR') => {
        const queryParams = buildQueryString({ language });
        return fetchFromApi(`/person/${id}/movie_credits?${queryParams}`);
    },
};

