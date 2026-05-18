import styles from './Pagination.module.css';

const MAX_TOTAL_BUTTONS = 5;
const MAX_SIDE_BUTTONS = 2;

const Pagination = ({totalPosts, postsPerPage, setPage, currentPage }) => {

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const firstPage = Math.max(1, currentPage-2);
    const lastPage = currentPage+2 >= totalPages ? totalPages : currentPage+2;

    let pages = Array.from({ length: lastPage - firstPage + 1 }, (_, i) => firstPage + i);


    return (
      <div className={styles.pagination}>
        <div className={styles.leftButton}>
          {/* botao anterior  */}
          {currentPage != firstPage && (
            <button
              className={styles.sideButtons}
              onClick={() => setPage(currentPage - 1)}
            >
              Anterior
            </button>
          )}
        </div>

        <div className={styles.mainButtons}>
          {/* botao first + '...' */}
          {firstPage > 1 && (
            <>
              <button
                className={styles.wingerButtons}
                onClick={() => setPage(1)}
              >
                1
              </button>
              <span className={styles.ellipsis}>...</span>
            </>
          )}

          {/* botoes do meio */}
          {pages.map((page, index) => {
            return (
              <button
                key={index}
                onClick={() => setPage(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            );
          })}

          {/* botao last */}
          {lastPage != totalPages && (
            <>
              <span className={styles.ellipsis}>...</span>
              <button
                className={styles.wingerButtons}
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <div className={styles.rightButton}>
          {/* botao proximo */}
          {currentPage != lastPage && (
            <button
              className={styles.sideButtons}
              onClick={() => setPage(currentPage + 1)}
            >
              Próximo
            </button>
          )}
        </div>
      </div>
    );
};

export default Pagination;