import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import StationCard from '../components/StationCard';
import { getStationsBySite } from '../services/stationService';
import { useNavigation, useRoute } from '@react-navigation/native';

/**
 * Écran de liste des stations pour un site spécifique
 */
const StationsListScreen = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { siteId, siteName } = route.params || {};

  useEffect(() => {
    // Définir le titre de l'écran avec le nom du site
    navigation.setOptions({
      title: siteName || 'Stations',
    });

    // Charger les stations pour ce site
    loadStations();
  }, [siteId, navigation, siteName]);

  const loadStations = async () => {
    if (!siteId) {
      setError('Identifiant du site manquant');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const stationsData = await getStationsBySite(siteId);
      setStations(stationsData);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des stations');
      console.error('Erreur lors du chargement des stations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStationPress = (station) => {
    navigation.navigate('StationDetails', { stationId: station.id, stationIdentifier: station.identifier });
  };

  const handleEditStation = (station) => {
    navigation.navigate('EditStation', { stationId: station.id });
  };

  const handleAddStation = () => {
    navigation.navigate('AddStation', { siteId });
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="location-off" size={64} color="#9E9E9E" />
      <Text style={styles.emptyText}>Aucune station pour ce site</Text>
      <Text style={styles.emptySubtext}>Ajoutez une nouvelle station pour commencer</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Chargement des stations...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="error-outline" size={64} color="#F44336" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadStations}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StationCard
            station={item}
            onPress={() => handleStationPress(item)}
            onEdit={() => handleEditStation(item)}
          />
        )}
        contentContainerStyle={stations.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={renderEmptyList}
        refreshing={loading}
        onRefresh={loadStations}
      />
      <TouchableOpacity style={styles.fab} onPress={handleAddStation}>
        <MaterialIcons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    paddingVertical: 8,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
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
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#757575',
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default StationsListScreen;
