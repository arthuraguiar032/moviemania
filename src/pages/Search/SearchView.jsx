import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import  MovieCard  from '../../components/MovieCard'

const searchUrlBase = process.env.REACT_APP_SEARCH
const apiKey = process.env.REACT_APP_API_KEY_ACCESS

const SearchView = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [SearchMovies, setSearchMovies] = useState([]);

  const getSearchResults = async (url, options) => {
    try {
        const response = await fetch(url, options);

        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setSearchMovies(data.results);
        
    }catch (error) {
        console.error("Erro ao buscar filmes:", error);
        return null; // Retorna null em caso de erro
    }
  };

  useEffect(() => {
    const searchUrl = searchUrlBase + "?query=" + query + "&include_adult=true&language=pt-BR&page=1";
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + apiKey
        }
    };
      
    getSearchResults(searchUrl, options);
  }, [query]);

  return (
    <div className="SearchView">
        <h2>Resultados para: <span className='queryText'>{query}</span></h2>
        <div className="movies-results">
            { SearchMovies.length === 0 ?
            <p>Carregando...</p> :
            SearchMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            }
        </div>
    </div>
  )
}

export default SearchView