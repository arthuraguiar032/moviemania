export const truncate_date = (date) => (date.slice(0, 4));

export const truncate_decimal = (num, places) => {
    const multiplier = Math.pow(10, places);
    return Math.trunc(num * multiplier) / multiplier;
  };

export const format_currency = (value, locale) => {
  
  const currencies = {
    'pt-BR': 'BRL', // Brasil
    'en-US': 'USD', // Estados Unidos
    'es-ES': 'EUR'  // Espanha/União Europeia
  };

  const currency = currencies[locale] || 'USD';

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

export const buildCrewData = (crew, CREW_PRIORITY) => {
  const priority_jobs = CREW_PRIORITY.map((item) => item.job);

  const priorityCrew = CREW_PRIORITY.map(({ job, label }) => {
    const people = crew?.filter((person) => person.job === job);
    return { label, people };
  }).filter(({ people }) => people?.length > 0);

  const remainingCrew = crew?.filter((person) => !priority_jobs.includes(person.job))
    .reduce((groups, person) => {
      const dept = person.department;
      if (!groups[dept]) groups[dept] = [];
      groups[dept].push(person);
      return groups;
    }, {});

  return [priorityCrew, remainingCrew];
};