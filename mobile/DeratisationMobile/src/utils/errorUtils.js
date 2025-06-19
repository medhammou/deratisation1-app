/**
 * Utilitaires pour la gestion des erreurs
 * Fonctions pour capturer, traiter et journaliser les erreurs dans l'application
 */

import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

// Répertoire des logs
const LOGS_DIRECTORY = `${FileSystem.documentDirectory}logs/`;

/**
 * Types d'erreurs
 */
export const ErrorTypes = {
  NETWORK: 'network',
  API: 'api',
  DATABASE: 'database',
  PERMISSION: 'permission',
  VALIDATION: 'validation',
  FILE: 'file',
  SYNC: 'sync',
  AUTH: 'auth',
  UNKNOWN: 'unknown',
};

/**
 * Niveaux de gravité des erreurs
 */
export const ErrorSeverity = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
};

/**
 * Initialise le répertoire des logs
 * 
 * @returns {Promise<boolean>} - True si l'initialisation a réussi
 */
export const initializeLogsDirectory = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(LOGS_DIRECTORY);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(LOGS_DIRECTORY, { intermediates: true });
    }
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du répertoire des logs:', error);
    return false;
  }
};

/**
 * Journalise une erreur dans un fichier
 * 
 * @param {Error|Object|string} error - Erreur à journaliser
 * @param {Object} options - Options de journalisation
 * @returns {Promise<Object>} - Résultat de la journalisation
 */
export const logError = async (error, options = {}) => {
  try {
    // Initialiser le répertoire des logs si nécessaire
    await initializeLogsDirectory();
    
    const {
      type = ErrorTypes.UNKNOWN,
      severity = ErrorSeverity.ERROR,
      context = {},
      user = null,
    } = options;
    
    // Préparer les données de l'erreur
    const timestamp = new Date().toISOString();
    const date = timestamp.split('T')[0];
    
    let errorMessage = '';
    let errorStack = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorStack = error.stack || '';
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (typeof error === 'object') {
      errorMessage = error.message || JSON.stringify(error);
    } else {
      errorMessage = String(error);
    }
    
    // Créer l'entrée de log
    const logEntry = {
      timestamp,
      type,
      severity,
      message: errorMessage,
      stack: errorStack,
      context,
      user,
    };
    
    // Nom du fichier de log (un fichier par jour)
    const logFileName = `${date}.log`;
    const logFilePath = `${LOGS_DIRECTORY}${logFileName}`;
    
    // Vérifier si le fichier existe déjà
    const fileInfo = await FileSystem.getInfoAsync(logFilePath);
    
    // Ajouter l'entrée au fichier de log
    const logLine = `${JSON.stringify(logEntry)}\n`;
    
    if (fileInfo.exists) {
      await FileSystem.writeAsStringAsync(logFilePath, logLine, { encoding: FileSystem.EncodingType.UTF8, append: true });
    } else {
      await FileSystem.writeAsStringAsync(logFilePath, logLine, { encoding: FileSystem.EncodingType.UTF8 });
    }
    
    // Journaliser également dans la console
    if (severity === ErrorSeverity.ERROR || severity === ErrorSeverity.CRITICAL) {
      console.error(`[${type.toUpperCase()}] ${errorMessage}`, context);
    } else if (severity === ErrorSeverity.WARNING) {
      console.warn(`[${type.toUpperCase()}] ${errorMessage}`, context);
    } else {
      console.log(`[${type.toUpperCase()}] ${errorMessage}`, context);
    }
    
    return {
      success: true,
      logFilePath,
      timestamp,
    };
  } catch (logError) {
    console.error('Erreur lors de la journalisation:', logError);
    return {
      success: false,
      error: logError.message,
    };
  }
};

/**
 * Gère une erreur (journalisation + affichage utilisateur si nécessaire)
 * 
 * @param {Error|Object|string} error - Erreur à gérer
 * @param {Object} options - Options de gestion
 * @returns {Promise<Object>} - Résultat de la gestion
 */
export const handleError = async (error, options = {}) => {
  try {
    const {
      type = ErrorTypes.UNKNOWN,
      severity = ErrorSeverity.ERROR,
      context = {},
      user = null,
      showAlert = true,
      alertTitle = 'Erreur',
      alertMessage = null,
      onAlertDismiss = null,
    } = options;
    
    // Journaliser l'erreur
    await logError(error, { type, severity, context, user });
    
    // Déterminer le message à afficher
    let displayMessage = alertMessage;
    
    if (!displayMessage) {
      if (error instanceof Error) {
        displayMessage = error.message;
      } else if (typeof error === 'string') {
        displayMessage = error;
      } else if (typeof error === 'object' && error.message) {
        displayMessage = error.message;
      } else {
        displayMessage = 'Une erreur est survenue. Veuillez réessayer.';
      }
    }
    
    // Afficher une alerte si demandé
    if (showAlert) {
      Alert.alert(
        alertTitle,
        displayMessage,
        [{ text: 'OK', onPress: onAlertDismiss }]
      );
    }
    
    return {
      success: true,
      handled: true,
      message: displayMessage,
    };
  } catch (handlingError) {
    console.error('Erreur lors de la gestion d\'erreur:', handlingError);
    return {
      success: false,
      error: handlingError.message,
    };
  }
};

/**
 * Gère une erreur réseau
 * 
 * @param {Error|Object|string} error - Erreur à gérer
 * @param {Object} options - Options de gestion
 * @returns {Promise<Object>} - Résultat de la gestion
 */
export const handleNetworkError = async (error, options = {}) => {
  const defaultMessage = 'Problème de connexion réseau. Veuillez vérifier votre connexion et réessayer.';
  
  return handleError(error, {
    type: ErrorTypes.NETWORK,
    severity: ErrorSeverity.WARNING,
    alertTitle: 'Erreur de connexion',
    alertMessage: options.alertMessage || defaultMessage,
    ...options,
  });
};

/**
 * Gère une erreur d'API
 * 
 * @param {Error|Object|string} error - Erreur à gérer
 * @param {Object} options - Options de gestion
 * @returns {Promise<Object>} - Résultat de la gestion
 */
export const handleApiError = async (error, options = {}) => {
  const defaultMessage = 'Erreur lors de la communication avec le serveur. Veuillez réessayer ultérieurement.';
  
  return handleError(error, {
    type: ErrorTypes.API,
    severity: ErrorSeverity.ERROR,
    alertTitle: 'Erreur de serveur',
    alertMessage: options.alertMessage || defaultMessage,
    ...options,
  });
};

/**
 * Gère une erreur de base de données
 * 
 * @param {Error|Object|string} error - Erreur à gérer
 * @param {Object} options - Options de gestion
 * @returns {Promise<Object>} - Résultat de la gestion
 */
export const handleDatabaseError = async (error, options = {}) => {
  const defaultMessage = 'Erreur lors de l\'accès aux données. Veuillez redémarrer l\'application.';
  
  return handleError(error, {
    type: ErrorTypes.DATABASE,
    severity: ErrorSeverity.ERROR,
    alertTitle: 'Erreur de données',
    alertMessage: options.alertMessage || defaultMessage,
    ...options,
  });
};

/**
 * Gère une erreur de permission
 * 
 * @param {Error|Object|string} error - Erreur à gérer
 * @param {Object} options - Options de gestion
 * @returns {Promise<Object>} - Résultat de la gestion
 */
export const handlePermissionError = async (error, options = {}) => {
  const defaultMessage = 'Autorisation refusée. Veuillez activer les permissions nécessaires dans les paramètres de votre appareil.';
  
  return handleError(error, {
    type: ErrorTypes.PERMISSION,
    severity: ErrorSeverity.WARNING,
    alertTitle: 'Permission requise',
    alertMessage: options.alertMessage || defaultMessage,
    ...options,
  });
};

/**
 * Récupère les logs d'erreurs
 * 
 * @param {Object} options - Options de récupération
 * @returns {Promise<Object>} - Logs d'erreurs
 */
export const getErrorLogs = async (options = {}) => {
  try {
    const {
      date = null, // Si null, récupère tous les logs
      maxEntries = 100,
      severity = null, // Si null, récupère tous les niveaux de gravité
      type = null, // Si null, récupère tous les types d'erreurs
    } = options;
    
    // Initialiser le répertoire des logs si nécessaire
    await initializeLogsDirectory();
    
    // Lire les fichiers de logs
    const logFiles = await FileSystem.readDirectoryAsync(LOGS_DIRECTORY);
    
    // Filtrer par date si spécifiée
    const filteredLogFiles = date 
      ? logFiles.filter(file => file.startsWith(date))
      : logFiles.sort().reverse(); // Du plus récent au plus ancien
    
    const logs = [];
    
    // Lire le contenu des fichiers de logs
    for (const logFile of filteredLogFiles) {
      if (logs.length >= maxEntries) break;
      
      const logFilePath = `${LOGS_DIRECTORY}${logFile}`;
      const content = await FileSystem.readAsStringAsync(logFilePath);
      
      // Traiter chaque ligne comme une entrée de log
      const lines = content.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        if (logs.length >= maxEntries) break;
        
        try {
          const logEntry = JSON.parse(line);
          
          // Filtrer par gravité si spécifiée
          if (severity && logEntry.severity !== severity) continue;
          
          // Filtrer par type si spécifié
          if (type && logEntry.type !== type) continue;
          
          logs.push(logEntry);
        } catch (parseError) {
          console.warn('Erreur lors de l\'analyse d\'une entrée de log:', parseError);
        }
      }
    }
    
    return {
      success: true,
      logs,
      total: logs.length,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des logs:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Nettoie les anciens logs
 * 
 * @param {Object} options - Options de nettoyage
 * @returns {Promise<Object>} - Résultat du nettoyage
 */
export const cleanOldLogs = async (options = {}) => {
  try {
    const {
      olderThan = 30, // Nombre de jours
    } = options;
    
    // Initialiser le répertoire des logs si nécessaire
    await initializeLogsDirectory();
    
    // Lire les fichiers de logs
    const logFiles = await FileSystem.readDirectoryAsync(LOGS_DIRECTORY);
    
    // Calculer la date limite
    const now = new Date();
    const limitDate = new Date(now);
    limitDate.setDate(limitDate.getDate() - olderThan);
    const limitDateStr = limitDate.toISOString().split('T')[0];
    
    // Filtrer les fichiers à supprimer
    const filesToDelete = logFiles.filter(file => {
      const fileDate = file.split('.')[0]; // Supposant que le nom du fichier est YYYY-MM-DD.log
      return fileDate < limitDateStr;
    });
    
    // Supprimer les fichiers
    const deletedFiles = [];
    
    for (const file of filesToDelete) {
      const filePath = `${LOGS_DIRECTORY}${file}`;
      await FileSystem.deleteAsync(filePath);
      deletedFiles.push(file);
    }
    
    return {
      success: true,
      deletedCount: deletedFiles.length,
      deletedFiles,
    };
  } catch (error) {
    console.error('Erreur lors du nettoyage des anciens logs:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Exporte les logs d'erreurs
 * 
 * @param {Object} options - Options d'exportation
 * @returns {Promise<Object>} - Résultat de l'exportation
 */
export const exportErrorLogs = async (options = {}) => {
  try {
    const {
      format = 'json', // 'json' ou 'text'
      date = null, // Si null, exporte tous les logs
    } = options;
    
    // Récupérer les logs
    const { logs } = await getErrorLogs({ date, maxEntries: 1000 });
    
    // Générer le nom du fichier
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = date 
      ? `logs_${date}_${timestamp}.${format}`
      : `logs_all_${timestamp}.${format}`;
    
    // Créer le répertoire d'export si nécessaire
    const exportDir = `${FileSystem.documentDirectory}exports/`;
    const dirInfo = await FileSystem.getInfoAsync(exportDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(exportDir, { intermediates: true });
    }
    
    const filePath = `${exportDir}${fileName}`;
    
    // Formater et écrire les logs
    if (format === 'json') {
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(logs, null, 2));
    } else {
      // Format texte
      const textContent = logs.map(log => {
        return `[${log.timestamp}] [${log.severity.toUpperCase()}] [${log.type}] ${log.message}\n` +
               `Context: ${JSON.stringify(log.context)}\n` +
               (log.stack ? `Stack: ${log.stack}\n` : '') +
               '----------------------------------------';
      }).join('\n\n');
      
      await FileSystem.writeAsStringAsync(filePath, textContent);
    }
    
    return {
      success: true,
      filePath,
      fileName,
      logsCount: logs.length,
    };
  } catch (error) {
    console.error('Erreur lors de l\'exportation des logs:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
