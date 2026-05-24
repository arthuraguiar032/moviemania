import styles from './Carousel.module.css';
import TmdbImage from '@/components/ui/TmdbImage';
import cn from 'classnames';
import { useRef } from 'react';

const Carousel = ({title, listLink, movies}) => {
  
  const carousel = useRef(null);

  if (!movies?.length) return null;

  const handleClink = (event, direction) => {
    event.preventDefault();

    if (direction==='left') {
      carousel.current.scrollLeft -= carousel.current.offsetWidth*0.85;
    } else if (direction === 'right') {
      carousel.current.scrollLeft += carousel.current.offsetWidth*0.85;
    } 
  };

  return (
    <div className={styles.containerCarousel}>
      <div className={styles.heading}>
        <h3>{title}</h3>
        <span>Ver mais</span>
      </div>
      <hr />

      <div className={styles.contentCarousel}>
        <div className={styles.carousel} ref={carousel}>
          {movies?.map((movie) => (
            <div className={styles.card} key={movie.id}>
              <TmdbImage
                path={movie.poster_path}
                size="lg"
                type="poster"
                alt={`Poster ${movie.title}`}
              />
              <p>{movie.title}</p>
              <span>{movie.release_date}</span>
            </div>
          ))}
        </div>

        <button
          className={cn(styles.buttons, styles.leftButton)}
          onClick={(event) => handleClink(event, "left")}
        >
          <span className={styles.arrowLeft}></span>
        </button>
        <button
          className={cn(styles.buttons, styles.rightButton)}
          onClick={(event) => handleClink(event, "right")}
        >
          <span className={styles.arrowRight}></span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;