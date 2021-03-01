import { format } from 'date-fns';

export function formatedDate(date) {
  return format(new Date(date), 'MMM do yyyy');
}
