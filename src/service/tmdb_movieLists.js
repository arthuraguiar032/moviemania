import axiosInstance from "./axios";

// TODO: VIRAR CONTEXT DO PROJETO, USUARIO ESCOLHER REGIAO E LINGUA
const DEFAULT_PARAMS = {
    language: 'en-US',
    region: 'US',
    page: 1,
};

const movieRequest = async (endpoint, customParams) => {
    const response = await axiosInstance.get(`/movie${endpoint}`, {
        params: {
            ...DEFAULT_PARAMS,
            ...customParams,
        },
    });
    return response.data;
};

export const movieListsService = {
  getNowPlaying: (params = {}) => movieRequest("/now_playing", params),
  getPopularMovies: (params = {}) => movieRequest("/popular", params),
  getTopRated: (params = {}) => movieRequest("/top_rated", params),
  getUpcoming: (params = {}) => movieRequest("/upcoming", params),
};
