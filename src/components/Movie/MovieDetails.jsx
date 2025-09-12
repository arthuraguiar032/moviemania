import React from "react";
import '../../styles/moviecontent.scss'
import useApi from '../../hooks/useApi';
import { movieApi } from '../../api/movieApi';
import { TmdbImage } from "../../utils/imageUtils";

function MovieDetails({movie}) {

  const { data: movieCredits, loading: creditsLoading, error: creditsError } = useApi(movieApi.getMovieCredits, [movie.id, 'pt-BR'], []);
  
  const renderInformacoesPrincipais = () => {
    return(
      <section className="movieDetails">
        
        <TmdbImage
              path={movie.poster_path}
              alt={`Poster do filme ${movie.title}`}
              type="poster"
              size="medium"
        />

        <div className="movieInformacoes">

          <div className="movie titulo">
            <h1 className="movieTitle">{movie.title}  <span className="movieYear">({new Date(movie.release_date).getFullYear()})</span></h1>
            <p className="movieDiretor">{renderDiretores()}</p>
          </div>
          
          <h2 className="movieTagline">{movie.tagline}</h2>

          <p className="sinopse">{movie.overview}</p>

          <p className="movieDuracao">{movie.runtime} minutos</p>

          <div className="movieClassificacao">
            <p>Avaliação dos Usuários</p>
            <p>{movie.vote_average} / 10</p>
          </div>

          <button className="movieAvaliar">Avaliar</button>
        </div>
      </section>
    );
  };

  const renderElenco = () => {

    return (
      <section className="casting">
        <h2>Elenco Principal</h2>
        <hr />
        <div className="cast-grid">
          {movieCredits?.cast?.slice(0, 12).map((castMember) => (
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


  const renderEquipeTecnica = () => {
    // Agrupar por departamento
    const departamentos = {};
    movieCredits?.crew?.forEach(member => {
      if (!departamentos[member.department]) {
        departamentos[member.department] = [];
      }
      departamentos[member.department].push(member);
    });

    return (
      <section className="crew">
        <h2>Equipe Técnica</h2>
        <hr />
        <div className="departments">
          {Object.entries(departamentos).map(([department, members]) => (
            <div key={department} className="department">
              <h3>{department}</h3>
              <div className="members-list">
                {members.slice(0, 5).map(member => (
                  <div key={member.credit_id} className="crew-member">
                    <span className="name">{member.name}</span>
                    <span className="job">({member.job})</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderDetalhesAdicionais = () => {
    return (
      <section className="additional-details">
        <h2>Detalhes Adicionais</h2>
        <hr />
        <div className="details-grid">
          <div className="detail-item">
            <span className="label">País de produção:</span>
            <span className="value">
              {movie.production_countries.map(country => country.name).join(', ')}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="label">Idiomas originais:</span>
            <span className="value">
              {movie.spoken_languages.map(lang => lang.name).join(', ')}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="label">Orçamento:</span>
            <span className="value">
              {movie.budget ? movie.budget.toLocaleString('en-US', { 
                style: 'currency', 
                currency: 'USD',
                minimumFractionDigits: 0 
              }) : 'Não informado'}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="label">Receita:</span>
            <span className="value">
              {movie.revenue ? movie.revenue.toLocaleString('en-US', { 
                style: 'currency', 
                currency: 'USD',
                minimumFractionDigits: 0 
              }) : 'Não informado'}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="label">Status:</span>
            <span className="value">{movie.status}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Estúdios:</span>
            <span className="value">
              {movie.production_companies.map(company => company.name).join(', ')}
            </span>
          </div>
        </div>
      </section>
    );
  };
  
  const renderDiretores = () => {
    if (creditsLoading) return <p>Carregando diretores...</p>;
    if (creditsError) return <p>Erro ao carregar diretores: {creditsError}</p>;
    if (!movieCredits || !movieCredits.crew) return <p>Informações de direção não disponíveis.</p>;
    
    const diretores = movieCredits.crew.filter(member => member.job === 'Director');
    
    if (diretores.length === 0) return <p>Nenhum diretor encontrado.</p>;
    
    return (
      <>
        {diretores.length > 1 ? <p>Diretores:</p> : <p>Diretor:</p>}
        {diretores.map((director) => director.name).join(', ')}
      </>
    );
  };


  return (
    <div className="movieContainer">
      <section className="movieBackimage">
        <TmdbImage
          path={movie.backdrop_path}
          alt={`Foto de fundo do filme ${movie.title}`}
          type="backdrop"
          size="large"
        />
      </section>
      
      <div className="movieContent">
        {/* Seção Principal */}
        {renderInformacoesPrincipais()}
        
        {/* Seções Secundárias */}
        <div className="secondary-sections">
          {renderElenco()}
          {renderEquipeTecnica()}
          {renderDetalhesAdicionais()}
        </div>
      </div>
    </div>
  );
  
};

export default MovieDetails;