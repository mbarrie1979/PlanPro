

export const formatDate = (dateString) => {
    const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
