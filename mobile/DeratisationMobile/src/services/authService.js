import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL de base de l'API
// Dans une implémentation réelle, cela serait configuré via des variables d'environnement
const API_URL = 'https://api.deratisation.app';

/**
 * Service d'authentification
 * Gère les opérations liées à l'authentification des utilisateurs
 */
const authService = {
  /**
   * Connecte un utilisateur avec ses identifiants
   * 
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   * @returns {Promise<Object>} - Informations de l'utilisateur et token
   */
  login: async (email, password) => {
    try {
      // Dans une implémentation réelle, vous feriez un appel API
      // Simulation d'un appel API pour la démo
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Vérification simple des identifiants pour la démo
          if (email === 'demo@example.com' && password === 'password') {
            const userData = {
              id: '1',
              email: 'demo@example.com',
              name: 'Jean Dupont',
              role: 'technician',
              token: 'fake-jwt-token-12345',
            };
            
            // Stocker le token dans AsyncStorage
            AsyncStorage.setItem('auth_token', userData.token);
            AsyncStorage.setItem('user_data', JSON.stringify(userData));
            
            resolve(userData);
          } else {
            reject(new Error('Identifiants incorrects'));
          }
        }, 1000);
      });
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  /**
   * Déconnecte l'utilisateur actuel
   * 
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      // Supprimer le token et les données utilisateur
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  },

  /**
   * Vérifie si l'utilisateur est connecté
   * 
   * @returns {Promise<boolean>} - True si l'utilisateur est connecté
   */
  isAuthenticated: async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      return !!token;
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      return false;
    }
  },

  /**
   * Récupère les informations de l'utilisateur connecté
   * 
   * @returns {Promise<Object|null>} - Informations de l'utilisateur ou null
   */
  getCurrentUser: async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return null;
    }
  },

  /**
   * Récupère le token d'authentification
   * 
   * @returns {Promise<string|null>} - Token d'authentification ou null
   */
  getToken: async () => {
    try {
      return await AsyncStorage.getItem('auth_token');
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      return null;
    }
  },
};

export default authService;
