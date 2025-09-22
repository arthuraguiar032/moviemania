import React from 'react';
import {TmdbImage} from '../../../../utils/imageUtils';


const MovieHeader = ({movie, directorsContent}) => {

    return (
        <section className="movieDetails">
            <TmdbImage
                path={movie.poster_path}
                alt={`Poster do filme ${movie.title}`}
                type="poster"
                size="medium"
            />

            <div className="movieInformacoes">
                <div className="movie titulo">
                <h1 className="movieTitle">
                    {movie.title}  
                    <span className="movieYear">({new Date(movie.release_date).getFullYear()})</span>
                </h1>
                <p className="movieDiretor">{directorsContent}</p>
                </div>
                
                <h2 className="movieTagline">{movie.tagline}</h2>
                <p className="sinopse">{movie.overview}</p>
                <p className="movieDuracao">{movie.runtime} minutos</p>

                <div className="movieClassificacao">
                <p>Avaliação dos Usuários</p>
                <p>{movie.vote_average} / 10</p>
                </div>

                <button className="movieAvaliar">Avaliar</button>
            </div>
        </section>
    );

};

export default MovieHeader;