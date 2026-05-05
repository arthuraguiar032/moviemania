import styles from '@/styles/Header.module.css';


const Header = () => {
    return (
      <header className={styles.header}>
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Filmes</a>
          </li>
          <li>
            <a>Listas</a>
          </li>
          <li>
            <a>Artistas</a>
          </li>

          <li>
            <form>
              <input type="text" placeholder="Pesquise aqui..." />
            </form>
          </li>
        </ul>
      </header>
    );
};

export default Header;