import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Composant pour afficher un indicateur de niveau de consommation
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.level - Le niveau de consommation ('none', 'low', 'medium', 'high')
 * @param {number} props.size - La taille de l'icône
 * @returns {JSX.Element}
 */
const ConsumptionIndicator = ({ level, size = 24 }) => {
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
        return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons 
        name={getConsumptionIcon(level)} 
        size={size} 
        color={getConsumptionColor(level)} 
      />
      <Text style={[styles.label, { color: getConsumptionColor(level) }]}>
        {level === 'high' ? 'Élevée' : 
         level === 'medium' ? 'Moyenne' : 
         level === 'low' ? 'Faible' : 
         level === 'none' ? 'Aucune' : 'Inconnue'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  label: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ConsumptionIndicator;
