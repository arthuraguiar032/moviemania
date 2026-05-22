import MovieGrid from "@/components/layout/MovieGrid";
import Pagination from "@/components/layout/Pagination";
import { searchService } from "@/service/tmdb_search";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from '@/styles/Movies.module.css'

const MOVIES_PER_PAGE = 40;

const SearchPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('q');
    const router = useRouter();
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage]= useState(1);
    const [totalResults, setTotalResults] = useState(0);

  // puxar filmes da api dependendo da rota e da pagina que vc esta
    useEffect(() => {
      const connectionApi = async () => {
        try {
          const page1 = await searchService.movie(search, {page: currentPage});
          let allResults = page1.results;

          let page2= {};
          if (page1.total_results > 20){
            page2 = await searchService.movie(search, { page: currentPage+1 });
            allResults =  [...allResults, ...page2.results];
          }

          setMovies(allResults);
          setTotalResults(page1.total_results);  
        } catch (error) {
          console.log("Erro ao acessar a API: ", error);
        }
      };
  
        connectionApi();
      }, [currentPage, search]);

    if (!searchParams) {
      // Render fallback UI while search params are not yet available
      return null;
    }

    return (
      <div className={styles.resultsContainer}>
        <div className={styles.heading}>
          <h1>
            Resultados para: {search}
          </h1>
          <hr />
        </div>

        <MovieGrid movies={movies} />

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

export default SearchPage;
