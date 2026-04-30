// src/utils/imageUtils.js

// Tamanhos de imagem pré-definidos (baseados na documentação do TMDB) :cite[2]:cite[4]
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    xlarge: 'w780',
    original: 'original'
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original'
  }
};

// URL base para imagens do TMDB :cite[2]:cite[7]
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

/**
 * Gera URL completa para imagens do TMDB
 * @param {string} path - Caminho da imagem (ex: '/kqjL17yufvn9OVLyXYpvtyrFfak.jpg')
 * @param {string} size - Tamanho da imagem (ex: 'w500')
 * @param {string} type - Tipo de imagem ('poster', 'backdrop' ou 'profile')
 * @returns {string} URL completa da imagem
 */
export const buildImageUrl = (path, size = 'medium', type = 'poster') => {
  if (!path) return null;
  
  const imageSize = IMAGE_SIZES[type]?.[size] || size;
  return `${IMAGE_BASE_URL}${imageSize}${path}`;
};

/**
 * Componente React para exibir imagens do TMDB
 */
export const TmdbImage = ({ 
  path, 
  size = 'medium', 
  type = 'poster', 
  alt = '', 
  className = '', 
  ...props 
}) => {
  const imageUrl = buildImageUrl(path, size, type);
  
  if (!imageUrl) {
    return <div className={`tmdb-image-placeholder ${className}`}>{alt}</div>;
  }
  
  return (
    <img 
      src={imageUrl} 
      alt={alt} 
      className={`tmdb-image ${className}`}
      loading="lazy"
      {...props}
    />
  );
};