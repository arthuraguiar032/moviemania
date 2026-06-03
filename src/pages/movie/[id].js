import { useRouter } from "next/router";
import credits from "@/mock/credits_movie.json";
import details from "@/mock/details_movie.json";
import TmdbImage from "@/components/ui/TmdbImage";
import styles from "./MoviePage.module.css";
import Tabs from "@/components/layout/Tabs";
import Tab from "@/components/layout/Tabs/Tab";
import { truncateDecimal, truncate_date } from "@/utils/movieFormatters";

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const directors = credits.crew.filter( (person) => {
    return person.job == "Director";
});
  const directors_names = directors.map((person) => (person.name));
  const str_directors = directors_names.join(", ");
  const rating = truncateDecimal(details.vote_average, 1);

  const actors = credits.cast.map((actor) => (actor.name));


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
              <div className={styles.title}>
                <h1>{details.title}</h1>
                <span className={styles.releaseDate}>({truncate_date(details.release_date)})  </span>
              </div>
              <span className={styles.director}>Directed by {str_directors}</span>
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
          <Tabs>
            <Tab name={"MORE DETAILS"}>
              <p>Runtime:</p>
              <p>Status: </p>
              <p>Countries: </p>
              <p>Budget: </p>
              <p>Revenue: </p>
              <p>Studios: </p>
              <p>Keywords: </p>
            </Tab>

            <Tab name={"CAST"}>
              <div className={styles.castList}>
                {actors.map((actor, index) => (
                  <p key={index}>{actor}</p>
                ))}
              </div>
            </Tab>

            <Tab name={"CREW"}>Conteudo 3</Tab>

            <Tab name={"GENRES"}>Conteudo 4</Tab>

          </Tabs>
        </div>
      </section>

      <div className={styles.lists}></div>
    </div>
  );
};

export default MoviePage;
