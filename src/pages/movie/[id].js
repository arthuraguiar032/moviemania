import { useRouter } from "next/router";
import credits from "@/mock/credits_movie.json";
import details from "@/mock/details_movie.json";
import TmdbImage from "@/components/ui/TmdbImage";
import styles from "./MoviePage.module.css";

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const directors = credits.crew.filter( (person) => {
    return person.job == "Director";
});

  const directors_names = directors.map((person) => (person.name));

  const str_directors = directors_names.join(", ");

  function truncateDecimal(num, places) {
    const multiplier = Math.pow(10, places);
    return Math.trunc(num * multiplier) / multiplier;
  }

  const rating = truncateDecimal(details.vote_average, 1);



  return (
    <div className={styles.content}>
      <div className={styles.backdrop}>
        <TmdbImage
          path={details.backdrop_path}
          size="lg"
          type="backdrop"
          alt={`Backdrop ${details.title}`}
          width={1000}
        />
      </div>

      <section className={styles.containerInfo}>
        <div className={styles.info}>
            <div className={styles.leftSide}>
              <div className={styles.imageWrapper}>
                <TmdbImage
                  path={details.poster_path}
                  size="lg"
                  type="poster"
                  alt={`Poster ${details.title}`}
                  width={1000}
                />
              </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.topInfo}>
              <h1>{details.title}</h1>
              <span>Directed by {str_directors}</span>
            </div>

            <div className={styles.mainInfo}>
              <span className={styles.tagline}>{details.tagline}</span>

              <p>{details.overview}</p>

              <div className={styles.reviews}>
                <p className={styles.mediumAverage}>Average Rating: {rating}</p>

                <button>Avaliar</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomSide}>
          <p>TESTE</p>

        </div>
      </section>

      <div className={styles.lists}></div>
    </div>
  );
};

export default MoviePage;
