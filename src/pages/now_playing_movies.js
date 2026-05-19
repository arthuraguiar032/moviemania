import Pagination from "@/components/layout/Pagination";
import TmdbImage from "@/components/ui/TmdbImage";
import { movieListsService } from "@/service/tmdb_movieLists";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "@/styles/upcoming_movies.module.css";

const MOVIES_PER_PAGE = 40;

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const conectionApi = async () => {
      try {
        const [page1, page2] = await Promise.all([
          movieListsService.getNowPlaying({ page: currentPage }),
          movieListsService.getNowPlaying({ page: currentPage + 1 }),
        ]);

        setTotalResults(page1.total_results);
        setMovies([...page1.results, ...page2.results]);
      } catch (error) {
        console.log("Erro ao conectar com a API: ", error);
      }
    };

    conectionApi();
  }, [currentPage]);

  const truncate_date = (date) => date.slice(0, 4);

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.heading}>
        <h1> Em cartaz...</h1>
        <hr />
      </div>

      <div className={styles.resultsMovies}>
        {movies.map((movie) => {
          return (
            <Link href="/" key={movie.id}>
              <div className={styles.movieCard}>
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

export default NowPlaying;
