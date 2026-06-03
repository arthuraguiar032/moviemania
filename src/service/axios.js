import axios from "axios";

// TODO: VIRAR CONTEXT DO PROJETO, USUARIO ESCOLHER REGIAO E LINGUA
export const DEFAULT_PARAMS = {
  language: "en-US",
  region: "US",
  page: 1,
};

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const axiosInstance = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        'accept': 'application/json'
    },
    timeout: 5000,
});


axiosInstance.interceptors.request.use(config => {
    if (TMDB_API_KEY) {
        config.headers.Authorization = `Bearer ${TMDB_API_KEY}`;
    }

    return config;
});
