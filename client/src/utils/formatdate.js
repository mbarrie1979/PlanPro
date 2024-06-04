import { format, parseISO } from 'date-fns';

export const formatDate = (dateString) => {
    const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatToLocalDate = (utcDate) => {
    const date = parseISO(utcDate);
    return format(date, 'MM/dd/yyyy');
};
