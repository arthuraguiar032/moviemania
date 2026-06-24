import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import { movieListsService } from "@/service/tmdb_movieLists";
import LinkButton from '@/components/ui/LinkButton';
import Tabs from "@/components/layout/Tabs";
import Tab from "@/components/layout/Tabs/Tab";

const Home = () => {

  // useEffect(() => {
  //   const testApi = async () => {
  //     try{
  //       const movies = await movieListsService.getTopRated({
  //         //opcional
  //         page: 1,
  //       });
  //       console.log(movies);
  //     } catch (error) {
  //       console.log("ERRO AO ACESSAR A API", error)
  //     }
  //   };

  //   testApi();
  // }, []);

  return (
    <>
      <h1>Aqui terão filmes</h1>
      <p>TESTANDO TABS</p>

      <Tabs>
        <Tab name={"Principal"}>Conteudo 1</Tab>
        <Tab name={"Sec"}>Conteudo 2</Tab>
        <Tab name={"Terc"}>Conteudo 3</Tab>
        <Tab name={"Quart"}>Conteudo 4</Tab>
        <Tab name={"Five"}>Conteudo 5</Tab>

      </Tabs>
    </>
  );
};

export default Home;