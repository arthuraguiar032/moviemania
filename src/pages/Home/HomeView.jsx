import React from 'react';
import useApi from '../../hooks/useApi';
import { movieApi } from '../../api/movieApi';
import MovieCard from '../../components/Movie/MovieCard';

const HomeView = () => {
  // Usando o hook useApi para buscar os filmes mais bem avaliados
  const { data: topMovies, loading, error } = useApi(movieApi.getTopRated, ['pt-BR', 1], []);

  return (
    <>
      <h1>Home</h1>

      <section className="container melhores_filmes">
        <h2 className='tittle'>Melhores Filmes</h2>
        <hr />
        
        {loading && <p>Carregando...</p>}
        
        {error && (
          <div className="error-message">
            <p>Erro ao carregar filmes: {error}</p>
          </div>
        )}
        
        <div className="movies">
          {!loading && !error && topMovies && topMovies.results && (
            topMovies.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      </section>
    </>
  );
};

export default HomeView;