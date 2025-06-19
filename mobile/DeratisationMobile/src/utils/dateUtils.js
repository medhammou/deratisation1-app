/**
 * Utilitaires pour la gestion des dates
 * Fonctions pour formater, manipuler et valider les dates dans l'application
 */

/**
 * Formate une date en chaîne lisible
 * 
 * @param {Date|string|number} date - Date à formater
 * @param {string} format - Format de sortie ('short', 'long', 'time', 'datetime')
 * @returns {string} - Date formatée
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Date invalide';
  }
  
  const options = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    },
  };
  
  return dateObj.toLocaleDateString('fr-FR', options[format] || options.short);
};

/**
 * Calcule la différence entre deux dates
 * 
 * @param {Date|string|number} date1 - Première date
 * @param {Date|string|number} date2 - Deuxième date (par défaut: maintenant)
 * @returns {Object} - Objet contenant les différences en jours, heures, minutes
 */
export const getDateDifference = (date1, date2 = new Date()) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const diffMs = Math.abs(d2 - d1);
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  return {
    days: diffDays,
    hours: diffHours,
    minutes: diffMinutes,
    seconds: diffSeconds,
    totalMs: diffMs,
  };
};

/**
 * Vérifie si une date est récente (moins de X jours)
 * 
 * @param {Date|string|number} date - Date à vérifier
 * @param {number} days - Nombre de jours pour considérer comme récent (défaut: 7)
 * @returns {boolean} - True si la date est récente
 */
export const isRecentDate = (date, days = 7) => {
  if (!date) return false;
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return false;
  
  const now = new Date();
  const diffMs = now - dateObj;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  
  return diffDays <= days;
};

/**
 * Retourne une description relative de la date (il y a X jours, etc.)
 * 
 * @param {Date|string|number} date - Date à décrire
 * @returns {string} - Description relative de la date
 */
export const getRelativeDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return 'Date invalide';
  
  const now = new Date();
  const diffMs = now - dateObj;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 1) {
    return 'À l\'instant';
  } else if (diffMinutes < 60) {
    return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
    return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  } else if (diffDays < 7) {
    return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Il y a ${months} mois`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `Il y a ${years} an${years > 1 ? 's' : ''}`;
  }
};

/**
 * Ajoute ou soustrait du temps à une date
 * 
 * @param {Date|string|number} date - Date de base
 * @param {Object} duration - Durée à ajouter/soustraire
 * @param {number} duration.days - Nombre de jours
 * @param {number} duration.hours - Nombre d'heures
 * @param {number} duration.minutes - Nombre de minutes
 * @returns {Date} - Nouvelle date
 */
export const addToDate = (date, duration = {}) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return new Date();
  
  const { days = 0, hours = 0, minutes = 0 } = duration;
  
  const newDate = new Date(dateObj);
  newDate.setDate(newDate.getDate() + days);
  newDate.setHours(newDate.getHours() + hours);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  
  return newDate;
};

/**
 * Vérifie si une date est dans une plage donnée
 * 
 * @param {Date|string|number} date - Date à vérifier
 * @param {Date|string|number} startDate - Date de début
 * @param {Date|string|number} endDate - Date de fin
 * @returns {boolean} - True si la date est dans la plage
 */
export const isDateInRange = (date, startDate, endDate) => {
  const d = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(d.getTime()) || isNaN(start.getTime()) || isNaN(end.getTime())) {
    return false;
  }
  
  return d >= start && d <= end;
};

/**
 * Retourne le début et la fin d'une journée
 * 
 * @param {Date|string|number} date - Date de référence
 * @returns {Object} - Objet avec startOfDay et endOfDay
 */
export const getDayBounds = (date = new Date()) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return null;
  
  const startOfDay = new Date(dateObj);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(dateObj);
  endOfDay.setHours(23, 59, 59, 999);
  
  return { startOfDay, endOfDay };
};

/**
 * Convertit une date en timestamp Unix
 * 
 * @param {Date|string|number} date - Date à convertir
 * @returns {number} - Timestamp Unix en secondes
 */
export const toUnixTimestamp = (date = new Date()) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return 0;
  
  return Math.floor(dateObj.getTime() / 1000);
};

/**
 * Convertit un timestamp Unix en date
 * 
 * @param {number} timestamp - Timestamp Unix en secondes
 * @returns {Date} - Objet Date
 */
export const fromUnixTimestamp = (timestamp) => {
  return new Date(timestamp * 1000);
};
