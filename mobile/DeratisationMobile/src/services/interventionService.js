import axios from 'axios';
import authService from './authService';

// URL de base de l'API
const API_URL = 'https://api.deratisation.app';

/**
 * Service de gestion des interventions
 * Gère les opérations CRUD pour les interventions sur les stations
 */
const interventionService = {
  /**
   * Récupère toutes les interventions d'une station
   * 
   * @param {string} stationId - ID de la station
   * @returns {Promise<Array>} - Liste des interventions
   */
  getInterventionsByStation: async (stationId) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockInterventions = [
            {
              id: '1',
              stationId: stationId,
              date: '2025-05-28',
              type: 'maintenance',
              consumptionLevel: 'medium',
              notes: 'Remplacement de l\'appât. Traces d\'activité observées.',
              technician: 'Jean Dupont',
              photos: ['photo1.jpg'],
              createdAt: '2025-05-28T10:30:00Z',
            },
            {
              id: '2',
              stationId: stationId,
              date: '2025-04-15',
              type: 'inspection',
              consumptionLevel: 'high',
              notes: 'Forte activité détectée. Appât presque entièrement consommé.',
              technician: 'Marie Martin',
              photos: ['photo2.jpg', 'photo3.jpg'],
              createdAt: '2025-04-15T14:20:00Z',
            },
            {
              id: '3',
              stationId: stationId,
              date: '2025-03-02',
              type: 'installation',
              consumptionLevel: 'none',
              notes: 'Installation initiale de la station.',
              technician: 'Jean Dupont',
              photos: ['photo4.jpg'],
              createdAt: '2025-03-02T09:15:00Z',
            },
          ];
          
          resolve(mockInterventions);
        }, 800);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des interventions:', error);
      throw error;
    }
  },

  /**
   * Récupère toutes les interventions (avec filtres optionnels)
   * 
   * @param {Object} filters - Filtres optionnels (siteId, type, dateFrom, dateTo)
   * @returns {Promise<Array>} - Liste des interventions
   */
  getAllInterventions: async (filters = {}) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockInterventions = [
            {
              id: '1',
              stationId: '1',
              stationIdentifier: 'ST-1001',
              siteName: 'Restaurant Le Gourmet',
              date: '2025-06-05',
              type: 'maintenance',
              consumptionLevel: 'medium',
              notes: 'Remplacement de l\'appât. Traces d\'activité observées.',
              technician: 'Jean Dupont',
              hasPhoto: true,
            },
            {
              id: '2',
              stationId: '2',
              stationIdentifier: 'ST-1002',
              siteName: 'Hôtel Bellevue',
              date: '2025-06-01',
              type: 'inspection',
              consumptionLevel: 'high',
              notes: 'Forte activité détectée. Appât presque entièrement consommé.',
              technician: 'Marie Martin',
              hasPhoto: true,
            },
            {
              id: '3',
              stationId: '1',
              stationIdentifier: 'ST-1001',
              siteName: 'Restaurant Le Gourmet',
              date: '2025-05-28',
              type: 'incident',
              consumptionLevel: 'low',
              notes: 'Station légèrement endommagée. Réparation effectuée.',
              technician: 'Jean Dupont',
              hasPhoto: false,
            },
          ];
          
          // Appliquer les filtres si nécessaire
          let filteredInterventions = mockInterventions;
          
          if (filters.type && filters.type !== 'all') {
            filteredInterventions = filteredInterventions.filter(
              intervention => intervention.type === filters.type
            );
          }
          
          if (filters.siteId) {
            // Dans une implémentation réelle, vous filtreriez par siteId
            filteredInterventions = filteredInterventions.filter(
              (_, index) => index % 2 === 0
            );
          }
          
          resolve(filteredInterventions);
        }, 800);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des interventions:', error);
      throw error;
    }
  },

  /**
   * Crée une nouvelle intervention
   * 
   * @param {Object} interventionData - Données de l'intervention
   * @returns {Promise<Object>} - Intervention créée
   */
  createIntervention: async (interventionData) => {
    try {
      const token = await authService.getToken();
      const currentUser = await authService.getCurrentUser();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const newIntervention = {
            id: Date.now().toString(),
            ...interventionData,
            technician: currentUser?.name || 'Utilisateur inconnu',
            createdAt: new Date().toISOString(),
            syncStatus: 'pending', // Pour la synchronisation offline
          };
          
          resolve(newIntervention);
        }, 1000);
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'intervention:', error);
      throw error;
    }
  },

  /**
   * Met à jour une intervention existante
   * 
   * @param {string} interventionId - ID de l'intervention
   * @param {Object} interventionData - Nouvelles données de l'intervention
   * @returns {Promise<Object>} - Intervention mise à jour
   */
  updateIntervention: async (interventionId, interventionData) => {
    try {
      const token = await authService.getToken();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const updatedIntervention = {
            id: interventionId,
            ...interventionData,
            updatedAt: new Date().toISOString(),
            syncStatus: 'pending',
          };
          
          resolve(updatedIntervention);
        }, 800);
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'intervention:', error);
      throw error;
    }
  },

  /**
   * Supprime une intervention
   * 
   * @param {string} interventionId - ID de l'intervention à supprimer
   * @returns {Promise<boolean>} - True si suppression réussie
   */
  deleteIntervention: async (interventionId) => {
    try {
      const token = await authService.getToken();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 600);
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'intervention:', error);
      throw error;
    }
  },
};

export default interventionService;
