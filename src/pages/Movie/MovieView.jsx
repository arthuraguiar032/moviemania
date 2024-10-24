import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

import MovieDetails from '../../components/MovieDetails'

const movieUrl = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_API_KEY_ACCESS;

const MovieView = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url, options) => {
    try {
      const response = await fetch(url, options);

      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setMovie(data);

    } catch (error) {
      console.error("Erro ao buscar filme:", error);
      return null; // Retorna null em caso de erro
    }
  };

  useEffect(() => {
    const movieURL = `${movieUrl}${id}?language=pt-BR`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey}
    };

    getMovie(movieURL, options);
  }, [id]);


  return (
    <div>MovieView

      {movie ? <MovieDetails movie={movie} /> : <p>Carregando...</p>}
      

    </div>
  )
}

export default MovieView;