/**
 * Utilitaires pour la validation des données
 * Fonctions pour valider les entrées utilisateur et les données de l'application
 */

/**
 * Valide une adresse email
 * 
 * @param {string} email - Email à valider
 * @returns {boolean} - True si l'email est valide
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Valide un numéro de téléphone français
 * 
 * @param {string} phone - Numéro de téléphone à valider
 * @returns {boolean} - True si le numéro est valide
 */
export const isValidPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  
  // Supprimer tous les espaces, tirets et points
  const cleanPhone = phone.replace(/[\s\-\.]/g, '');
  
  // Vérifier le format français (10 chiffres commençant par 0, ou +33 suivi de 9 chiffres)
  const frenchPhoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
  return frenchPhoneRegex.test(cleanPhone);
};

/**
 * Valide des coordonnées GPS
 * 
 * @param {number} latitude - Latitude à valider
 * @param {number} longitude - Longitude à valider
 * @returns {Object} - Résultat de la validation avec détails
 */
export const validateCoordinates = (latitude, longitude) => {
  const result = {
    isValid: false,
    errors: [],
  };
  
  // Vérifier que les valeurs sont des nombres
  if (typeof latitude !== 'number' || isNaN(latitude)) {
    result.errors.push('La latitude doit être un nombre valide');
  } else if (latitude < -90 || latitude > 90) {
    result.errors.push('La latitude doit être comprise entre -90 et 90');
  }
  
  if (typeof longitude !== 'number' || isNaN(longitude)) {
    result.errors.push('La longitude doit être un nombre valide');
  } else if (longitude < -180 || longitude > 180) {
    result.errors.push('La longitude doit être comprise entre -180 et 180');
  }
  
  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Valide un identifiant de station
 * 
 * @param {string} identifier - Identifiant à valider
 * @returns {Object} - Résultat de la validation
 */
export const validateStationIdentifier = (identifier) => {
  const result = {
    isValid: false,
    errors: [],
  };
  
  if (!identifier || typeof identifier !== 'string') {
    result.errors.push('L\'identifiant est requis');
    return result;
  }
  
  const trimmedId = identifier.trim();
  
  if (trimmedId.length < 3) {
    result.errors.push('L\'identifiant doit contenir au moins 3 caractères');
  }
  
  if (trimmedId.length > 20) {
    result.errors.push('L\'identifiant ne peut pas dépasser 20 caractères');
  }
  
  // Vérifier le format (lettres, chiffres, tirets et underscores autorisés)
  const identifierRegex = /^[A-Za-z0-9\-_]+$/;
  if (!identifierRegex.test(trimmedId)) {
    result.errors.push('L\'identifiant ne peut contenir que des lettres, chiffres, tirets et underscores');
  }
  
  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Valide un mot de passe
 * 
 * @param {string} password - Mot de passe à valider
 * @param {Object} options - Options de validation
 * @returns {Object} - Résultat de la validation
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false,
  } = options;
  
  const result = {
    isValid: false,
    errors: [],
    strength: 'weak',
  };
  
  if (!password || typeof password !== 'string') {
    result.errors.push('Le mot de passe est requis');
    return result;
  }
  
  if (password.length < minLength) {
    result.errors.push(`Le mot de passe doit contenir au moins ${minLength} caractères`);
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    result.errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    result.errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  
  if (requireNumbers && !/\d/.test(password)) {
    result.errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.errors.push('Le mot de passe doit contenir au moins un caractère spécial');
  }
  
  // Calculer la force du mot de passe
  let strengthScore = 0;
  if (password.length >= 8) strengthScore++;
  if (password.length >= 12) strengthScore++;
  if (/[A-Z]/.test(password)) strengthScore++;
  if (/[a-z]/.test(password)) strengthScore++;
  if (/\d/.test(password)) strengthScore++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strengthScore++;
  
  if (strengthScore <= 2) {
    result.strength = 'weak';
  } else if (strengthScore <= 4) {
    result.strength = 'medium';
  } else {
    result.strength = 'strong';
  }
  
  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Valide les données d'un site
 * 
 * @param {Object} siteData - Données du site à valider
 * @returns {Object} - Résultat de la validation
 */
export const validateSiteData = (siteData) => {
  const result = {
    isValid: false,
    errors: [],
  };
  
  if (!siteData || typeof siteData !== 'object') {
    result.errors.push('Les données du site sont requises');
    return result;
  }
  
  // Valider le nom
  if (!siteData.name || typeof siteData.name !== 'string' || siteData.name.trim().length === 0) {
    result.errors.push('Le nom du site est requis');
  } else if (siteData.name.trim().length > 100) {
    result.errors.push('Le nom du site ne peut pas dépasser 100 caractères');
  }
  
  // Valider l'adresse
  if (!siteData.address || typeof siteData.address !== 'string' || siteData.address.trim().length === 0) {
    result.errors.push('L\'adresse du site est requise');
  } else if (siteData.address.trim().length > 200) {
    result.errors.push('L\'adresse ne peut pas dépasser 200 caractères');
  }
  
  // Valider les coordonnées si fournies
  if (siteData.coordinates) {
    const coordValidation = validateCoordinates(
      siteData.coordinates.latitude,
      siteData.coordinates.longitude
    );
    if (!coordValidation.isValid) {
      result.errors.push(...coordValidation.errors);
    }
  }
  
  // Valider le téléphone de contact si fourni
  if (siteData.contactPhone && !isValidPhoneNumber(siteData.contactPhone)) {
    result.errors.push('Le numéro de téléphone de contact n\'est pas valide');
  }
  
  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Valide les données d'une station
 * 
 * @param {Object} stationData - Données de la station à valider
 * @returns {Object} - Résultat de la validation
 */
export const validateStationData = (stationData) => {
  const result = {
    isValid: false,
    errors: [],
  };
  
  if (!stationData || typeof stationData !== 'object') {
    result.errors.push('Les données de la station sont requises');
    return result;
  }
  
  // Valider l'identifiant
  const identifierValidation = validateStationIdentifier(stationData.identifier);
  if (!identifierValidation.isValid) {
    result.errors.push(...identifierValidation.errors);
  }
  
  // Valider la description
  if (!stationData.description || typeof stationData.description !== 'string' || stationData.description.trim().length === 0) {
    result.errors.push('La description de la station est requise');
  } else if (stationData.description.trim().length > 500) {
    result.errors.push('La description ne peut pas dépasser 500 caractères');
  }
  
  // Valider les coordonnées
  if (stationData.coordinates) {
    const coordValidation = validateCoordinates(
      stationData.coordinates.latitude,
      stationData.coordinates.longitude
    );
    if (!coordValidation.isValid) {
      result.errors.push(...coordValidation.errors);
    }
  } else {
    result.errors.push('Les coordonnées de la station sont requises');
  }
  
  // Valider le statut
  const validStatuses = ['active', 'inactive', 'damaged', 'removed'];
  if (!stationData.status || !validStatuses.includes(stationData.status)) {
    result.errors.push('Le statut de la station doit être: active, inactive, damaged ou removed');
  }
  
  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Valide les données d'une intervention
 * 
 * @param {Object} interventionData - Données de l'intervention à valider
 * @returns {Object} - Résultat de la validation
 */
export const validateInterventionData = (interventionData) => {
  const result = {
    isValid: false,
    errors: [],
  };
  
  if (!interventionData || typeof interventionData !== 'object') {
    result.errors.push('Les données de l\'intervention sont requises');
    return result;
  }
  
  // Valider le type d'intervention
  const validTypes = ['inspection', 'maintenance', 'incident', 'installation'];
  if (!interventionData.type || !validTypes.includes(interventionData.type)) {
    result.errors.push('Le type d\'intervention doit être: inspection, maintenance, incident ou installation');
  }
  
  // Valider le niveau de consommation
  const validLevels = ['none', 'low', 'medium', 'high'];
  if (!interventionData.consumptionLevel || !validLevels.includes(interventionData.consumptionLevel)) {
    result.errors.push('Le niveau de consommation doit être: none, low, medium ou high');
  }
  
  // Valider la date
  if (!interventionData.date) {
    result.errors.push('La date de l\'intervention est requise');
  } else {
    const date = new Date(interventionData.date);
    if (isNaN(date.getTime())) {
      result.errors.push('La date de l\'intervention n\'est pas valide');
    }
  }
  
  // Valider l'ID de la station
  if (!interventionData.stationId || typeof interventionData.stationId !== 'string') {
    result.errors.push('L\'ID de la station est requis');
  }
  
  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Nettoie et normalise une chaîne de caractères
 * 
 * @param {string} str - Chaîne à nettoyer
 * @returns {string} - Chaîne nettoyée
 */
export const sanitizeString = (str) => {
  if (!str || typeof str !== 'string') return '';
  
  return str
    .trim()
    .replace(/\s+/g, ' ') // Remplacer les espaces multiples par un seul
    .replace(/[<>]/g, ''); // Supprimer les caractères potentiellement dangereux
};
