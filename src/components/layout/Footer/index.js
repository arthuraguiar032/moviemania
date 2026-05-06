import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>MovieMania</h3>
          <p className={styles.footerDescription}>
            Sua plataforma favorita para descobrir e explorar o mundo do cinema.
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h4 className={styles.footerSubtitle}>Links Rápidos</h4>
          <div className={styles.footerLinks}>
            <Link href="/" className={styles.footerLink}>Home</Link>
            <Link href="/movie/popular" className={styles.footerLink}>Filmes Populares</Link>
            <Link href="/movie/top_rated" className={styles.footerLink}>Top Filmes</Link>
          </div>
        </div>
        
        <div className={styles.footerSection}>
          <h4 className={styles.footerSubtitle}>Informações</h4>
          <div className={styles.footerLinks}>
            <Link href="/about" className={styles.footerLink}>Sobre</Link>
            <Link href="/contact" className={styles.footerLink}>Contato</Link>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; 2023 MovieMania. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;