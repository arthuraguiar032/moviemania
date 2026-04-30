import React from 'react';
import { TmdbImage } from "../../../../utils/imageUtils";

const MovieCast = ({ cast, loading, error }) => {
  if (loading) return <p>Carregando elenco...</p>;
  if (error) return <p>Erro ao carregar elenco: {error}</p>;
  if (!cast || cast.length === 0) return null;

  return (
    <section className="casting">
      <h2>Elenco Principal</h2>
      <hr />
      <div className="cast-grid">
        {cast.slice(0, 12).map((castMember) => (
          <div key={castMember.cast_id} className="cast-card">
            <div className="actor-image">
              <TmdbImage
                path={castMember.profile_path}
                alt={castMember.name}
                type="profile"
                size="small"
              />
            </div>
            <div className="actor-info">
              <h4>{castMember.name}</h4>
              <p className="character">como {castMember.character}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieCast;
