import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Main nav row — pipe-separated, centered, exactly as Figma */}
      <nav className={styles.footerNav}>
        <Link href="/" className={styles.footerLink}>
          Home
        </Link>
        <span className={styles.sep} aria-hidden="true">
          |
        </span>
        <Link href="/movie/popular" className={styles.footerLink}>
          Filmes Populares
        </Link>
        <span className={styles.sep} aria-hidden="true">
          |
        </span>
        <Link href="/movie/top_rated" className={styles.footerLink}>
          Top Filmes
        </Link>
        <span className={styles.sep} aria-hidden="true">
          |
        </span>
        <Link href="/about" className={styles.footerLink}>
          Sobre
        </Link>
        <span className={styles.sep} aria-hidden="true">
          |
        </span>
        <Link href="/contact" className={styles.footerLink}>
          Contato
        </Link>
      </nav>

      {/* Copyright */}
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} MovieMania. Todos os direitos
        reservados.
      </p>
    </footer>
  );
};

export default Footer;