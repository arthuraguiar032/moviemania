import React from 'react';

const MovieCrew = ({ crew, loading, error }) => {
  if (loading) return <p>Carregando equipe técnica...</p>;
  if (error) return <p>Erro ao carregar equipe técnica: {error}</p>;
  if (!crew || crew.length === 0) return null;

  // Agrupar por departamento
  const departamentos = {};
  crew.forEach(member => {
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

export default MovieCrew;