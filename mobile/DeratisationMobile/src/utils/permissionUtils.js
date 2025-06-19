/**
 * Utilitaires pour la gestion des permissions
 * Fonctions pour vérifier et gérer les permissions de l'application
 */

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native';

/**
 * Types de permissions supportés
 */
export const PermissionTypes = {
  CAMERA: 'camera',
  LOCATION: 'location',
  MEDIA_LIBRARY: 'mediaLibrary',
  STORAGE: 'storage',
  NOTIFICATIONS: 'notifications',
};

/**
 * Vérifie si une permission est accordée
 * 
 * @param {string} permissionType - Type de permission à vérifier
 * @returns {Promise<boolean>} - True si la permission est accordée
 */
export const checkPermission = async (permissionType) => {
  try {
    switch (permissionType) {
      case PermissionTypes.CAMERA:
        const cameraStatus = await ImagePicker.getCameraPermissionsAsync();
        return cameraStatus.status === 'granted';
        
      case PermissionTypes.LOCATION:
        const locationStatus = await Location.getForegroundPermissionsAsync();
        return locationStatus.status === 'granted';
        
      case PermissionTypes.MEDIA_LIBRARY:
        const mediaLibraryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
        return mediaLibraryStatus.status === 'granted';
        
      case PermissionTypes.STORAGE:
        // Sur Android, vérifier les permissions de stockage
        if (Platform.OS === 'android') {
          const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
          return status === 'granted';
        }
        // Sur iOS, pas besoin de permission explicite pour le stockage
        return true;
        
      case PermissionTypes.NOTIFICATIONS:
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        return status === 'granted';
        
      default:
        console.warn(`Type de permission non supporté: ${permissionType}`);
        return false;
    }
  } catch (error) {
    console.error(`Erreur lors de la vérification de la permission ${permissionType}:`, error);
    return false;
  }
};

/**
 * Demande une permission à l'utilisateur
 * 
 * @param {string} permissionType - Type de permission à demander
 * @param {Object} options - Options supplémentaires
 * @returns {Promise<boolean>} - True si la permission est accordée
 */
export const requestPermission = async (permissionType, options = {}) => {
  try {
    const { showRationale = true } = options;
    
    // Vérifier si la permission est déjà accordée
    const isGranted = await checkPermission(permissionType);
    if (isGranted) return true;
    
    // Préparer les messages de justification
    const rationaleMessages = {
      [PermissionTypes.CAMERA]: 'L\'accès à la caméra est nécessaire pour prendre des photos des stations et documenter les interventions.',
      [PermissionTypes.LOCATION]: 'L\'accès à la localisation est nécessaire pour positionner les stations sur la carte et faciliter votre travail sur le terrain.',
      [PermissionTypes.MEDIA_LIBRARY]: 'L\'accès à la galerie est nécessaire pour sélectionner des photos existantes pour les stations et interventions.',
      [PermissionTypes.STORAGE]: 'L\'accès au stockage est nécessaire pour sauvegarder les photos et les données de l\'application.',
      [PermissionTypes.NOTIFICATIONS]: 'Les notifications sont utilisées pour vous alerter des interventions planifiées et des mises à jour importantes.',
    };
    
    // Afficher une justification si nécessaire
    if (showRationale) {
      const message = rationaleMessages[permissionType] || 'Cette permission est nécessaire pour le bon fonctionnement de l\'application.';
      
      return new Promise((resolve) => {
        Alert.alert(
          'Permission requise',
          message,
          [
            {
              text: 'Annuler',
              style: 'cancel',
              onPress: () => resolve(false),
            },
            {
              text: 'Autoriser',
              onPress: async () => {
                const result = await requestPermissionDirectly(permissionType);
                resolve(result);
              },
            },
          ],
          { cancelable: false }
        );
      });
    }
    
    // Demander directement la permission
    return await requestPermissionDirectly(permissionType);
  } catch (error) {
    console.error(`Erreur lors de la demande de permission ${permissionType}:`, error);
    return false;
  }
};

/**
 * Demande directement une permission sans afficher de justification
 * 
 * @param {string} permissionType - Type de permission à demander
 * @returns {Promise<boolean>} - True si la permission est accordée
 */
const requestPermissionDirectly = async (permissionType) => {
  try {
    switch (permissionType) {
      case PermissionTypes.CAMERA:
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        return cameraStatus.status === 'granted';
        
      case PermissionTypes.LOCATION:
        const locationStatus = await Location.requestForegroundPermissionsAsync();
        return locationStatus.status === 'granted';
        
      case PermissionTypes.MEDIA_LIBRARY:
        const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return mediaLibraryStatus.status === 'granted';
        
      case PermissionTypes.STORAGE:
        if (Platform.OS === 'android') {
          const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
          return status === 'granted';
        }
        return true;
        
      case PermissionTypes.NOTIFICATIONS:
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        return status === 'granted';
        
      default:
        console.warn(`Type de permission non supporté: ${permissionType}`);
        return false;
    }
  } catch (error) {
    console.error(`Erreur lors de la demande directe de permission ${permissionType}:`, error);
    return false;
  }
};

/**
 * Vérifie plusieurs permissions en une seule fois
 * 
 * @param {Array<string>} permissionTypes - Types de permissions à vérifier
 * @returns {Promise<Object>} - Statut de chaque permission
 */
export const checkMultiplePermissions = async (permissionTypes) => {
  try {
    const results = {};
    
    for (const type of permissionTypes) {
      results[type] = await checkPermission(type);
    }
    
    return results;
  } catch (error) {
    console.error('Erreur lors de la vérification des permissions:', error);
    return {};
  }
};

/**
 * Vérifie si l'utilisateur a les permissions nécessaires pour utiliser la caméra
 * 
 * @returns {Promise<boolean>} - True si toutes les permissions sont accordées
 */
export const checkCameraPermissions = async () => {
  return await checkPermission(PermissionTypes.CAMERA);
};

/**
 * Vérifie si l'utilisateur a les permissions nécessaires pour utiliser la localisation
 * 
 * @returns {Promise<boolean>} - True si toutes les permissions sont accordées
 */
export const checkLocationPermissions = async () => {
  return await checkPermission(PermissionTypes.LOCATION);
};

/**
 * Vérifie si l'utilisateur a les permissions nécessaires pour accéder à la galerie
 * 
 * @returns {Promise<boolean>} - True si toutes les permissions sont accordées
 */
export const checkMediaLibraryPermissions = async () => {
  return await checkPermission(PermissionTypes.MEDIA_LIBRARY);
};

/**
 * Vérifie si l'utilisateur a les permissions nécessaires pour une intervention
 * (caméra, localisation, stockage)
 * 
 * @returns {Promise<Object>} - Statut de chaque permission nécessaire
 */
export const checkInterventionPermissions = async () => {
  return await checkMultiplePermissions([
    PermissionTypes.CAMERA,
    PermissionTypes.LOCATION,
    PermissionTypes.STORAGE,
  ]);
};

/**
 * Demande toutes les permissions nécessaires pour une intervention
 * 
 * @returns {Promise<boolean>} - True si toutes les permissions sont accordées
 */
export const requestInterventionPermissions = async () => {
  try {
    const cameraGranted = await requestPermission(PermissionTypes.CAMERA);
    const locationGranted = await requestPermission(PermissionTypes.LOCATION);
    const storageGranted = await requestPermission(PermissionTypes.STORAGE);
    
    return cameraGranted && locationGranted && storageGranted;
  } catch (error) {
    console.error('Erreur lors de la demande des permissions d\'intervention:', error);
    return false;
  }
};
