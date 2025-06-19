import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Composant pour afficher un badge de statut
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.status - Le statut à afficher ('active', 'inactive', 'damaged', 'removed')
 * @param {string} props.size - La taille du badge ('small', 'medium', 'large')
 * @returns {JSX.Element}
 */
const StatusBadge = ({ status, size = 'medium' }) => {
  // Détermine la couleur en fonction du statut
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

  // Détermine le texte à afficher en fonction du statut
  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'damaged':
        return 'Endommagée';
      case 'removed':
        return 'Retirée';
      default:
        return 'Inconnu';
    }
  };

  // Détermine la taille du badge
  const getBadgeSize = (size) => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 2,
          paddingHorizontal: 6,
          fontSize: 10,
          borderRadius: 4,
        };
      case 'large':
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
          fontSize: 14,
          borderRadius: 8,
        };
      case 'medium':
      default:
        return {
          paddingVertical: 4,
          paddingHorizontal: 8,
          fontSize: 12,
          borderRadius: 6,
        };
    }
  };

  const sizeStyles = getBadgeSize(size);
  const backgroundColor = getStatusColor(status);
  const statusText = getStatusText(status);

  return (
    <View style={[
      styles.badge, 
      { 
        backgroundColor,
        paddingVertical: sizeStyles.paddingVertical,
        paddingHorizontal: sizeStyles.paddingHorizontal,
        borderRadius: sizeStyles.borderRadius,
      }
    ]}>
      <Text style={[styles.text, { fontSize: sizeStyles.fontSize }]}>
        {statusText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default StatusBadge;
