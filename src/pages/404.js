import styles from "@/styles/404.module.css";
import LinkButton from "@/components/ui/LinkButton";
import cn from 'classnames';

const NotFound = () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.code}>
        <span className={styles.codeAccent}>4</span>0
        <span className={styles.codeAccent}>4</span>
      </div>

      <h1 className={styles.title}>Cena não encontrada</h1>
      <p className={styles.subtitle}>
        Parece que essa página foi cortada na edição final.
        <br />
        Volte para a tela principal e continue explorando os melhores filmes.
      </p>

      <div className={styles.actions}>
        <LinkButton variant="primary" size="lg" path="/">
          Página Inicial
        </LinkButton>
        <LinkButton variant="outline" size="lg" path="/">
          Voltar
        </LinkButton>
      </div>
    </div>
  </div>
);

export default NotFound;
