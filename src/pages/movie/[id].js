import { useRouter } from "next/router";
import credits from "@/mock/credits_movie.json";
import details from "@/mock/details_movie.json";
import TmdbImage from "@/components/ui/TmdbImage";
import styles from "./MoviePage.module.css";
import Tabs from "@/components/layout/Tabs";
import Tab from "@/components/layout/Tabs/Tab";
import { truncate_decimal, truncate_date, format_currency } from "@/utils/movieFormatters";
import TagButton from "@/components/ui/TagButton";
import InfoRow from "@/components/ui/InfoRow";
import TagList from "@/components/ui/TagList";

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
              <InfoRow label={"Runtime"}>{details?.runtime}min</InfoRow>

              <InfoRow label={"Status"}>{details?.status}</InfoRow>

              <InfoRow label={"Countries"}>
                <TagList
                  items={details.production_countries}
                  getKey={(country) => country.iso_3166_1}
                  getLabel={(country) => country.name}
                  getPath={(country) => `/country/${country.iso_3166_1}`}
                />
              </InfoRow>

              <InfoRow label={"Budget"}>
                {format_currency(details?.budget)}
              </InfoRow>

              <InfoRow label={"Revenue"}>
                {format_currency(details?.revenue)}
              </InfoRow>

              <InfoRow label={"Studios"}>
                <TagList
                  items={studios}
                  getLabel={(studio) => studio.name}
                  getPath={(studio) => `/studio/${studio.id}`}
                  getKey={(studio) => studio.id}
                />
              </InfoRow>

              <InfoRow label={"Keywords"}>
                <TagList
                  itens={tags}
                  getLabel={(tag) => tag.name}
                  getPath={(tag) => `/tag/${tag.id}`}
                  getKey={(tag) => tag.id}
                />
              </InfoRow>
            </Tab>

            <Tab name={"CAST"}>
              <TagList
                getKey={(actor) => `${actor.id}.${actor.character}`}
                getLabel={(actor) => actor.name}
                getPath={(actor) => `/artist/${actor.id}`}
                items={actors}
              />
            </Tab>

            <Tab name={"CREW"}>
              {/* crew prioritario — agrupado por label */}
              {priorityCrew?.map(({ label, people }) => (
                <InfoRow label={label} key={label}>
                  <TagList
                    getKey={(person) => person.id}
                    getLabel={(person) => person.name}
                    getPath={(person) => `/artist/${person.id}`}
                    items={people}
                  />
                </InfoRow>
              ))}

              {/* crew restante — listado direto */}
              {Object.entries(remainingCrew).map(([department, people]) => (
                <InfoRow label={department} key={department}>
                  <TagList
                    getKey={(person) => person.id}
                    getLabel={(person) => person.name}
                    getPath={(person) => `/artist/${person.id}`}
                    items={people}
                  />
                </InfoRow>
              ))}
            </Tab>

            <Tab name={"GENRES"}>
              <TagList
                getKey={(genre) => genre.id}
                getLabel={(genre) => genre.name}
                getPath={(genre) => `/genre/${genre.id}`}
                items={details?.genres}
              />
            </Tab>
          </Tabs>
        </div>
      </section>

      <div className={styles.lists}></div>
    </div>
  );
};

export default MoviePage;
