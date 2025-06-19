import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import authService from './authService';

/**
 * Service de gestion des photos
 * Gère les opérations liées aux photos (prise, stockage, upload)
 */
const photoService = {
  /**
   * Répertoire de stockage local des photos
   */
  PHOTOS_DIRECTORY: `${FileSystem.documentDirectory}photos/`,

  /**
   * Initialise le répertoire de stockage des photos
   * 
   * @returns {Promise<void>}
   */
  initPhotoDirectory: async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(photoService.PHOTOS_DIRECTORY);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(photoService.PHOTOS_DIRECTORY, { intermediates: true });
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du répertoire photos:', error);
      throw error;
    }
  },

  /**
   * Prend une photo avec l'appareil photo
   * 
   * @returns {Promise<Object>} - Informations sur la photo prise
   */
  takePhoto: async () => {
    try {
      // Vérifier les permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission d\'accès à la caméra refusée');
      }

      // Prendre une photo
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }

      // Initialiser le répertoire si nécessaire
      await photoService.initPhotoDirectory();

      const selectedImage = result.assets[0];
      const fileName = `photo_${Date.now()}.jpg`;
      const localUri = `${photoService.PHOTOS_DIRECTORY}${fileName}`;

      // Copier l'image dans le répertoire de l'application
      await FileSystem.copyAsync({
        from: selectedImage.uri,
        to: localUri,
      });

      // Obtenir les informations sur le fichier
      const fileInfo = await FileSystem.getInfoAsync(localUri);

      return {
        uri: localUri,
        name: fileName,
        type: 'image/jpeg',
        size: fileInfo.size,
        width: selectedImage.width,
        height: selectedImage.height,
        timestamp: new Date().toISOString(),
        syncStatus: 'pending',
      };
    } catch (error) {
      console.error('Erreur lors de la prise de photo:', error);
      throw error;
    }
  },

  /**
   * Sélectionne une photo depuis la galerie
   * 
   * @returns {Promise<Object>} - Informations sur la photo sélectionnée
   */
  pickPhoto: async () => {
    try {
      // Vérifier les permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission d\'accès à la galerie refusée');
      }

      // Sélectionner une image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }

      // Initialiser le répertoire si nécessaire
      await photoService.initPhotoDirectory();

      const selectedImage = result.assets[0];
      const fileName = `photo_${Date.now()}.jpg`;
      const localUri = `${photoService.PHOTOS_DIRECTORY}${fileName}`;

      // Copier l'image dans le répertoire de l'application
      await FileSystem.copyAsync({
        from: selectedImage.uri,
        to: localUri,
      });

      // Obtenir les informations sur le fichier
      const fileInfo = await FileSystem.getInfoAsync(localUri);

      return {
        uri: localUri,
        name: fileName,
        type: 'image/jpeg',
        size: fileInfo.size,
        width: selectedImage.width,
        height: selectedImage.height,
        timestamp: new Date().toISOString(),
        syncStatus: 'pending',
      };
    } catch (error) {
      console.error('Erreur lors de la sélection de photo:', error);
      throw error;
    }
  },

  /**
   * Enregistre une photo pour une station ou une intervention
   * 
   * @param {Object} photoData - Données de la photo
   * @param {string} relatedType - Type d'entité liée ('station' ou 'intervention')
   * @param {string} relatedId - ID de l'entité liée
   * @returns {Promise<Object>} - Informations sur la photo enregistrée
   */
  savePhoto: async (photoData, relatedType, relatedId) => {
    try {
      // Dans une implémentation réelle, vous enverriez la photo au serveur
      // Ici, nous simulons simplement l'enregistrement local
      return new Promise((resolve) => {
        setTimeout(() => {
          const savedPhoto = {
            id: Date.now().toString(),
            ...photoData,
            relatedType,
            relatedId,
            createdAt: new Date().toISOString(),
            syncStatus: 'pending',
          };
          
          resolve(savedPhoto);
        }, 800);
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la photo:', error);
      throw error;
    }
  },

  /**
   * Récupère les photos liées à une entité
   * 
   * @param {string} relatedType - Type d'entité liée ('station' ou 'intervention')
   * @param {string} relatedId - ID de l'entité liée
   * @returns {Promise<Array>} - Liste des photos
   */
  getPhotosByRelatedEntity: async (relatedType, relatedId) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockPhotos = [
            {
              id: '1',
              uri: 'https://example.com/photo1.jpg',
              name: 'photo_1622547896.jpg',
              relatedType,
              relatedId,
              timestamp: '2025-05-28T10:30:00Z',
              syncStatus: 'synced',
            },
            {
              id: '2',
              uri: 'https://example.com/photo2.jpg',
              name: 'photo_1622547897.jpg',
              relatedType,
              relatedId,
              timestamp: '2025-05-28T10:31:00Z',
              syncStatus: 'synced',
            },
          ];
          
          resolve(mockPhotos);
        }, 600);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des photos:', error);
      throw error;
    }
  },

  /**
   * Supprime une photo
   * 
   * @param {string} photoId - ID de la photo
   * @param {string} photoUri - URI local de la photo
   * @returns {Promise<boolean>} - True si suppression réussie
   */
  deletePhoto: async (photoId, photoUri) => {
    try {
      // Supprimer le fichier local si l'URI est fourni
      if (photoUri && photoUri.startsWith(FileSystem.documentDirectory)) {
        const fileInfo = await FileSystem.getInfoAsync(photoUri);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(photoUri);
        }
      }

      // Dans une implémentation réelle, vous enverriez une requête au serveur
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de la photo:', error);
      throw error;
    }
  },
};

export default photoService;
