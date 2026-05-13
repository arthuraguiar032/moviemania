import Image from "next/image";
import { buildImageUrl } from "@/utils/tmdbImage";
import styles from './TmdbImage.module.css';

const TmdbImage = ({ path, size = "md", type = "poster", alt = "" }) => {
  const imageUrl = buildImageUrl(path, size, type);

  if (!imageUrl) {
    return (
      <div className={styles.placeholder}>{alt || "Imagem indisponível"}</div>
    );
  }

  return (
    <div className={styles.imageWrapper}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={styles.image}
        loading="lazy"
      />
    </div>
  );
};

export default TmdbImage;