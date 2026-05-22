import axios from "axios";


const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const axiosInstance = axios.create({
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

export default axiosInstance;
