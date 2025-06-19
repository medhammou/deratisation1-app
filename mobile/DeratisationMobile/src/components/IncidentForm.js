import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PhotoPicker from './PhotoPicker';

/**
 * Composant formulaire pour signaler un incident sur une station
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onSubmit - Fonction appelée lors de la soumission du formulaire
 * @param {Function} props.onCancel - Fonction appelée lors de l'annulation
 * @param {Object} props.initialValues - Valeurs initiales du formulaire (optionnel)
 * @returns {JSX.Element}
 */
const IncidentForm = ({ onSubmit, onCancel, initialValues = {} }) => {
  // États pour les champs du formulaire
  const [incidentType, setIncidentType] = useState(initialValues.incidentType || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [severity, setSeverity] = useState(initialValues.severity || 'medium');
  const [photo, setPhoto] = useState(initialValues.photo || null);
  const [actionTaken, setActionTaken] = useState(initialValues.actionTaken || '');

  // Types d'incidents prédéfinis
  const incidentTypes = [
    { id: 'damaged', label: 'Station endommagée' },
    { id: 'moved', label: 'Station déplacée' },
    { id: 'non_target', label: 'Animaux non-cibles' },
    { id: 'tampered', label: 'Manipulation non autorisée' },
    { id: 'other', label: 'Autre incident' }
  ];

  // Niveaux de sévérité
  const severityLevels = [
    { id: 'low', label: 'Faible', color: '#4CAF50' },
    { id: 'medium', label: 'Moyenne', color: '#FF9800' },
    { id: 'high', label: 'Élevée', color: '#F44336' }
  ];

  // Validation du formulaire
  const validateForm = () => {
    if (!incidentType) {
      Alert.alert('Erreur', 'Veuillez sélectionner un type d\'incident');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Erreur', 'Veuillez fournir une description de l\'incident');
      return false;
    }
    return true;
  };

  // Soumission du formulaire
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        incidentType,
        description,
        severity,
        photo,
        actionTaken,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Signaler un incident</Text>
      
      {/* Type d'incident */}
      <Text style={styles.label}>Type d'incident *</Text>
      <View style={styles.incidentTypesContainer}>
        {incidentTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.incidentTypeButton,
              incidentType === type.id && styles.incidentTypeButtonSelected
            ]}
            onPress={() => setIncidentType(type.id)}
          >
            <Text
              style={[
                styles.incidentTypeText,
                incidentType === type.id && styles.incidentTypeTextSelected
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Description */}
      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={4}
        placeholder="Décrivez l'incident en détail..."
        value={description}
        onChangeText={setDescription}
      />

      {/* Sévérité */}
      <Text style={styles.label}>Niveau de sévérité</Text>
      <View style={styles.severityContainer}>
        {severityLevels.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={[
              styles.severityButton,
              severity === level.id && { backgroundColor: level.color }
            ]}
            onPress={() => setSeverity(level.id)}
          >
            <Text
              style={[
                styles.severityText,
                severity === level.id && styles.severityTextSelected
              ]}
            >
              {level.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Photo */}
      <PhotoPicker
        title="Photo de l'incident"
        imageUri={photo?.uri}
        onImageSelected={setPhoto}
      />

      {/* Action prise */}
      <Text style={styles.label}>Action prise (optionnel)</Text>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={3}
        placeholder="Décrivez les actions prises pour résoudre l'incident..."
        value={actionTaken}
        onChangeText={setActionTaken}
      />

      {/* Boutons d'action */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <MaterialIcons name="send" size={18} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>Soumettre</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginTop: 16,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#F5F5F5',
    textAlignVertical: 'top',
  },
  incidentTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  incidentTypeButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 8,
    margin: 4,
    backgroundColor: '#F5F5F5',
  },
  incidentTypeButtonSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  incidentTypeText: {
    fontSize: 14,
    color: '#757575',
  },
  incidentTypeTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  severityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  severityButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    margin: 4,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  severityText: {
    fontSize: 14,
    color: '#757575',
  },
  severityTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#757575',
  },
  submitButton: {
    flex: 2,
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default IncidentForm;
