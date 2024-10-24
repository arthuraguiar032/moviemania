import React from 'react';
import { useEffect, useState } from 'react';
// import RatingBar from '../../components/RatingBar'
import MovieCard from '../../components/MovieCard'

const movieUrl = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_API_KEY_ACCESS;

const HomeView = () => {
  
  const getTopMovies = async (url, options) => {
    try {
      const response = await fetch(url, options);
  
      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setTopMovies(data.results);

    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      return null; // Retorna null em caso de erro
    }
  };
  
  const [topMovies, setTopMovies] = useState([]);


  useEffect(() => {
    const topRatedURL = movieUrl+'top_rated?language=pt-BR&page=1'
    
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey
      }
    };
    
    getTopMovies(topRatedURL, options);

  }, []);
  
  return (
    <>
      <h1>Home</h1>

      <section className="container melhores_filmes">
        <h2 className='tittle'>Melhores Filmes</h2>
        <hr />
        <div className="movies">
          {topMovies.length === 0 ? 
          <p>Carregando...</p> :
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          }

        </div>

      </section>
    </>
    
  )
}

export default HomeView