/**
 * Utilitaires pour la manipulation des fichiers
 * Fonctions pour gérer les opérations sur les fichiers dans l'application
 */

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';
import { Platform } from 'react-native';

/**
 * Répertoires de l'application
 */
export const AppDirectories = {
  PHOTOS: `${FileSystem.documentDirectory}photos/`,
  TEMP: `${FileSystem.cacheDirectory}temp/`,
  EXPORTS: `${FileSystem.documentDirectory}exports/`,
  LOGS: `${FileSystem.documentDirectory}logs/`,
};

/**
 * Initialise les répertoires de l'application
 * 
 * @returns {Promise<Object>} - Statut de l'initialisation
 */
export const initializeDirectories = async () => {
  try {
    const results = {};
    
    for (const [key, dir] of Object.entries(AppDirectories)) {
      const dirInfo = await FileSystem.getInfoAsync(dir);
      
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        results[key] = 'created';
      } else {
        results[key] = 'exists';
      }
    }
    
    return {
      success: true,
      results,
    };
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des répertoires:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Sauvegarde une image dans le répertoire photos
 * 
 * @param {string} uri - URI de l'image à sauvegarder
 * @param {Object} options - Options de sauvegarde
 * @returns {Promise<Object>} - Informations sur l'image sauvegardée
 */
export const saveImage = async (uri, options = {}) => {
  try {
    const {
      quality = 0.8,
      resize = false,
      width = 1200,
      height = 1200,
      prefix = 'IMG',
    } = options;
    
    // Vérifier que l'URI est valide
    if (!uri || typeof uri !== 'string') {
      throw new Error('URI d\'image invalide');
    }
    
    // Initialiser le répertoire photos si nécessaire
    await initializeDirectories();
    
    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const fileName = `${prefix}_${timestamp}.jpg`;
    const destUri = `${AppDirectories.PHOTOS}${fileName}`;
    
    // Redimensionner l'image si demandé
    let finalUri = uri;
    if (resize) {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width, height } }],
        { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
      );
      finalUri = manipResult.uri;
    }
    
    // Copier l'image dans le répertoire photos
    await FileSystem.copyAsync({
      from: finalUri,
      to: destUri,
    });
    
    // Obtenir les informations sur le fichier
    const fileInfo = await FileSystem.getInfoAsync(destUri);
    
    return {
      success: true,
      uri: destUri,
      fileName,
      size: fileInfo.size,
      modificationTime: fileInfo.modificationTime,
      timestamp,
    };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'image:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Supprime un fichier
 * 
 * @param {string} uri - URI du fichier à supprimer
 * @returns {Promise<Object>} - Résultat de la suppression
 */
export const deleteFile = async (uri) => {
  try {
    // Vérifier que l'URI est valide
    if (!uri || typeof uri !== 'string') {
      throw new Error('URI de fichier invalide');
    }
    
    // Vérifier que le fichier existe
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      return {
        success: false,
        error: 'Le fichier n\'existe pas',
      };
    }
    
    // Supprimer le fichier
    await FileSystem.deleteAsync(uri);
    
    return {
      success: true,
      uri,
    };
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Partage un fichier
 * 
 * @param {string} uri - URI du fichier à partager
 * @param {Object} options - Options de partage
 * @returns {Promise<Object>} - Résultat du partage
 */
export const shareFile = async (uri, options = {}) => {
  try {
    // Vérifier que l'URI est valide
    if (!uri || typeof uri !== 'string') {
      throw new Error('URI de fichier invalide');
    }
    
    // Vérifier que le partage est disponible
    const canShare = await Sharing.isAvailableAsync();
    if (!canShare) {
      throw new Error('Le partage n\'est pas disponible sur cet appareil');
    }
    
    // Partager le fichier
    await Sharing.shareAsync(uri, options);
    
    return {
      success: true,
      uri,
    };
  } catch (error) {
    console.error('Erreur lors du partage du fichier:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Sauvegarde un fichier dans la galerie
 * 
 * @param {string} uri - URI du fichier à sauvegarder
 * @param {Object} options - Options de sauvegarde
 * @returns {Promise<Object>} - Résultat de la sauvegarde
 */
export const saveToGallery = async (uri, options = {}) => {
  try {
    // Vérifier que l'URI est valide
    if (!uri || typeof uri !== 'string') {
      throw new Error('URI de fichier invalide');
    }
    
    // Vérifier les permissions
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission d\'accès à la galerie refusée');
    }
    
    // Sauvegarder le fichier dans la galerie
    const asset = await MediaLibrary.createAssetAsync(uri);
    
    // Créer un album si demandé
    if (options.album) {
      const album = await MediaLibrary.getAlbumAsync(options.album);
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync(options.album, asset, false);
      }
    }
    
    return {
      success: true,
      uri,
      assetId: asset.id,
    };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde dans la galerie:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Crée un fichier temporaire
 * 
 * @param {string} content - Contenu du fichier
 * @param {Object} options - Options de création
 * @returns {Promise<Object>} - Informations sur le fichier créé
 */
export const createTempFile = async (content, options = {}) => {
  try {
    const {
      extension = 'txt',
      prefix = 'temp',
      encoding = FileSystem.EncodingType.UTF8,
    } = options;
    
    // Initialiser le répertoire temporaire si nécessaire
    await initializeDirectories();
    
    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const fileName = `${prefix}_${timestamp}.${extension}`;
    const fileUri = `${AppDirectories.TEMP}${fileName}`;
    
    // Écrire le contenu dans le fichier
    await FileSystem.writeAsStringAsync(fileUri, content, { encoding });
    
    // Obtenir les informations sur le fichier
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    
    return {
      success: true,
      uri: fileUri,
      fileName,
      size: fileInfo.size,
      modificationTime: fileInfo.modificationTime,
      timestamp,
    };
  } catch (error) {
    console.error('Erreur lors de la création du fichier temporaire:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Lit le contenu d'un fichier
 * 
 * @param {string} uri - URI du fichier à lire
 * @param {Object} options - Options de lecture
 * @returns {Promise<Object>} - Contenu du fichier
 */
export const readFile = async (uri, options = {}) => {
  try {
    const {
      encoding = FileSystem.EncodingType.UTF8,
    } = options;
    
    // Vérifier que l'URI est valide
    if (!uri || typeof uri !== 'string') {
      throw new Error('URI de fichier invalide');
    }
    
    // Vérifier que le fichier existe
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw new Error('Le fichier n\'existe pas');
    }
    
    // Lire le contenu du fichier
    const content = await FileSystem.readAsStringAsync(uri, { encoding });
    
    return {
      success: true,
      uri,
      content,
      size: fileInfo.size,
      modificationTime: fileInfo.modificationTime,
    };
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Nettoie les fichiers temporaires
 * 
 * @param {Object} options - Options de nettoyage
 * @returns {Promise<Object>} - Résultat du nettoyage
 */
export const cleanTempFiles = async (options = {}) => {
  try {
    const {
      olderThan = 24 * 60 * 60 * 1000, // 24 heures en millisecondes
    } = options;
    
    // Lire le contenu du répertoire temporaire
    const tempDir = AppDirectories.TEMP;
    const dirContent = await FileSystem.readDirectoryAsync(tempDir);
    
    // Filtrer les fichiers à supprimer
    const now = Date.now();
    const deletedFiles = [];
    const errors = [];
    
    for (const fileName of dirContent) {
      try {
        const fileUri = `${tempDir}${fileName}`;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        
        // Supprimer les fichiers plus anciens que olderThan
        if (fileInfo.modificationTime && (now - fileInfo.modificationTime) > olderThan) {
          await FileSystem.deleteAsync(fileUri);
          deletedFiles.push(fileName);
        }
      } catch (error) {
        errors.push({ fileName, error: error.message });
      }
    }
    
    return {
      success: true,
      deletedCount: deletedFiles.length,
      deletedFiles,
      errors,
    };
  } catch (error) {
    console.error('Erreur lors du nettoyage des fichiers temporaires:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Exporte des données au format JSON
 * 
 * @param {Object|Array} data - Données à exporter
 * @param {Object} options - Options d'exportation
 * @returns {Promise<Object>} - Informations sur le fichier exporté
 */
export const exportToJson = async (data, options = {}) => {
  try {
    const {
      fileName = `export_${Date.now()}.json`,
      pretty = true,
    } = options;
    
    // Initialiser le répertoire d'exports si nécessaire
    await initializeDirectories();
    
    // Convertir les données en JSON
    const jsonContent = pretty 
      ? JSON.stringify(data, null, 2) 
      : JSON.stringify(data);
    
    // Créer le fichier
    const fileUri = `${AppDirectories.EXPORTS}${fileName}`;
    await FileSystem.writeAsStringAsync(fileUri, jsonContent);
    
    // Obtenir les informations sur le fichier
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    
    return {
      success: true,
      uri: fileUri,
      fileName,
      size: fileInfo.size,
      modificationTime: fileInfo.modificationTime,
    };
  } catch (error) {
    console.error('Erreur lors de l\'exportation en JSON:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Calcule la taille totale d'un répertoire
 * 
 * @param {string} dirUri - URI du répertoire
 * @returns {Promise<Object>} - Taille du répertoire
 */
export const getDirectorySize = async (dirUri) => {
  try {
    // Vérifier que l'URI est valide
    if (!dirUri || typeof dirUri !== 'string') {
      throw new Error('URI de répertoire invalide');
    }
    
    // Vérifier que le répertoire existe
    const dirInfo = await FileSystem.getInfoAsync(dirUri);
    if (!dirInfo.exists || !dirInfo.isDirectory) {
      throw new Error('Le répertoire n\'existe pas');
    }
    
    // Lire le contenu du répertoire
    const dirContent = await FileSystem.readDirectoryAsync(dirUri);
    
    // Calculer la taille totale
    let totalSize = 0;
    const files = [];
    
    for (const fileName of dirContent) {
      const fileUri = `${dirUri}${fileName}`;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      
      if (fileInfo.exists) {
        if (fileInfo.isDirectory) {
          // Récursion pour les sous-répertoires
          const subDirSize = await getDirectorySize(fileUri);
          totalSize += subDirSize.totalSize;
        } else {
          totalSize += fileInfo.size || 0;
          files.push({
            name: fileName,
            size: fileInfo.size || 0,
            modificationTime: fileInfo.modificationTime,
          });
        }
      }
    }
    
    return {
      success: true,
      totalSize,
      fileCount: files.length,
      files,
    };
  } catch (error) {
    console.error('Erreur lors du calcul de la taille du répertoire:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
