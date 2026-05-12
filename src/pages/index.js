import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import { movieListsService } from "@/service/tmdb_movieLists";

const Home = () => {

  useEffect(() => {
    const testApi = async () => {
      try{
        const movies = await movieListsService.getTopRated({
          //opcional
          page: 1,
        });
        console.log(movies);
      } catch (error) {
        console.log("ERRO AO ACESSAR A API", error)
      }
    };

    testApi();
  }, []);

  return (
    <>
      <h1>Aqui terão filmes</h1>
      <p>TESTANDO A API OLHA O CONSOLE MALDITO</p>
    </>
  );
};

export default Home;