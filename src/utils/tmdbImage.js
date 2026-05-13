const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const IMAGE_SIZES = {
  poster: {
    sm: "w185",
    md: "w342",
    lg: "w500",
    xl: "w780",
    original: "original",
  },
  backdrop: { sm: "w300", md: "w780", lg: "w1280", original: "original" },
  profile: { sm: "w45", md: "w185", lg: "h632", original: "original" },
};

export const buildImageUrl = (path, size = "md", type = "poster") => {
  if (!path) return null;
  const sizeCode = IMAGE_SIZES[type]?.[size] ?? size;
  return `${IMAGE_BASE_URL}${sizeCode}${path}`;
};
