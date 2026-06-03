import Link from 'next/link';
import TmdbImage from '../TmdbImage';
import styles from './MovieCard.module.css';
import truncate_date from '@/utils/movieFormatters';

const MovieCard = ({movieId, movieTitle, posterPath, posterSize, releaseDate}) => {
    
    return (    
        <Link href={`/movie/${movieId}`}>
        <div className={styles.movieCard}>
            <div className={styles.moviePoster}>
            <TmdbImage
                path={posterPath}
                size={posterSize}
                type="poster"
                alt={`Poster ${movieTitle}`}
                width={1000}
            />
            </div>
            <strong>{movieTitle}</strong>
            <p>{truncate_date(releaseDate)}</p>
        </div>
        </Link>
    );
};

export default MovieCard;