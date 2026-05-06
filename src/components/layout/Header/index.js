import Link from 'next/link';
import { useState } from 'react';

import styles from "./Header.module.css";

import SearchBar from '@/components/ui/SearchBar';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) return;
    const encodedSearch = encodeURIComponent(searchTerm);
    window.location.href = `/search?q=${encodedSearch}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoIcon}>🎬</span>
            <span className={styles.logoText}>MovieMania</span>
          </Link>
        </div>

        <div
          className={`${styles.navLinks} ${isMenuOpen ? styles.navOpen : ""}`}
        >
          <Link
            href="/"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/movie/popular"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Filmes
          </Link>
          <Link
            href="/artist"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Atores
          </Link>
          <Link
            href="/movie/top_rated"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Top Filmes
          </Link>
          <Link
            href="/movie/upcoming"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Em Breve
          </Link>
        </div>

        <div className={styles.rightSection}>
          <SearchBar placeholder="Busque um filme..." onSearch={handleSearch} />

          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
