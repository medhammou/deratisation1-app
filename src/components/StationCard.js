import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Composant de carte de station d'appâtage
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.station - Les données de la station
 * @param {Function} props.onPress - Fonction appelée lors du clic sur la carte
 * @param {Function} props.onEdit - Fonction appelée lors du clic sur le bouton d'édition
 * @returns {JSX.Element}
 */
const StationCard = ({ station, onPress, onEdit }) => {
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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(station.status) }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.identifier}>{station.identifier}</Text>
          <MaterialIcons 
            name={getConsumptionIcon(station.lastConsumptionLevel)} 
            size={24} 
            color={station.lastConsumptionLevel === 'high' ? '#F44336' : '#757575'} 
          />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {station.description || 'Aucune description'}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.date}>
            {station.lastInterventionDate 
              ? `Dernière intervention: ${new Date(station.lastInterventionDate).toLocaleDateString()}` 
              : 'Aucune intervention'}
          </Text>
          <TouchableOpacity style={styles.editButton} onPress={() => onEdit(station)}>
            <MaterialIcons name="edit" size={18} color="#2196F3" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  statusIndicator: {
    width: 8,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  identifier: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  description: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  editButton: {
    padding: 4,
  },
});

export default StationCard;
