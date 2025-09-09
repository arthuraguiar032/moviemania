// Configuração base da Api do TMDB

const BASE_URL = process.env.REACT_APP_API;
const API_KEY = process.env.REACT_APP_API_KEY_ACCESS;

//configuração padrao
const defaultOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

//funcao para fazer requisicoes
export const fetchFromApi = async(endpoint, options = {}) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url, {...defaultOptions, ...options});

        if(!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        return await response.json();;
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        throw error;
    }
};

// utilitário para construir query strings
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });
  
  return searchParams.toString();
};
