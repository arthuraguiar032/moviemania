// import styles from '@/styles/popular_movies.module.css';
// import { movieListsService } from "@/service/tmdb_movieLists";
import TmdbImage from "@/components/ui/TmdbImage";

import { useEffect, useState } from "react";
import mockData from '@/mock/popular_movies.json'

import styles from '@/styles/popular_movies.module.css';
import Link from "next/link";


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
    <div className={styles.resultsContainer}>
      <div className={styles.heading}>
        <h1> Filmes Populares</h1>
        <hr />
      </div>

      <div className={styles.resultsMovies}>
        {movies.map((movie) => {
          return (
            // TODO: adicionar rota dinamica
            <Link href="/" key={movie.id}>
              <div className={styles.movieCard} style={{ width: "200px" }}>
                <div className={styles.moviePoster}>
                  <TmdbImage
                    path={movie.poster_path}
                    size="lg"
                    type="poster"
                    alt={`Poster ${movie.title}`}
                    width={1000}
                  />
                </div>
                <strong>{movie.title}</strong>
                <p>{`(${truncate_date(movie.release_date)})`}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <hr />
      <div className="paginacao"></div>
    </div>
  );
};

export default PopularMovies;