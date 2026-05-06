import axiosInstance from "./axios";


export const movieListsService = {
    getNowPlaying: async (page = 1) => {
        const response = await axiosInstance.get('/movie/now_playing', {
            params: {page}
        });

        return response.data.results;
    },

    getPopularMovies: async (page = 1) => {
        const response = await axiosInstance.get('/movie/popular', {
            params: {page}
        });

        return response.data.results;
    },

    getTopRated: async (page = 1) => {
        const response = await axiosInstance.get("/movie/top_rated", {
          params: { page },
        });

        return response.data.results;
    },

    getUpcoming: async (page = 1) => {
        const response = await axiosInstance.get("/movie/upcoming", {
          params: { page },
        });

        return response.data.results;
    },
};