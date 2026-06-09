import axiosInstance, { DEFAULT_PARAMS } from "./axios";

const movieInfoRequest = async (endpoint, customParams, movie_id) => {
    const config = {
        params: {
            ...DEFAULT_PARAMS,
            ...customParams,
        },
    };

    const response = await axiosInstance.get(`/movie/${movie_id}${endpoint}`, config);
    return response.data;
};

export const movieInfoService = {
  getDetails: (movie_id, params = {}) => movieInfoRequest("", params, movie_id),

  getCredits: (movie_id, params = {}) =>
    movieInfoRequest("/credits", params, movie_id),

  getKeywords: (movie_id, params = {}) =>
    movieInfoRequest("/keywords", params, movie_id),

  getRecommendations: (movie_id, params = {}) =>
    movieInfoRequest("/recommendations", params, movie_id),

  getSimilar: (movie_id, params = {}) =>
    movieInfoRequest("/similar", params, movie_id),
};
