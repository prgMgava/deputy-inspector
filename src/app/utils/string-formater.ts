import { FormDataDeputy, FormDataExpense } from '../models/formData.models';

export const formatQuery = (data: FormDataDeputy): string => {
  const parameters = Object.entries(data);
  const query = parameters
    .filter((item) => !!item[1])
    .map((item) => item.join('='))
    .join('&');
  return query;
};

export const formatExpenseQuery = (data: FormDataExpense) => {
  const parameters = Object.entries(data);
  const query = parameters
    .filter((item) => !!item[1] && item[0] != 'valor')
    .map((item) => item.join('='))
    .join('&');
  return query;
};
