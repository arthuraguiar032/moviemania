import { movieListsService } from "@/service/tmdb_movieLists";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
    const {type} = router.query;
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage]= useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // puxar filmes da api dependendo da rota e da pagina que vc esta
    useEffect(() => {
      const connectionApi = async () => {
        try {
          const [page1, page2] = await Promise.all([
            PAGE_CONFIG[type].fetchFn({ page: currentPage }),
            PAGE_CONFIG[type].fetchFn({ page: currentPage + 1}),
          ]);

          setTotalResults(page1.total_results);
          setMovies([...page1.results, ...page2.results]);

        } catch (error) {
          console.log("Erro ao acessar a API: ", error);
        }
      };

      connectionApi();
    }, [currentPage, type]);

    // TODO: tornar essa atualização algo idiomatico em react, ES6 Lint esta reclamando
    //alterar pagina inicial ao mudar de rota e nao ficar preso na msm pagina
    useEffect(() => {
      setCurrentPage(1);
    }, [type]);


    if (type && !PAGE_CONFIG[type]) {
      router.push("/404");
      return null;
    }


    return (
      <div className={styles.resultsContainer}>
        <div className={styles.heading}>
          {PAGE_CONFIG[type] &&<h1> {PAGE_CONFIG[type].title}</h1>}
          <hr />
        </div>

        <MovieGrid movies={movies}/>

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

export default MoviesType;