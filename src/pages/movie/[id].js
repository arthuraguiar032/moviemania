import { useRouter } from "next/router";
import TmdbImage from "@/components/ui/TmdbImage";
import styles from "./MoviePage.module.css";
import Tabs from "@/components/layout/Tabs";
import Tab from "@/components/layout/Tabs/Tab";
import { truncate_decimal, truncate_date, format_currency, buildCrewData } from "@/utils/movieFormatters";
import InfoRow from "@/components/ui/InfoRow";
import TagList from "@/components/ui/TagList";
import { useEffect, useState } from "react";
import { movieInfoService } from "@/service/tmdb_movieInfo";
import Carousel from "@/components/layout/Carousel";

const CREW_PRIORITY = [
  { job: "Director", label: "Director" },
  { job: "Screenplay", label: "Screenplay" },
  { job: "Writer", label: "Screenplay" },
  { job: "Original Writer", label: "Original Author" },
  { job: "Producer", label: "Producer" },
];

const MoviePage = () => {
	const router = useRouter();
	const { id } = router.query;

	const [details, setDetails] = useState(null);
	const [credits, setCredits] = useState(null);
	const [keywords, setKeywords] = useState(null);
	const [recommendations, setRecommendations] = useState(null);
	const [similar, setSimilar] = useState(null);

	useEffect( () => {
		if (!id) return;

		const fetchMovieData = async () => {
			try {
				//fetching dataa in priority order
				const detailsData = await movieInfoService.getDetails(id);
				setDetails(detailsData);

				//elenco e equipe
				const creditsData = await movieInfoService.getCredits(id);
				setCredits(creditsData);

				//keywords
				const keywordsData = await movieInfoService.getKeywords(id);
				setKeywords(keywordsData.keywords);

				//recommendations
				const recoData = await movieInfoService.getRecommendations(id);
      			setRecommendations(recoData.results);

				//recommendations
				const simiData = await movieInfoService.getSimilar(id);
      			setSimilar(simiData.results);

			} catch (error) {
				console.log("Erro na comunicação da API: ", error)
			}
		};

		fetchMovieData();
	}, [id]);

  const directors = credits?.crew.filter( (person) => {
    return person.job == "Director";
});
  const directors_names = directors?.map((person) => (person.name));
  const str_directors = directors_names?.join(", ");
  
  const rating = truncate_decimal(details?.vote_average, 1);

  const actors = credits?.cast;

  const studios = details?.production_companies;

  const [priorityCrew, remainingCrew] = buildCrewData(
    credits?.crew,
    CREW_PRIORITY,
  );

  return (
    <div className={styles.content}>
      <div className={styles.backdrop}>
        <TmdbImage
          path={details?.backdrop_path}
          size="lg"
          type="backdrop"
          alt={`Backdrop ${details?.title}`}
          width={1000}
        />
      </div>

      <section className={styles.containerInfo}>
        <div className={styles.info}>
          <div className={styles.leftSide}>
            <div className={styles.imageWrapper}>
              <TmdbImage
                path={details?.poster_path}
                size="lg"
                type="poster"
                alt={`Poster ${details?.title}`}
                width={1000}
              />
            </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.topInfo}>
              <div className={styles.title}>
                <h1>{details?.title}</h1>
                <span className={styles.releaseDate}>
                  ({details && truncate_date(details?.release_date)}){" "}
                </span>
              </div>
              <span className={styles.director}>
                Directed by {str_directors}
              </span>
            </div>

            <div className={styles.mainInfo}>
              <span className={styles.tagline}>{details?.tagline}</span>

              <p>{details?.overview}</p>

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
                  items={details?.production_countries}
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
                  items={keywords}
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
              {remainingCrew &&
                Object.entries(remainingCrew).map(([department, people]) => (
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

      <div className={styles.lists}>
        {/* recommendations */}
        {recommendations && (
          <Carousel
            listLink={`/lists/${id}/recommendations`}
            movies={recommendations}
            title={"Recommendations"}
          />
        )}
      </div>

      <div className={styles.lists}>
        {/* similar */}
        {similar && (
          <Carousel
            listLink={`/lists/${id}/similar`}
            movies={similar}
            title={"Similar movies"}
          />
        )}
      </div>
    </div>
  );
};

export default MoviePage;
