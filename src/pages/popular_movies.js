import TmdbImage from "@/components/ui/TmdbImage";

import { useEffect, useState } from "react";

import styles from '@/styles/popular_movies.module.css';
import Link from "next/link";
import { movieListsService } from "@/service/tmdb_movieLists";
import Pagination from "@/components/layout/Pagination";


const MOVIES_PER_PAGE = 40;

const PopularMovies = () => {

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // const lastMovieIndex = currentPage * MOVIES_PER_PAGE;
    // const firstMovieIndex = lastMovieIndex - MOVIES_PER_PAGE;

    const [totalResults, setTotalResults] = useState(1);
  
  useEffect(() => {
    const testApi = async () => {

      try{
        //cada chamada a api retorna apenas 20 resultados, como quero 40 por pagina é preciso concatenar
        const [page1, page2] = await Promise.all(
          [
          movieListsService.getPopularMovies( {page: currentPage } ),
          movieListsService.getPopularMovies( {page: currentPage + 1 } ),
        ]
        );
        setTotalResults(page1.total_results);
        setMovies([...page1.results, ...page2.results])

      } catch (error) {
        console.log("ERRO AO ACESSAR A API", error);
      }
    };

    testApi();
  }, [currentPage]);

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
              <div className={styles.movieCard}  >
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

      <div className={styles.pages}>
        <hr />
        <Pagination
          totalPosts={totalResults}
          postsPerPage={MOVIES_PER_PAGE}
          setPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default PopularMovies;