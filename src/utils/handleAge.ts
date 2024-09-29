import dayjs from 'dayjs';
export const handleAge = (dateOfBirth: string, dateOfDeath: string) => {
  if (!dateOfBirth || !dateOfDeath) return '';
  const birth = dayjs(dateOfBirth);
  const death = dateOfDeath ? dayjs(dateOfDeath) : dayjs();
  const diff = death.diff(birth);

  const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor(diff / (30.44 * 24 * 60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (years >= 1) {
    return `${years}`;
  } else if (months >= 1) {
    return `${months} meses`;
  } else {
    return `${days} dias`;
  }
};

export const isInfant = (birth: string, death: string) => {
  return birth && death && dayjs(death).diff(dayjs(birth), 'year') <= 1;
};
