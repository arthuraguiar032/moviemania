import React from "react";
import styles from './MovieBackImage.module.css';
import { TmdbImage } from "../../../../utils/imageUtils";

const MovieBackImage = (props) => {
    const { path, alt } = props;

  return (
    <section className={styles.movieBackimage}>
      <TmdbImage
          path={path}
          alt={alt}
          type="backdrop"
          size="original" // Use "original" para a maior resolução disponível
      />
    </section>
  );
};

export default MovieBackImage;