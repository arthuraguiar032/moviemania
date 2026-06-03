import Image from "next/image";
import { buildImageUrl } from "@/utils/tmdbImage";
import styles from './TmdbImage.module.css';

//TODO: reconsiderar para responsividade
const TAM_VISUAL= '200px';

const TmdbImage = ({ path, size = "md", type = "poster", alt = "", customSizes = null }) => {
  const defaultSizes =
    type === "backdrop"
      ? "100vw" // backdrop ocupa largura total
      : "(max-width: 768px) 300px, 400px"; // poster

  const finalSizes = customSizes || defaultSizes;

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
        sizes={finalSizes}
        className={styles.image}
        loading="lazy"
      />
    </div>
  );
};

export default TmdbImage;