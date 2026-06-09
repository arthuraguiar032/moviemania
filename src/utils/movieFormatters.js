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