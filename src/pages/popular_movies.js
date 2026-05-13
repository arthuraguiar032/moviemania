// import styles from '@/styles/popular_movies.module.css';
// import { movieListsService } from "@/service/tmdb_movieLists";
import TmdbImage from "@/components/ui/TmdbImage";

import { useEffect, useState } from "react";
import mockData from '@/mock/popular_movies.json'


const PopularMovies = () => {
  
//   useEffect(() => {
//     const testApi = async () => {
//       try{
//         const movies = await movieListsService.getPopularMovies({
//           //opcional
//           page: 1,
//         });
//         console.log(movies);
//       } catch (error) {
//         console.log("ERRO AO ACESSAR A API", error)
//       }
//     };

//     testApi();
//   }, []);

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const mockApi = () => {
            console.log(mockData.results);
            setMovies(mockData.results);
        };
        
        mockApi();

    }, []);

    const truncate_date = (date) => date.slice(0, 4);

  return (
    <div className="mainContainer">
      <div className="head">
        <h1> Filmes Populares</h1>
      </div>
      <hr />

      <div className="resultados">
        {movies.map( movie => {
            return (
              <div className="movie" key={movie.id} style={{width: '200px'}}>
                <TmdbImage path={movie.poster_path} size="lg" type="poster" alt={`Poster ${movie.title}`} width={1000} />
                <p>Titulo: {movie.title}</p>
                <p>Data: {truncate_date(movie.release_date)}</p>
              </div>
            );
        })}
      </div>

      <hr />
      <div className="paginacao"></div>
    </div>
  );
};

export default PopularMovies;