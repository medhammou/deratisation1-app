import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import ConsumptionIndicator from '../components/ConsumptionIndicator';
import PhotoPicker from '../components/PhotoPicker';

/**
 * Écran d'enregistrement d'une intervention sur une station
 * 
 * @returns {JSX.Element}
 */
const InterventionScreen = () => {
  // États pour les champs du formulaire
  const [consumptionLevel, setConsumptionLevel] = useState('none');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [station, setStation] = useState(null);
  const [loadingStation, setLoadingStation] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();
  const { stationId, stationIdentifier } = route.params || {};

  // Charger les détails de la station au chargement de l'écran
  useEffect(() => {
    if (stationId) {
      loadStationDetails();
    } else {
      setLoadingStation(false);
      Alert.alert('Erreur', 'Identifiant de station manquant');
      navigation.goBack();
    }
  }, [stationId]);

  // Fonction pour charger les détails de la station
  const loadStationDetails = async () => {
    try {
      setLoadingStation(true);
      
      // Simuler un appel API pour récupérer les détails de la station
      // Dans une implémentation réelle, vous appelleriez votre service API
      setTimeout(() => {
        const mockStation = {
          id: stationId,
          identifier: stationIdentifier || 'ST-1234',
          status: 'active',
          lastConsumptionLevel: 'medium',
        };
        
        setStation(mockStation);
        setLoadingStation(false);
      }, 1000);
      
    } catch (error) {
      setLoadingStation(false);
      console.error('Erreur lors du chargement des détails de la station:', error);
      Alert.alert('Erreur', 'Impossible de charger les détails de la station');
      navigation.goBack();
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    if (!consumptionLevel) {
      Alert.alert('Erreur', 'Veuillez sélectionner un niveau de consommation');
      return false;
    }
    return true;
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Préparer les données de l'intervention
      const interventionData = {
        stationId,
        consumptionLevel,
        notes,
        photo,
        date: new Date().toISOString(),
        technician: 'Jean Dupont', // Dans une implémentation réelle, ce serait l'utilisateur connecté
      };

      // Simuler l'envoi des données à l'API
      // Dans une implémentation réelle, vous appelleriez votre service API
      setTimeout(() => {
        setIsLoading(false);
        
        // Afficher un message de succès
        Alert.alert(
          'Intervention enregistrée',
          'L\'intervention a été enregistrée avec succès',
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
      console.error('Erreur lors de l\'enregistrement de l\'intervention:', error);
      Alert.alert('Erreur', 'Impossible d\'enregistrer l\'intervention. Veuillez réessayer.');
    }
  };

  // Rendu en cas de chargement
  if (loadingStation) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement des détails de la station...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Nouvelle intervention</Text>
        
        {/* Informations de la station */}
        <View style={styles.stationInfoContainer}>
          <Text style={styles.stationId}>Station {station?.identifier}</Text>
          <Text style={styles.dateText}>Date: {new Date().toLocaleDateString()}</Text>
        </View>

        {/* Niveau de consommation */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Niveau de consommation *</Text>
          <View style={styles.consumptionLevelsContainer}>
            {['none', 'low', 'medium', 'high'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.consumptionLevelButton,
                  consumptionLevel === level && styles.consumptionLevelButtonSelected
                ]}
                onPress={() => setConsumptionLevel(level)}
              >
                <ConsumptionIndicator level={level} size={20} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.consumptionLabelsContainer}>
            <Text style={styles.consumptionLabel}>Aucune</Text>
            <Text style={styles.consumptionLabel}>Faible</Text>
            <Text style={styles.consumptionLabel}>Moyenne</Text>
            <Text style={styles.consumptionLabel}>Élevée</Text>
          </View>
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
          <Text style={styles.label}>Notes (optionnelles)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ajoutez des observations ou remarques..."
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
              <Text style={styles.submitButtonText}>Enregistrement...</Text>
            ) : (
              <>
                <MaterialIcons name="save" size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>Enregistrer</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#757575',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 24,
  },
  stationInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stationId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#757575',
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
  consumptionLevelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  consumptionLevelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  consumptionLevelButtonSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  consumptionLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  consumptionLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#757575',
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

export default InterventionScreen;
