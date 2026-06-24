import {DEFAULT_PARAMS, axiosInstance} from "./axios";

const searchRequest = async (endpoint, customParams) => {
    const config = {
        params: {
            ...DEFAULT_PARAMS,
            ...customParams
        }
    };

    const response = await axiosInstance.get(`/search${endpoint}`, config);
    return response.data;
};


export const searchService = {
  movie: (search, params = {}) =>
    searchRequest(`/movie?query=${search}`, params),
  person: (search, params = {}) =>
    searchRequest(`/person?query=${search}`, params),
  collection: (search, params = {}) =>
    searchRequest(`/collection?query=${search}`, params),
};