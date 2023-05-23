export const calculateTimeAgo = (timestamp) => {
    const currentDate = new Date();
    const updatedDate = new Date(timestamp);
  
    const timeDifference = currentDate.getTime() - updatedDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (seconds < 60) {
      return `actualizado hace ${seconds} segundos`;
    } else if (minutes < 60) {
      return `actualizado hace ${minutes} minutos`;
    } else if (hours < 24) {
      return `actualizado hace ${hours} horas`;
    } else if (days < 30) {
      return `actualizado hace ${days} días`;
    } else if (months < 12) {
      return `actualizado hace ${months} meses`;
    } else {
      return `actualizado hace ${years} años`;
    }
  };
  