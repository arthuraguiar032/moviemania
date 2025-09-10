import React from "react";
import '../../styles/moviecontent.scss'

function MovieContent({movie}) {
  return (
    <>
        {/* <div className="imageMovie">
        </div> */}
        {console.log(movie)}

        <div className="movieContent">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>

        </div>
    </>
  )};

export default MovieContent;