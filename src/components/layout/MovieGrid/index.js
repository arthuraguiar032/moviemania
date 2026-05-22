import TmdbImage from "@/components/ui/TmdbImage";
import Link from "next/link";
import styles from './MovieGrid.module.css';
import MovieCard from "@/components/ui/MovieCard";

const MovieGrid = ({movies}) => {

    return (
      <div className={styles.resultsMovies}>
        {movies.map((movie) => {
          return (
            // TODO: adicionar rota dinamica
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              movieTitle={movie.title}
              posterPath={movie.poster_path}
              posterSize={"lg"}
              releaseDate={movie.release_date}
            />
          );
        })}
      </div>
    );
};

export default MovieGrid;