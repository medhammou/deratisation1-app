import axios from 'axios';
import authService from './authService';

// URL de base de l'API
const API_URL = 'https://api.deratisation.app';

/**
 * Service de gestion des stations
 * Gère les opérations CRUD pour les stations d'appâtage
 */
const stationService = {
  /**
   * Récupère toutes les stations d'un site
   * 
   * @param {string} siteId - ID du site
   * @returns {Promise<Array>} - Liste des stations
   */
  getStationsBySite: async (siteId) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockStations = [
            {
              id: '1',
              identifier: 'ST-1001',
              description: 'Station située près de l\'entrée principale',
              status: 'active',
              lastConsumptionLevel: 'medium',
              coordinates: {
                latitude: 48.8566,
                longitude: 2.3522,
              },
              installationDate: '2025-01-15',
              lastInterventionDate: '2025-05-28',
              siteId: siteId,
            },
            {
              id: '2',
              identifier: 'ST-1002',
              description: 'Station en cuisine, zone de stockage',
              status: 'active',
              lastConsumptionLevel: 'high',
              coordinates: {
                latitude: 48.8568,
                longitude: 2.3525,
              },
              installationDate: '2025-01-15',
              lastInterventionDate: '2025-06-01',
              siteId: siteId,
            },
            {
              id: '3',
              identifier: 'ST-1003',
              description: 'Station dans la réserve',
              status: 'damaged',
              lastConsumptionLevel: 'low',
              coordinates: {
                latitude: 48.8564,
                longitude: 2.3520,
              },
              installationDate: '2025-01-15',
              lastInterventionDate: '2025-05-20',
              siteId: siteId,
            },
          ];
          
          resolve(mockStations);
        }, 800);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des stations:', error);
      throw error;
    }
  },

  /**
   * Récupère les détails d'une station spécifique
   * 
   * @param {string} stationId - ID de la station
   * @returns {Promise<Object>} - Détails de la station
   */
  getStationById: async (stationId) => {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const mockStation = {
            id: stationId,
            identifier: 'ST-1001',
            description: 'Station située près de l\'entrée principale, derrière le comptoir d\'accueil.',
            status: 'active',
            lastConsumptionLevel: 'medium',
            coordinates: {
              latitude: 48.8566,
              longitude: 2.3522,
            },
            installationDate: '2025-01-15',
            lastInterventionDate: '2025-05-28',
            notes: 'Station facilement accessible. Vérifier régulièrement car zone à fort passage.',
            photos: [
              { id: 'p1', uri: 'https://example.com/photo1.jpg', date: '2025-05-28' },
              { id: 'p2', uri: 'https://example.com/photo2.jpg', date: '2025-04-15' },
            ],
            siteId: '1',
          };
          
          if (stationId) {
            resolve(mockStation);
          } else {
            reject(new Error('Station non trouvée'));
          }
        }, 600);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de la station:', error);
      throw error;
    }
  },

  /**
   * Crée une nouvelle station
   * 
   * @param {Object} stationData - Données de la station à créer
   * @returns {Promise<Object>} - Station créée
   */
  createStation: async (stationData) => {
    try {
      const token = await authService.getToken();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const newStation = {
            id: Date.now().toString(),
            ...stationData,
            status: stationData.status || 'active',
            lastConsumptionLevel: 'none',
            installationDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          };
          
          resolve(newStation);
        }, 1000);
      });
    } catch (error) {
      console.error('Erreur lors de la création de la station:', error);
      throw error;
    }
  },

  /**
   * Met à jour une station existante
   * 
   * @param {string} stationId - ID de la station
   * @param {Object} stationData - Nouvelles données de la station
   * @returns {Promise<Object>} - Station mise à jour
   */
  updateStation: async (stationId, stationData) => {
    try {
      const token = await authService.getToken();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const updatedStation = {
            id: stationId,
            ...stationData,
            updatedAt: new Date().toISOString(),
          };
          
          resolve(updatedStation);
        }, 800);
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la station:', error);
      throw error;
    }
  },

  /**
   * Supprime une station
   * 
   * @param {string} stationId - ID de la station à supprimer
   * @returns {Promise<boolean>} - True si suppression réussie
   */
  deleteStation: async (stationId) => {
    try {
      const token = await authService.getToken();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 600);
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de la station:', error);
      throw error;
    }
  },

  /**
   * Marque une station comme retirée
   * 
   * @param {string} stationId - ID de la station
   * @returns {Promise<Object>} - Station mise à jour
   */
  markAsRemoved: async (stationId) => {
    try {
      const token = await authService.getToken();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const updatedStation = {
            id: stationId,
            status: 'removed',
            removedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          resolve(updatedStation);
        }, 600);
      });
    } catch (error) {
      console.error('Erreur lors du marquage de la station comme retirée:', error);
      throw error;
    }
  },
};

export default stationService;
