import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Composant pour afficher un marqueur de station sur une carte
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.status - Le statut de la station ('active', 'inactive', 'damaged', 'removed')
 * @param {string} props.consumptionLevel - Le niveau de consommation ('none', 'low', 'medium', 'high')
 * @param {boolean} props.selected - Indique si le marqueur est sélectionné
 * @param {Function} props.onPress - Fonction appelée lors du clic sur le marqueur
 * @returns {JSX.Element}
 */
const MapMarker = ({ status, consumptionLevel, selected = false, onPress }) => {
  // Détermine la couleur en fonction du statut de la station
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#4CAF50'; // Vert
      case 'inactive':
        return '#9E9E9E'; // Gris
      case 'damaged':
        return '#FF9800'; // Orange
      case 'removed':
        return '#F44336'; // Rouge
      default:
        return '#9E9E9E';
    }
  };

  // Détermine la couleur en fonction du niveau de consommation
  const getConsumptionColor = (level) => {
    switch (level) {
      case 'high':
        return '#F44336'; // Rouge
      case 'medium':
        return '#FF9800'; // Orange
      case 'low':
        return '#4CAF50'; // Vert
      case 'none':
        return '#9E9E9E'; // Gris
      default:
        return '#9E9E9E';
    }
  };

  // Détermine l'icône en fonction du niveau de consommation
  const getConsumptionIcon = (level) => {
    switch (level) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'check-circle';
      case 'none':
        return 'remove-circle-outline';
      default:
        return 'help-outline';
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { borderColor: getStatusColor(status) },
        selected && styles.selected
      ]} 
      onPress={onPress}
    >
      <View style={[styles.marker, { backgroundColor: getStatusColor(status) }]}>
        <MaterialIcons 
          name={getConsumptionIcon(consumptionLevel)} 
          size={16} 
          color="#FFFFFF" 
        />
      </View>
      {selected && (
        <View style={[styles.pulse, { borderColor: getStatusColor(status) }]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: selected => selected ? 2 : 0,
    backgroundColor: 'transparent',
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selected: {
    zIndex: 1,
  },
  pulse: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: 'transparent',
    opacity: 0.6,
  },
});

export default MapMarker;
