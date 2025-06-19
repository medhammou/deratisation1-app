import axios from 'axios';
import authService from './authService';

// URL de base de l'API
const API_URL = 'https://api.deratisation.app';

/**
 * Service de gestion des sites
 * Gère les opérations CRUD pour les sites d'intervention
 */
const siteService = {
  /**
   * Récupère la liste de tous les sites
   * 
   * @returns {Promise<Array>} - Liste des sites
   */
  getAllSites: async () => {
    try {
      // Dans une implémentation réelle, vous feriez un appel API
      // Simulation d'un appel API pour la démo
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockSites = [
            {
              id: '1',
              name: 'Restaurant Le Gourmet',
              address: '15 rue de la Paix, Paris',
              coordinates: {
                latitude: 48.8566,
                longitude: 2.3522,
              },
              stationsCount: 12,
              lastVisit: '2025-05-28',
              status: 'active',
              contactPerson: 'Marie Dubois',
              contactPhone: '01 23 45 67 89',
            },
            {
              id: '2',
              name: 'Hôtel Bellevue',
              address: '8 avenue des Champs-Élysées, Paris',
              coordinates: {
                latitude: 48.8606,
                longitude: 2.3376,
              },
              stationsCount: 24,
              lastVisit: '2025-06-01',
              status: 'active',
              contactPerson: 'Pierre Martin',
              contactPhone: '01 98 76 54 32',
            },
            {
              id: '3',
              name: 'Supermarché Express',
              address: '45 boulevard Haussmann, Paris',
              coordinates: {
                latitude: 48.8530,
                longitude: 2.3499,
              },
              stationsCount: 18,
              lastVisit: '2025-05-15',
              status: 'active',
              contactPerson: 'Sophie Leroy',
              contactPhone: '01 11 22 33 44',
            },
          ];
          
          resolve(mockSites);
        }, 800);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des sites:', error);
      throw error;
    }
  },

  /**
   * Récupère les détails d'un site spécifique
   * 
   * @param {string} siteId - ID du site
   * @returns {Promise<Object>} - Détails du site
   */
  getSiteById: async (siteId) => {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulation de la récupération d'un site par ID
          const mockSite = {
            id: siteId,
            name: 'Restaurant Le Gourmet',
            address: '15 rue de la Paix, Paris',
            coordinates: {
              latitude: 48.8566,
              longitude: 2.3522,
            },
            stationsCount: 12,
            lastVisit: '2025-05-28',
            status: 'active',
            contactPerson: 'Marie Dubois',
            contactPhone: '01 23 45 67 89',
            notes: 'Site nécessitant une attention particulière en cuisine.',
            createdAt: '2025-01-15',
          };
          
          if (siteId) {
            resolve(mockSite);
          } else {
            reject(new Error('Site non trouvé'));
          }
        }, 600);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération du site:', error);
      throw error;
    }
  },

  /**
   * Crée un nouveau site
   * 
   * @param {Object} siteData - Données du site à créer
   * @returns {Promise<Object>} - Site créé
   */
  createSite: async (siteData) => {
    try {
      const token = await authService.getToken();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const newSite = {
            id: Date.now().toString(),
            ...siteData,
            stationsCount: 0,
            status: 'active',
            createdAt: new Date().toISOString(),
          };
          
          resolve(newSite);
        }, 1000);
      });
    } catch (error) {
      console.error('Erreur lors de la création du site:', error);
      throw error;
    }
  },

  /**
   * Met à jour un site existant
   * 
   * @param {string} siteId - ID du site
   * @param {Object} siteData - Nouvelles données du site
   * @returns {Promise<Object>} - Site mis à jour
   */
  updateSite: async (siteId, siteData) => {
    try {
      const token = await authService.getToken();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const updatedSite = {
            id: siteId,
            ...siteData,
            updatedAt: new Date().toISOString(),
          };
          
          resolve(updatedSite);
        }, 800);
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du site:', error);
      throw error;
    }
  },

  /**
   * Supprime un site
   * 
   * @param {string} siteId - ID du site à supprimer
   * @returns {Promise<boolean>} - True si suppression réussie
   */
  deleteSite: async (siteId) => {
    try {
      const token = await authService.getToken();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 600);
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du site:', error);
      throw error;
    }
  },
};

export default siteService;
