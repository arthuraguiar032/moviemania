import React from 'react'
import { Link } from 'react-router-dom'
import RatingBar from './RatingBar';

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({movie, showLink = true}) => {
  return (
    <div className="movieCard">
        <img src="{imageUrl + movie.poster_path}" alt="Poster do Filme {movie.tittle}" />
        <h2>{movie.tittle}</h2>
        <RatingBar rating={movie.vote_average} diameter={50} />

        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  )
}

export default MovieCard