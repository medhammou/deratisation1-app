import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

/**
 * Composant pour prendre ou sélectionner des photos
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onImageSelected - Fonction appelée lorsqu'une image est sélectionnée
 * @param {string} props.imageUri - URI de l'image déjà sélectionnée (optionnel)
 * @param {string} props.title - Titre du composant (optionnel)
 * @returns {JSX.Element}
 */
const PhotoPicker = ({ onImageSelected, imageUri, title = "Photo" }) => {
  const [image, setImage] = useState(imageUri);

  // Demande les permissions pour accéder à la caméra
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        "Permission refusée",
        "Vous devez autoriser l'accès à la caméra pour prendre des photos.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  // Demande les permissions pour accéder à la galerie
  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        "Permission refusée",
        "Vous devez autoriser l'accès à la galerie pour sélectionner des photos.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  // Prendre une photo avec la caméra
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setImage(selectedImage.uri);
        
        // Obtenir les informations sur le fichier
        const fileInfo = await FileSystem.getInfoAsync(selectedImage.uri);
        
        // Appeler la fonction de callback avec l'URI et les métadonnées
        onImageSelected({
          uri: selectedImage.uri,
          name: selectedImage.uri.split('/').pop(),
          type: `image/${selectedImage.uri.split('.').pop()}`,
          size: fileInfo.size,
          width: selectedImage.width,
          height: selectedImage.height,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Erreur lors de la prise de photo:", error);
      Alert.alert("Erreur", "Impossible de prendre une photo. Veuillez réessayer.");
    }
  };

  // Sélectionner une photo depuis la galerie
  const pickImage = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setImage(selectedImage.uri);
        
        // Obtenir les informations sur le fichier
        const fileInfo = await FileSystem.getInfoAsync(selectedImage.uri);
        
        // Appeler la fonction de callback avec l'URI et les métadonnées
        onImageSelected({
          uri: selectedImage.uri,
          name: selectedImage.uri.split('/').pop(),
          type: `image/${selectedImage.uri.split('.').pop()}`,
          size: fileInfo.size,
          width: selectedImage.width,
          height: selectedImage.height,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Erreur lors de la sélection d'image:", error);
      Alert.alert("Erreur", "Impossible de sélectionner une image. Veuillez réessayer.");
    }
  };

  // Supprimer l'image sélectionnée
  const removeImage = () => {
    setImage(null);
    onImageSelected(null);
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.imageActions}>
            <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
              <MaterialIcons name="photo-camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <MaterialIcons name="photo-library" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.removeButton]} onPress={removeImage}>
              <MaterialIcons name="delete" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <MaterialIcons name="photo-camera" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Prendre une photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <MaterialIcons name="photo-library" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Choisir dans la galerie</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 8,
  },
  placeholderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 8,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(33, 150, 243, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
  },
});

export default PhotoPicker;
