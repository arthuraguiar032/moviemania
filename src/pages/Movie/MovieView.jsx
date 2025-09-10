import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { movieApi } from '../../api/movieApi'; // Verifique o caminho de importação
import MovieDetails from '../../components/Movie/MovieDetails';
// import LoadingSpinner from '../../components/UI/LoadingSpinner';

const MovieView = () => {
  const { id } = useParams();
  
  // Use useApi passando a função e os parâmetros corretos
  const { data: movie, loading, error } = useApi(movieApi.getMovie, [id, 'pt-BR']);

  if (loading) return  <> Carregando... </>;
  if (error) return <div>Erro ao carregar filme: {error}</div>;

  return (
    <div className="movie-view">
      {movie && <MovieDetails movie={movie} />}
    </div>
  );
};

export default MovieView;