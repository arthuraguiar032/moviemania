import React from "react";
import '../../styles/moviecontent.scss'
import useApi from '../../hooks/useApi';
import { movieApi } from '../../api/movieApi';
import { buildImageUrl, TmdbImage } from "../../utils/imageUtils";

function MovieDetails({movie}) {

  const { data: movieCredits, loading, error } = useApi(movieApi.getMovieCredits, [movie.id, 'pt-BR'], []);

  return (
    <div className="movieContainer">
        {console.log(movieCredits)}
        {console.log(movie)}

        <section className="movieBackimage">
          <TmdbImage
            path={movie.backdrop_path}
            alt={`Foto de fundo do filme ${movie.title}`}
            type="backdrop"
            size="large"
          />
        </section>
        
        <div className="movieContent">
          <section className="movieDetails">
            <h1>{movie.original_title}</h1>
            <h2>{movie.title}</h2>

            <TmdbImage
              path={movie.poster_path}
              alt={`Poster do filme ${movie.title}`}
              type="poster"
              size="medium"
            />

            <h2>{movie.tagline}</h2>
            <p>{movie.overview}</p>

            <p>{movie.release_date}</p>
            <p>{movie.runtime} minutos</p>
            <p>{movie.vote_average} / 10</p>
            <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>
            <p>{movie.production_countries.map((country) => country.name).join(', ')}</p>
            <p>{movie.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            <p>{movie.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          </section>

          <section className="movieCredits">

            <section className="casting">
              <h2>Elenco</h2>
              <hr />
              {loading && <p>Carregando elenco...</p>}
              {error && (
                <div className="error-message">
                  <p>Erro ao carregar elenco: {error}</p>
                </div>
              )}
              <div className="cast-list">
                {!loading && !error && movieCredits && movieCredits.cast && (
                  movieCredits.cast.slice(0, 10).map((castMember) => (
                    <div key={castMember.cast_id} className="cast-member">
                      <p>{castMember.name} as {castMember.character}</p>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="crew">
              <h2>Equipe Técnica</h2>
              <hr />
              {loading && <p>Carregando equipe técnica...</p>}
              {error && (
                <div className="error-message">
                  <p>Erro ao carregar equipe técnica: {error}</p>
                </div>
              )}
              <div className="crew-list">
                {!loading && !error && movieCredits && movieCredits.crew && (
                  movieCredits.crew.slice(0, 10).map((crewMember) => (
                    <div key={crewMember.credit_id} className="crew-member">
                      <p>{crewMember.name} - {crewMember.job}</p>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="moreDetails"></section>

          </section>

        </div>

    </div>
  )};

export default MovieDetails;