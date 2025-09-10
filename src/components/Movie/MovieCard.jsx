import React from 'react'
import { Link } from 'react-router-dom'
import RatingBar from '../UI/RatingBar';

const imageUrl = process.env.REACT_APP_IMG;

const MovieCard = ({movie, showLink = true}) => {
  return (
    <div className="movieCard">
        {console.log(movie)}
        <img src={imageUrl + movie.poster_path} alt={"Poster do Filme " + movie.title} />
        <h2>{movie.title}</h2>
        <RatingBar rating={Math.trunc(movie.vote_average*10)} diameter={50} />

        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  )
}

export default MovieCard;