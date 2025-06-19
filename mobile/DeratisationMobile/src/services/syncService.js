import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from './authService';

/**
 * Service de synchronisation des données
 * Gère la synchronisation entre la base de données locale et le serveur
 */
const syncService = {
  /**
   * Clé pour stocker la date de dernière synchronisation
   */
  LAST_SYNC_KEY: 'last_sync_timestamp',

  /**
   * Vérifie si l'appareil est connecté à Internet
   * 
   * @returns {Promise<boolean>} - True si connecté
   */
  isConnected: async () => {
    try {
      const netInfo = await NetInfo.fetch();
      return netInfo.isConnected && netInfo.isInternetReachable;
    } catch (error) {
      console.error('Erreur lors de la vérification de la connexion:', error);
      return false;
    }
  },

  /**
   * Récupère la date de dernière synchronisation
   * 
   * @returns {Promise<string|null>} - Date de dernière synchronisation ou null
   */
  getLastSyncTimestamp: async () => {
    try {
      return await AsyncStorage.getItem(syncService.LAST_SYNC_KEY);
    } catch (error) {
      console.error('Erreur lors de la récupération de la date de dernière synchronisation:', error);
      return null;
    }
  },

  /**
   * Met à jour la date de dernière synchronisation
   * 
   * @returns {Promise<void>}
   */
  updateLastSyncTimestamp: async () => {
    try {
      const now = new Date().toISOString();
      await AsyncStorage.setItem(syncService.LAST_SYNC_KEY, now);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la date de dernière synchronisation:', error);
    }
  },

  /**
   * Synchronise les données locales avec le serveur
   * 
   * @param {Object} options - Options de synchronisation
   * @param {boolean} options.forceSync - Forcer la synchronisation même si récente
   * @param {Function} options.onProgress - Callback pour suivre la progression
   * @returns {Promise<Object>} - Résultat de la synchronisation
   */
  synchronize: async (options = {}) => {
    try {
      const { forceSync = false, onProgress } = options;
      
      // Vérifier la connexion Internet
      const isConnected = await syncService.isConnected();
      if (!isConnected) {
        throw new Error('Pas de connexion Internet');
      }

      // Vérifier si une synchronisation est nécessaire
      if (!forceSync) {
        const lastSync = await syncService.getLastSyncTimestamp();
        const now = new Date();
        const lastSyncDate = lastSync ? new Date(lastSync) : null;
        
        // Si la dernière synchronisation date de moins d'une heure, ne pas synchroniser
        if (lastSyncDate && (now - lastSyncDate) < 3600000) {
          return { success: true, message: 'Synchronisation récente, ignorée', syncedAt: lastSync };
        }
      }

      // Simuler la synchronisation
      return new Promise((resolve) => {
        // Simuler les étapes de synchronisation
        const steps = [
          { name: 'sites', total: 10 },
          { name: 'stations', total: 30 },
          { name: 'interventions', total: 50 },
          { name: 'photos', total: 20 },
        ];
        
        let currentStep = 0;
        let currentProgress = 0;
        
        const interval = setInterval(() => {
          if (currentStep >= steps.length) {
            clearInterval(interval);
            
            // Mettre à jour la date de dernière synchronisation
            syncService.updateLastSyncTimestamp();
            
            resolve({
              success: true,
              message: 'Synchronisation terminée avec succès',
              syncedAt: new Date().toISOString(),
              stats: {
                sites: { synced: 10, failed: 0 },
                stations: { synced: 30, failed: 0 },
                interventions: { synced: 50, failed: 0 },
                photos: { synced: 20, failed: 0 },
              }
            });
            return;
          }
          
          const step = steps[currentStep];
          currentProgress += 10;
          
          if (onProgress) {
            onProgress({
              step: step.name,
              progress: Math.min(currentProgress, 100),
              total: step.total,
              current: Math.min(currentProgress / 10 * step.total / 10, step.total),
            });
          }
          
          if (currentProgress >= 100) {
            currentStep++;
            currentProgress = 0;
          }
        }, 300);
      });
    } catch (error) {
      console.error('Erreur lors de la synchronisation:', error);
      return {
        success: false,
        message: error.message || 'Erreur de synchronisation',
        error,
      };
    }
  },

  /**
   * Synchronise une entité spécifique
   * 
   * @param {string} entityType - Type d'entité ('site', 'station', 'intervention', 'photo')
   * @param {string} entityId - ID de l'entité
   * @returns {Promise<Object>} - Résultat de la synchronisation
   */
  synchronizeEntity: async (entityType, entityId) => {
    try {
      // Vérifier la connexion Internet
      const isConnected = await syncService.isConnected();
      if (!isConnected) {
        throw new Error('Pas de connexion Internet');
      }

      // Simuler la synchronisation d'une entité spécifique
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: `${entityType} #${entityId} synchronisé avec succès`,
            syncedAt: new Date().toISOString(),
          });
        }, 800);
      });
    } catch (error) {
      console.error(`Erreur lors de la synchronisation de ${entityType} #${entityId}:`, error);
      return {
        success: false,
        message: error.message || 'Erreur de synchronisation',
        error,
      };
    }
  },

  /**
   * Récupère les modifications en attente de synchronisation
   * 
   * @returns {Promise<Object>} - Statistiques des modifications en attente
   */
  getPendingChanges: async () => {
    try {
      // Dans une implémentation réelle, vous interrogeriez la base de données locale
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            sites: { count: 0 },
            stations: { count: 2 },
            interventions: { count: 5 },
            photos: { count: 3 },
            total: 10,
          });
        }, 500);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des modifications en attente:', error);
      throw error;
    }
  },

  /**
   * Efface toutes les données locales et force une synchronisation complète
   * 
   * @param {Function} onProgress - Callback pour suivre la progression
   * @returns {Promise<Object>} - Résultat de l'opération
   */
  resetAndSync: async (onProgress) => {
    try {
      // Vérifier la connexion Internet
      const isConnected = await syncService.isConnected();
      if (!isConnected) {
        throw new Error('Pas de connexion Internet');
      }

      // Simuler la réinitialisation et la synchronisation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simuler la progression
          if (onProgress) {
            onProgress({ step: 'reset', progress: 50 });
          }
          
          setTimeout(() => {
            if (onProgress) {
              onProgress({ step: 'sync', progress: 100 });
            }
            
            // Mettre à jour la date de dernière synchronisation
            syncService.updateLastSyncTimestamp();
            
            resolve({
              success: true,
              message: 'Réinitialisation et synchronisation terminées avec succès',
              syncedAt: new Date().toISOString(),
            });
          }, 1500);
        }, 1500);
      });
    } catch (error) {
      console.error('Erreur lors de la réinitialisation et synchronisation:', error);
      return {
        success: false,
        message: error.message || 'Erreur de réinitialisation et synchronisation',
        error,
      };
    }
  },
};

export default syncService;
