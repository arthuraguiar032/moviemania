import React from 'react';

const MovieInfo = ({ movie }) => {
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

export default MovieInfo;