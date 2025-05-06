export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    return new Intl.DateTimeFormat('en-DK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date(dateString));
  };