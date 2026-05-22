import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";
import SearchBar from "@/components/ui/SearchBar";
import { useRouter } from "next/router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const handleSearch = (searchTerm) => {
    if (!searchTerm) return;
    const encodedSearch = encodeURIComponent(searchTerm).replaceAll("%20", "+");
    // console.log(encodedSearch);
    router.push(`/search?q=${encodedSearch}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={styles.header}>
        {/* Hamburger — left, exactly as Figma */}
        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ""}`}
          onClick={toggleMenu}
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <svg
            className={styles.logoIcon}
            viewBox="0 0 56 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="12" width="36" height="28" rx="4" fill="white" />
            <polygon points="40,18 56,10 56,38 40,30" fill="white" />
            <circle cx="22" cy="26" r="8" fill="#14181c" />
            <circle cx="22" cy="26" r="4" fill="white" />
            <rect x="8" y="6" width="10" height="6" rx="2" fill="white" />
          </svg>
          <span className={styles.logoText}>MovieMania</span>
        </Link>

        {/* Right — search + user */}
        <div className={styles.rightSection}>

          <SearchBar placeholder="Busque um filme..." onSearch={handleSearch} />

          <button className={styles.userButton} aria-label="Perfil">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d9d9d9"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Side drawer with all nav links — slides in when hamburger is clicked */}
      <nav
        className={`${styles.navDrawer} ${isMenuOpen ? styles.navOpen : ""}`}
      >
        <Link
          href="/"
          className={styles.navLink}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/movies/popular"
          className={styles.navLink}
          onClick={() => setIsMenuOpen(false)}
        >
          Filmes populares
        </Link>
        <Link
          href="/movies/now_playing"
          className={styles.navLink}
          onClick={() => setIsMenuOpen(false)}
        >
          Nos cinemas
        </Link>
        <Link
          href="/movies/top_rated"
          className={styles.navLink}
          onClick={() => setIsMenuOpen(false)}
        >
          Top Filmes
        </Link>
        <Link
          href="/movies/upcoming"
          className={styles.navLink}
          onClick={() => setIsMenuOpen(false)}
        >
          Em Breve
        </Link>
      </nav>

      {/* Backdrop — closes drawer on outside click */}
      {isMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;