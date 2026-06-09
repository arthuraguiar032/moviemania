import { useRouter } from "next/router";
import credits from "@/mock/credits_movie.json";
import details from "@/mock/details_movie.json";
import TmdbImage from "@/components/ui/TmdbImage";
import styles from "./MoviePage.module.css";
import Tabs from "@/components/layout/Tabs";
import Tab from "@/components/layout/Tabs/Tab";
import { truncate_decimal, truncate_date, format_currency } from "@/utils/movieFormatters";
import TagButton from "@/components/ui/TagButton";

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const directors = credits.crew.filter( (person) => {
    return person.job == "Director";
});
  const directors_names = directors.map((person) => (person.name));
  const str_directors = directors_names.join(", ");
  const rating = truncate_decimal(details.vote_average, 1);

  const actors = credits.cast;

  const studios = details.production_companies;

  const CREW_PRIORITY = [
    { job: "Director", label: "Director" },
    { job: "Screenplay", label: "Screenplay" },
    { job: "Writer", label: "Screenplay" },
    { job: "Original Writer", label: "Original Author" },
    { job: "Producer", label: "Producer" },
  ];

  const DEPARTMENT_LABELS = {
    Crew: "Stunts",
    Directing: "Add. Directing",
    Writing: 'Add. Writing'
    // adicionar outros aqui se precisar no futuro
  };

  const priority_jobs = CREW_PRIORITY.map(item => item.job);

  const priorityCrew = CREW_PRIORITY.map(({ job, label }) => {
    const people = credits.crew.filter((person) => person.job === job);
    return { label, people };
  }).filter(({ people }) => people.length > 0);

  const tags = [];

  const remainingCrew = credits.crew
    .filter((person) => !priority_jobs.includes(person.job))
    .reduce((groups, person) => {
      const dept = person.department;
      if (!groups[dept]) groups[dept] = [];
      groups[dept].push(person);
      return groups;
    }, {});



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
                <span className={styles.releaseDate}>
                  ({truncate_date(details.release_date)}){" "}
                </span>
              </div>
              <span className={styles.director}>
                Directed by {str_directors}
              </span>
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
              <div className={styles.infoRow}>
                <strong className={styles.infoLabel}>Runtime</strong>
                <div className={styles.textList}>{details.runtime} min</div>
              </div>

              <div className={styles.infoRow}>
                <strong className={styles.infoLabel}>Status</strong>
                <div className={styles.textList}>{details.status}</div>
              </div>

              <div className={styles.infoRow}>
                <strong className={styles.infoLabel}>Countries</strong>
                <div className={styles.textList}>
                  {details?.production_countries.map((country, index) => (
                    <span key={country.iso_3166_1}>
                      {country.name}
                      {index < details.production_countries.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.infoRow}>
                <strong className={styles.infoLabel}>Budget</strong>
                <div className={styles.textList}>
                  {format_currency(details.budget)}
                </div>
              </div>

              <div className={styles.infoRow}>
                <strong className={styles.infoLabel}>Revenue</strong>
                <div className={styles.textList}>
                  {format_currency(details.revenue)}
                </div>
              </div>

              <div className={styles.infoRow}>
                <strong className={styles.infoLabel}>Studios</strong>
                <div className={styles.tagList}>
                  {studios?.map((studio) => (
                    <TagButton label={studio.name} path={`/studio/${studio.id}`} key={studio.id}/>
                  ))}
                </div>
              </div>

              <div className={styles.infoRow}>
                <strong className={styles.infoLabel}>Keywords</strong>
                <div className={styles.tagList}>
                  {
                    tags?.map( (tag) => 
                      (<TagButton path={`/keyword/${tag.id}`} label={tag.name} key={tag.id}/>) )
                  }
                </div>
              </div>
            </Tab>

            <Tab name={"CAST"}>
              <div className={styles.tagList}>
                {actors.map((actor) => (
                  <TagButton
                    key={`${actor.id}-${actor.character}`}
                    label={actor.name}
                    path={`/artist/${actor.id}`}
                  />
                ))}
              </div>
            </Tab>

            <Tab name={"CREW"}>
              {/* crew prioritario — agrupado por label */}
              {priorityCrew?.map(({ label, people }) => (
                <div className={styles.infoRow} key={label}>
                  <strong className={styles.infoLabel}>{label}</strong>
                  <div className={styles.tagList}>
                    {people.map((person) => (
                      <TagButton
                        key={person.id}
                        label={person.name}
                        path={`/artist/${person.id}`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* crew restante — listado direto */}
              {Object.entries(remainingCrew).map(([department, people]) => (
                <div className={styles.infoRow} key={department}>
                  <strong className={styles.infoLabel}>
                    {DEPARTMENT_LABELS[department] ?? department}
                  </strong>
                  <div className={styles.tagList}>
                    {people.map((person) => (
                      <TagButton
                        key={person.credit_id}
                        label={person.name}
                        path={`/artist/${person.id}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </Tab>

            <Tab name={"GENRES"}>
              <div className={styles.tagList}>
                {details?.genres.map((genre) => (
                  <TagButton
                    key={genre.id}
                    label={genre.name}
                    path={`/genres/${genre.name}`}
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </section>

      <div className={styles.lists}></div>
    </div>
  );
};

export default MoviePage;
