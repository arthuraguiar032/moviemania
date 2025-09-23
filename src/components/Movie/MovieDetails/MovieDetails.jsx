import React from "react";
import styles from './MovieDetails.module.css';

import useApi from '../../../hooks/useApi';
import { movieApi } from '../../../api/movieApi';

import {MovieHeader} from './MovieHeader';
import {MovieCast} from './MovieCast';
import {MovieCrew} from './MovieCrew';
import {MovieInfo} from './MovieInfo';
import { MovieBackImage } from './MovieBackImage';
import {ContainerBox} from '../../UI/ContainerBox';

// import MovieInfo from './MovieInfo/MovieInfo';

function MovieDetails({ movie }) {
  
  const { data: movieCredits, loading: creditsLoading, error: creditsError } = useApi(
    movieApi.getMovieCredits, 
    [movie.id, 'pt-BR'], 
    null
  );
  
  const renderDiretores = () => {
    if (creditsLoading) return <p>Carregando diretores...</p>;
    if (creditsError) return <p>Erro ao carregar diretores: {creditsError}</p>;
    if (!movieCredits || !movieCredits.crew) return <p>Informações de direção não disponíveis.</p>;
    
    const diretores = movieCredits.crew.filter(member => member.job === 'Director');
    
    if (diretores.length === 0) return <p>Nenhum diretor encontrado.</p>;
    
    return (
      <>
        {diretores.length > 1 ? 'Diretores: ' : 'Diretor: '}
        {diretores.map((director) => director.name).join(', ')}
      </>
    );
  };

  return (
    <div className={styles.movieDetails}>
      
      <MovieBackImage
        className={styles.backdropImage}
        path={movie.backdrop_path} 
        alt={`Foto de fundo do filme ${movie.title}`} 
      />

      <ContainerBox className={styles.containerInfoFilme}>
         <div className="movieContent">
        <MovieHeader movie={movie} directorsContent={renderDiretores()} />
        
        <div className="secondary-sections">
          
          <MovieCast 
            cast={movieCredits?.cast} 
            loading={creditsLoading} 
            error={creditsError} 
          />
          
          <MovieCrew 
            crew={movieCredits?.crew} 
            loading={creditsLoading} 
            error={creditsError} 
          />
          
          <MovieInfo movie={movie} />
        </div>

      </div>
      </ContainerBox>
      
     
    </div>
  );
}

export default MovieDetails;