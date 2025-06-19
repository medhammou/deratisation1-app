import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import PhotoPicker from '../components/PhotoPicker';
import StatusBadge from '../components/StatusBadge';

/**
 * Écran d'ajout d'une nouvelle station d'appâtage
 * 
 * @returns {JSX.Element}
 */
const AddStationScreen = () => {
  // États pour les champs du formulaire
  const [identifier, setIdentifier] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [manualLatitude, setManualLatitude] = useState('');
  const [manualLongitude, setManualLongitude] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const { siteId } = route.params || {};

  // Récupérer la position actuelle au chargement de l'écran
  useEffect(() => {
    if (useCurrentLocation) {
      getCurrentLocation();
    }
  }, [useCurrentLocation]);

  // Fonction pour récupérer la position actuelle
  const getCurrentLocation = async () => {
    try {
      setLocationError(null);
      
      // Simuler la récupération de la position GPS
      // Dans une implémentation réelle, vous utiliseriez Geolocation ou expo-location
      setTimeout(() => {
        const mockLocation = {
          latitude: 48.8566,
          longitude: 2.3522,
          accuracy: 10,
        };
        
        setCurrentLocation(mockLocation);
      }, 1000);
      
    } catch (error) {
      console.error('Erreur lors de la récupération de la position:', error);
      setLocationError('Impossible de récupérer votre position actuelle');
      setUseCurrentLocation(false);
    }
  };

  // Fonction pour générer un identifiant automatique
  const generateIdentifier = () => {
    const prefix = 'ST';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setIdentifier(`${prefix}-${randomNum}`);
  };

  // Validation du formulaire
  const validateForm = () => {
    if (!identifier.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un identifiant pour la station');
      return false;
    }

    if (!description.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir une description pour la station');
      return false;
    }

    if (!useCurrentLocation) {
      if (!manualLatitude.trim() || !manualLongitude.trim()) {
        Alert.alert('Erreur', 'Veuillez saisir les coordonnées manuelles');
        return false;
      }

      const lat = parseFloat(manualLatitude);
      const lng = parseFloat(manualLongitude);

      if (isNaN(lat) || lat < -90 || lat > 90) {
        Alert.alert('Erreur', 'La latitude doit être un nombre entre -90 et 90');
        return false;
      }

      if (isNaN(lng) || lng < -180 || lng > 180) {
        Alert.alert('Erreur', 'La longitude doit être un nombre entre -180 et 180');
        return false;
      }
    } else if (!currentLocation) {
      Alert.alert('Erreur', 'Position GPS non disponible. Veuillez saisir les coordonnées manuellement');
      return false;
    }

    return true;
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Préparer les données de la station
      const stationData = {
        identifier,
        description,
        status,
        notes,
        photo,
        siteId,
        coordinates: useCurrentLocation
          ? {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }
          : {
              latitude: parseFloat(manualLatitude),
              longitude: parseFloat(manualLongitude),
            },
        installationDate: new Date().toISOString(),
      };

      // Simuler l'envoi des données à l'API
      // Dans une implémentation réelle, vous appelleriez votre service API
      setTimeout(() => {
        setIsLoading(false);
        
        // Afficher un message de succès
        Alert.alert(
          'Station ajoutée',
          'La station a été ajoutée avec succès',
          [
            { 
              text: 'OK', 
              onPress: () => navigation.goBack() 
            }
          ]
        );
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      console.error('Erreur lors de l\'ajout de la station:', error);
      Alert.alert('Erreur', 'Impossible d\'ajouter la station. Veuillez réessayer.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Ajouter une nouvelle station</Text>

        {/* Identifiant */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Identifiant *</Text>
          <View style={styles.identifierContainer}>
            <TextInput
              style={[styles.input, styles.identifierInput]}
              placeholder="Ex: ST-1234"
              value={identifier}
              onChangeText={setIdentifier}
            />
            <TouchableOpacity 
              style={styles.generateButton}
              onPress={generateIdentifier}
            >
              <MaterialIcons name="refresh" size={20} color="#FFFFFF" />
              <Text style={styles.generateButtonText}>Générer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Décrivez l'emplacement de la station..."
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Statut */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Statut</Text>
          <View style={styles.statusContainer}>
            {['active', 'inactive'].map((statusOption) => (
              <TouchableOpacity
                key={statusOption}
                style={[
                  styles.statusOption,
                  status === statusOption && styles.statusOptionSelected
                ]}
                onPress={() => setStatus(statusOption)}
              >
                <StatusBadge status={statusOption} size="small" />
                <Text style={[
                  styles.statusText,
                  status === statusOption && styles.statusTextSelected
                ]}>
                  {statusOption === 'active' ? 'Active' : 'Inactive'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Localisation */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Localisation *</Text>
          
          <View style={styles.locationToggleContainer}>
            <Text style={styles.locationToggleLabel}>
              Utiliser ma position actuelle
            </Text>
            <Switch
              value={useCurrentLocation}
              onValueChange={setUseCurrentLocation}
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={useCurrentLocation ? '#2196F3' : '#BDBDBD'}
            />
          </View>
          
          {useCurrentLocation ? (
            <View style={styles.currentLocationContainer}>
              {currentLocation ? (
                <>
                  <View style={styles.coordinateRow}>
                    <Text style={styles.coordinateLabel}>Latitude:</Text>
                    <Text style={styles.coordinateValue}>
                      {currentLocation.latitude.toFixed(6)}
                    </Text>
                  </View>
                  <View style={styles.coordinateRow}>
                    <Text style={styles.coordinateLabel}>Longitude:</Text>
                    <Text style={styles.coordinateValue}>
                      {currentLocation.longitude.toFixed(6)}
                    </Text>
                  </View>
                  <View style={styles.coordinateRow}>
                    <Text style={styles.coordinateLabel}>Précision:</Text>
                    <Text style={styles.coordinateValue}>
                      {currentLocation.accuracy} mètres
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.refreshLocationButton}
                    onPress={getCurrentLocation}
                  >
                    <MaterialIcons name="my-location" size={16} color="#2196F3" />
                    <Text style={styles.refreshLocationText}>Actualiser la position</Text>
                  </TouchableOpacity>
                </>
              ) : locationError ? (
                <View style={styles.locationErrorContainer}>
                  <MaterialIcons name="error-outline" size={24} color="#F44336" />
                  <Text style={styles.locationErrorText}>{locationError}</Text>
                </View>
              ) : (
                <View style={styles.loadingLocationContainer}>
                  <Text style={styles.loadingLocationText}>
                    Récupération de la position en cours...
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.manualLocationContainer}>
              <View style={styles.coordinateInputContainer}>
                <Text style={styles.coordinateInputLabel}>Latitude:</Text>
                <TextInput
                  style={styles.coordinateInput}
                  placeholder="Ex: 48.8566"
                  keyboardType="numeric"
                  value={manualLatitude}
                  onChangeText={setManualLatitude}
                />
              </View>
              <View style={styles.coordinateInputContainer}>
                <Text style={styles.coordinateInputLabel}>Longitude:</Text>
                <TextInput
                  style={styles.coordinateInput}
                  placeholder="Ex: 2.3522"
                  keyboardType="numeric"
                  value={manualLongitude}
                  onChangeText={setManualLongitude}
                />
              </View>
            </View>
          )}
        </View>

        {/* Photo */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Photo (optionnelle)</Text>
          <PhotoPicker
            onImageSelected={setPhoto}
            imageUri={photo?.uri}
            title=""
          />
        </View>

        {/* Notes */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Notes additionnelles (optionnelles)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ajoutez des notes ou instructions spécifiques..."
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Boutons d'action */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.submitButtonText}>Ajout en cours...</Text>
            ) : (
              <>
                <MaterialIcons name="check" size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>Ajouter la station</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#212121',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  identifierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  identifierInput: {
    flex: 1,
    marginRight: 8,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  statusOptionSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  statusText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 8,
  },
  statusTextSelected: {
    color: '#2196F3',
    fontWeight: '500',
  },
  locationToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationToggleLabel: {
    fontSize: 14,
    color: '#616161',
  },
  currentLocationContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
  },
  coordinateRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  coordinateLabel: {
    fontSize: 14,
    color: '#757575',
    width: 80,
  },
  coordinateValue: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
  },
  refreshLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    padding: 8,
  },
  refreshLocationText: {
    fontSize: 14,
    color: '#2196F3',
    marginLeft: 4,
  },
  locationErrorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  locationErrorText: {
    fontSize: 14,
    color: '#F44336',
    marginLeft: 8,
  },
  loadingLocationContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loadingLocationText: {
    fontSize: 14,
    color: '#757575',
    fontStyle: 'italic',
  },
  manualLocationContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
  },
  coordinateInputContainer: {
    marginBottom: 12,
  },
  coordinateInputLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  coordinateInput: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#212121',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#757575',
  },
  submitButton: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default AddStationScreen;
