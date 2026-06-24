import Carousel from "@/components/layout/Carousel";
import data from "@/mock/popular_movies.json";
import styles from '@/styles/Movies.module.css';

const Movies = () => {
  const movies = data?.results;
  
  return (
    <>
      <h1>Rota de filmes</h1>
      <p>Aqui terá a lista de vários filmes</p>

      <Carousel
        title='Filmes populares'
        listLink='/movies/popular'
        movies={movies}
      />
    
    </>
  );
};

export default Movies;
