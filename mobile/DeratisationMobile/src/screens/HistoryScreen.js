import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import ConsumptionIndicator from '../components/ConsumptionIndicator';

/**
 * Écran d'historique des interventions
 * 
 * @returns {JSX.Element}
 */
const HistoryScreen = () => {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');
  
  const navigation = useNavigation();
  const route = useRoute();
  const { stationId, siteId } = route.params || {};

  // Charger les interventions au chargement de l'écran
  useEffect(() => {
    loadInterventions();
  }, [stationId, siteId]);

  // Fonction pour charger les interventions
  const loadInterventions = async () => {
    try {
      setLoading(true);
      
      // Simuler un appel API pour récupérer les interventions
      // Dans une implémentation réelle, vous appelleriez votre service API
      setTimeout(() => {
        const mockInterventions = [
          {
            id: '1',
            date: '2025-06-05',
            stationId: '1',
            stationIdentifier: 'ST-1001',
            siteName: 'Restaurant Le Gourmet',
            type: 'maintenance',
            consumptionLevel: 'medium',
            notes: 'Remplacement de l\'appât. Traces d\'activité observées.',
            technician: 'Jean Dupont',
            hasPhoto: true,
          },
          {
            id: '2',
            date: '2025-06-01',
            stationId: '2',
            stationIdentifier: 'ST-1002',
            siteName: 'Hôtel Bellevue',
            type: 'inspection',
            consumptionLevel: 'high',
            notes: 'Forte activité détectée. Appât presque entièrement consommé.',
            technician: 'Marie Martin',
            hasPhoto: true,
          },
          {
            id: '3',
            date: '2025-05-28',
            stationId: '1',
            stationIdentifier: 'ST-1001',
            siteName: 'Restaurant Le Gourmet',
            type: 'incident',
            consumptionLevel: 'low',
            notes: 'Station légèrement endommagée. Réparation effectuée.',
            technician: 'Jean Dupont',
            hasPhoto: false,
          },
          {
            id: '4',
            date: '2025-05-20',
            stationId: '3',
            stationIdentifier: 'ST-1003',
            siteName: 'Supermarché Express',
            type: 'maintenance',
            consumptionLevel: 'none',
            notes: 'Aucune activité détectée. Appât remplacé par précaution.',
            technician: 'Pierre Durand',
            hasPhoto: false,
          },
          {
            id: '5',
            date: '2025-05-15',
            stationId: '4',
            stationIdentifier: 'ST-1004',
            siteName: 'École Primaire Jules Ferry',
            type: 'installation',
            consumptionLevel: 'none',
            notes: 'Installation initiale de la station.',
            technician: 'Marie Martin',
            hasPhoto: true,
          },
        ];
        
        // Filtrer les interventions si nécessaire
        let filteredInterventions = mockInterventions;
        
        if (stationId) {
          filteredInterventions = mockInterventions.filter(
            intervention => intervention.stationId === stationId
          );
        } else if (siteId) {
          // Dans une implémentation réelle, vous filtreriez par siteId
          // Pour l'instant, nous simulons simplement
          filteredInterventions = mockInterventions.filter(
            (_, index) => index % 2 === 0
          );
        }
        
        setInterventions(filteredInterventions);
        setError(null);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Erreur lors du chargement des interventions:', err);
      setError('Impossible de charger l\'historique des interventions');
      setLoading(false);
    }
  };

  // Fonction pour filtrer les interventions par type
  const filterInterventions = () => {
    if (filterType === 'all') {
      return interventions;
    }
    return interventions.filter(intervention => intervention.type === filterType);
  };

  // Fonction pour naviguer vers les détails d'une station
  const handleStationPress = (intervention) => {
    navigation.navigate('StationDetails', { 
      stationId: intervention.stationId,
      stationIdentifier: intervention.stationIdentifier
    });
  };

  // Rendu d'un élément de la liste
  const renderInterventionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.interventionCard}
      onPress={() => handleStationPress(item)}
    >
      <View style={styles.interventionHeader}>
        <Text style={styles.interventionDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <View style={styles.typeContainer}>
          <Text style={[
            styles.interventionType,
            item.type === 'incident' && styles.incidentType,
            item.type === 'installation' && styles.installationType,
          ]}>
            {item.type === 'maintenance' ? 'Maintenance' :
             item.type === 'inspection' ? 'Inspection' :
             item.type === 'incident' ? 'Incident' :
             item.type === 'installation' ? 'Installation' : 'Autre'}
          </Text>
        </View>
      </View>
      
      <View style={styles.stationInfo}>
        <Text style={styles.stationIdentifier}>{item.stationIdentifier}</Text>
        <Text style={styles.siteName}>{item.siteName}</Text>
      </View>
      
      <View style={styles.consumptionContainer}>
        <Text style={styles.consumptionLabel}>Consommation:</Text>
        <ConsumptionIndicator level={item.consumptionLevel} size={20} />
      </View>
      
      {item.notes && (
        <Text style={styles.notes} numberOfLines={2}>{item.notes}</Text>
      )}
      
      <View style={styles.interventionFooter}>
        <Text style={styles.technician}>Par: {item.technician}</Text>
        {item.hasPhoto && (
          <MaterialIcons name="photo" size={16} color="#2196F3" />
        )}
      </View>
    </TouchableOpacity>
  );

  // Rendu lorsque la liste est vide
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="history" size={64} color="#9E9E9E" />
      <Text style={styles.emptyText}>Aucune intervention</Text>
      <Text style={styles.emptySubtext}>Les interventions effectuées apparaîtront ici</Text>
    </View>
  );

  // Rendu en cas de chargement
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Chargement de l'historique...</Text>
      </View>
    );
  }

  // Rendu en cas d'erreur
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={64} color="#F44336" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadInterventions}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historique des interventions</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <ScrollableFilterButtons 
          options={[
            { value: 'all', label: 'Toutes' },
            { value: 'maintenance', label: 'Maintenance' },
            { value: 'inspection', label: 'Inspection' },
            { value: 'incident', label: 'Incident' },
            { value: 'installation', label: 'Installation' },
          ]}
          selectedValue={filterType}
          onSelect={setFilterType}
        />
      </View>
      
      <FlatList
        data={filterInterventions()}
        keyExtractor={(item) => item.id}
        renderItem={renderInterventionItem}
        contentContainerStyle={interventions.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={renderEmptyList}
        refreshing={loading}
        onRefresh={loadInterventions}
      />
    </SafeAreaView>
  );
};

// Composant pour les boutons de filtre défilables horizontalement
const ScrollableFilterButtons = ({ options, selectedValue, onSelect }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterButtonsContainer}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.filterButton,
            selectedValue === option.value && styles.filterButtonSelected
          ]}
          onPress={() => onSelect(option.value)}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedValue === option.value && styles.filterButtonTextSelected
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButtonsContainer: {
    paddingHorizontal: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 4,
  },
  filterButtonSelected: {
    backgroundColor: '#2196F3',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#757575',
  },
  filterButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#757575',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#616161',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 8,
    textAlign: 'center',
  },
  interventionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  interventionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  interventionDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  typeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#E3F2FD',
  },
  interventionType: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2196F3',
  },
  incidentType: {
    color: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  installationType: {
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  stationInfo: {
    marginBottom: 12,
  },
  stationIdentifier: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  siteName: {
    fontSize: 14,
    color: '#757575',
  },
  consumptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  consumptionLabel: {
    fontSize: 14,
    color: '#757575',
    marginRight: 8,
  },
  notes: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 12,
  },
  interventionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  technician: {
    fontSize: 12,
    color: '#9E9E9E',
    fontStyle: 'italic',
  },
});

export default HistoryScreen;
