export const truncate_date = (date) => (date.slice(0, 4));

export const truncate_decimal = (num, places) => {
    const multiplier = Math.pow(10, places);
    return Math.trunc(num * multiplier) / multiplier;
  };