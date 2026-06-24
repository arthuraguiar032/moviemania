import {axiosInstance, DEFAULT_PARAMS}  from "./axios";

const movieListRequest = async (endpoint, customParams) => {
    // console.log("DEFAULT_PARAMS atual:", { ...DEFAULT_PARAMS });
    // console.log("customParams recebido:", customParams);
    
    const config = {
        params: {
            ...DEFAULT_PARAMS,
            ...customParams,
        },
    };
    

    // console.log("URL:", `/movie${endpoint}`);
    // console.log("Params:", config.params);

    const response = await axiosInstance.get(`/movie${endpoint}`, config);

    return response.data;
};

export const movieListsService = {
  getNowPlaying: (params = {}) => movieListRequest("/now_playing", params),
  getPopularMovies: (params = {}) => movieListRequest("/popular", params),
  getTopRated: (params = {}) => movieListRequest("/top_rated", params),
  getUpcoming: (params = {}) => movieListRequest("/upcoming", params),
};


