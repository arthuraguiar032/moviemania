import { movieListsService } from "@/service/tmdb_movieLists";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from '@/styles/Movies.module.css';
import Pagination from "@/components/layout/Pagination";
import MovieGrid from "@/components/layout/MovieGrid";

//mapeamento de quais paginas serao aceitas
const PAGE_CONFIG = {
  popular: {
    title: "Filmes Populares",
    fetchFn: (params) => movieListsService.getPopularMovies(params),
  },
  upcoming: {
    title: "Em breve...",
    fetchFn: (params) => movieListsService.getUpcoming(params),
  },
  now_playing: {
    title: "Em cartaz...",
    fetchFn: (params) => movieListsService.getNowPlaying(params),
  },
  top_rated: {
    title: "Filmes mais bem avaliados",
    fetchFn: (params) => movieListsService.getTopRated(params),
  },
};

const MOVIES_PER_PAGE = 40;

const MoviesType = () => {
  const router = useRouter();
  const { type } = router.query;
  const [totalResults, setTotalResults] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const moviesCacheRef = useRef([]);
  const apiPageRef = useRef(1);

  useEffect(() => {
    moviesCacheRef.current = [];
    apiPageRef.current = 1;
    setMovies([]);
    setCurrentPage(1);
    setTotalResults(0);
  }, [type]);

  useEffect(() => {
    if (!type) return;

    const loadMoreMovies = async () => {
      const start = (currentPage - 1) * MOVIES_PER_PAGE;
      const end = start + MOVIES_PER_PAGE;

      while (moviesCacheRef.current.length < end) {
        const response = await PAGE_CONFIG[type].fetchFn({
          page: apiPageRef.current
        });

        if (!response.results?.length) break;

        if (apiPageRef.current === 1) {
          setTotalResults(response.total_results);
        }

        const merged = [
          ...moviesCacheRef.current,
          ...response.results
        ];

        moviesCacheRef.current = Array.from(
          new Map(
            merged.map(movie => [movie.id, movie])
          ).values()
        );

        apiPageRef.current++;
      }

      setMovies(moviesCacheRef.current.slice(start, end));
    };

    loadMoreMovies();

  }, [currentPage, type]);

  if (type && !PAGE_CONFIG[type]) {
    router.push("/404");
    return null;
  }


  return (
    <div className={styles.resultsContainer}>
      <div className={styles.heading}>
        {PAGE_CONFIG[type] && <h1> {PAGE_CONFIG[type].title}</h1>}
        <hr />
      </div>

      <MovieGrid movies={movies} />

      <div className={styles.pages}>
        <hr />
        {movies?.length > 0 &&

          <Pagination
            totalPosts={totalResults}
            postsPerPage={MOVIES_PER_PAGE}
            setPage={setCurrentPage}
            currentPage={currentPage}
          />}
      </div>
    </div>
  );

};

export default MoviesType;