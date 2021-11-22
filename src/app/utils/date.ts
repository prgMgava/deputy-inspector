import { Years } from '../models/dates.models';

export const months = [
  { value: 1, mes: 'Janeiro' },
  { value: 2, mes: 'Fevereiro' },
  { value: 3, mes: 'Março' },
  { value: 4, mes: 'Abril' },
  { value: 5, mes: 'Maio' },
  { value: 6, mes: 'Junho' },
  { value: 7, mes: 'Julho' },
  { value: 8, mes: 'Agosto' },
  { value: 9, mes: 'Setembro' },
  { value: 10, mes: 'Outubro' },
  { value: 11, mes: 'Novembro' },
  { value: 12, mes: 'Dezembro' },
];

export const getYears = (): Years[] => {
  const listYears: Years[] = new Array();
  const currentYear = new Date().getFullYear();
  for (let olderYear = 2000; olderYear <= currentYear; olderYear++) {
    listYears.push({ ano: olderYear });
  }
  return listYears;
};
