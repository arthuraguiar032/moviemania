import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import MovieContent from '../../components/MovieDetails'

const MovieView = () => {
  const { id } = useParams();

  return (
    <div>MovieView

      <MovieContent id={id} />

    </div>
  )
}

export default MovieView