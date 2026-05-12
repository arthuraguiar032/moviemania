import Link from "next/link";
import styles from '@/styles/404.module.css';

const NotFound = () => {
    return (
      <main className={styles.NotFound}>
        <div className={styles.errorBlock}>
          <div className={styles.error404}>
            
            <div className={styles.codigo404}>
              <span className={styles.accent}>4</span>
              0
              <span className={styles.accent}>4</span>
            </div>
            <h1 className={styles.errorTitle}>Cena não encontrada</h1>

            <p className={styles.errorSubtitle}>
              Parece que essa página foi cortada na edição final.
              <br />
              Volte para a tela principal e continue explorando os melhores
              filmes.
            </p>

            <div className={styles.errorActions}>
              <Link href="/" className={styles.btnHome}>
                Página Inicial
              </Link>

              <Link href="/" className={styles.btnBack}>
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
};

export default NotFound;