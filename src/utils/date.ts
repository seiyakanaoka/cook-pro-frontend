import { format as _format } from 'date-fns';

export const formatDate = (date: Date, format: string): string => {
  return _format(date, format);
};
