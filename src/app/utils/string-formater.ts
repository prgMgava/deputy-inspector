import { FormDataDeputy, FormDataExpense } from '../models/formData.models';

// export const doTitle = (data: string): string => {
//   return data
//     .split(' ')
//     .map((word) => word.toLowerCase())
//     .map((word) =>
//       word.length > 1
//         ? word.replace(word[0], word[0].toLocaleUpperCase())
//         : word
//     )
//     .join(' ');
// };

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

// export const formatEventDate = (data: string): string => {
//   return new Date(data).toLocaleString().slice(0, 16).replace(' ', ' - ') + 'h';
// };
