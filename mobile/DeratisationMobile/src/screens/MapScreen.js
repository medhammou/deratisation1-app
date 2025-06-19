import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MapMarker from '../components/MapMarker';

/**
 * Écran de carte pour visualiser les stations d'appâtage
 * 
 * @returns {JSX.Element}
 */
const MapScreen = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapType, setMapType] = useState('standard');
  const [region, setRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const navigation = useNavigation();
  const route = useRoute();
  const { siteId, stationId } = route.params || {};

  // Charger les stations au chargement de l'écran
  useEffect(() => {
    loadStations();
  }, [siteId]);

  // Fonction pour charger les stations
  const loadStations = async () => {
    try {
      setLoading(true);
      
      // Simuler un appel API pour récupérer les stations
      // Dans une implémentation réelle, vous appelleriez votre service API
      setTimeout(() => {
        const mockStations = [
          {
            id: '1',
            identifier: 'ST-1001',
            status: 'active',
            lastConsumptionLevel: 'low',
            coordinates: {
              latitude: 48.8566,
              longitude: 2.3522,
            },
          },
          {
            id: '2',
            identifier: 'ST-1002',
            status: 'active',
            lastConsumptionLevel: 'medium',
            coordinates: {
              latitude: 48.8606,
              longitude: 2.3376,
            },
          },
          {
            id: '3',
            identifier: 'ST-1003',
            status: 'damaged',
            lastConsumptionLevel: 'high',
            coordinates: {
              latitude: 48.8530,
              longitude: 2.3499,
            },
          },
          {
            id: '4',
            identifier: 'ST-1004',
            status: 'inactive',
            lastConsumptionLevel: 'none',
            coordinates: {
              latitude: 48.8600,
              longitude: 2.3400,
            },
          },
          {
            id: '5',
            identifier: 'ST-1005',
            status: 'removed',
            lastConsumptionLevel: 'none',
            coordinates: {
              latitude: 48.8550,
              longitude: 2.3450,
            },
          },
        ];
        
        setStations(mockStations);
        
        // Si un stationId est fourni, centrer la carte sur cette station
        if (stationId) {
          const station = mockStations.find(s => s.id === stationId);
          if (station) {
            setSelectedStation(station);
            setRegion({
              latitude: station.coordinates.latitude,
              longitude: station.coordinates.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        }
        // Sinon, si un siteId est fourni, ajuster la région pour montrer toutes les stations
        else if (siteId && mockStations.length > 0) {
          // Calculer les limites pour inclure toutes les stations
          let minLat = Number.MAX_VALUE;
          let maxLat = Number.MIN_VALUE;
          let minLng = Number.MAX_VALUE;
          let maxLng = Number.MIN_VALUE;
          
          mockStations.forEach(station => {
            minLat = Math.min(minLat, station.coordinates.latitude);
            maxLat = Math.max(maxLat, station.coordinates.latitude);
            minLng = Math.min(minLng, station.coordinates.longitude);
            maxLng = Math.max(maxLng, station.coordinates.longitude);
          });
          
          // Ajouter une marge
          const latDelta = (maxLat - minLat) * 1.5 || 0.05;
          const lngDelta = (maxLng - minLng) * 1.5 || 0.05;
          
          setRegion({
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            latitudeDelta: Math.max(latDelta, 0.005),
            longitudeDelta: Math.max(lngDelta, 0.005),
          });
        }
        
        setError(null);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Erreur lors du chargement des stations:', err);
      setError('Impossible de charger les stations');
      setLoading(false);
    }
  };

  // Fonction pour gérer le clic sur un marqueur
  const handleMarkerPress = (station) => {
    setSelectedStation(station);
  };

  // Fonction pour naviguer vers les détails d'une station
  const handleStationDetails = () => {
    if (selectedStation) {
      navigation.navigate('StationDetails', { 
        stationId: selectedStation.id,
        stationIdentifier: selectedStation.identifier
      });
    }
  };

  // Fonction pour changer le type de carte
  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  // Fonction pour centrer la carte sur la position actuelle
  const centerOnCurrentLocation = () => {
    // Dans une implémentation réelle, vous utiliseriez Geolocation ou expo-location
    // Pour l'instant, nous simulons simplement un recentrage sur Paris
    setRegion({
      latitude: 48.8566,
      longitude: 2.3522,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  // Rendu en cas de chargement
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Chargement de la carte...</Text>
      </View>
    );
  }

  // Rendu en cas d'erreur
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={64} color="#F44336" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadStations}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        mapType={mapType}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={station.coordinates}
            onPress={() => handleMarkerPress(station)}
          >
            <MapMarker
              status={station.status}
              consumptionLevel={station.lastConsumptionLevel}
              selected={selectedStation?.id === station.id}
            />
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{station.identifier}</Text>
                <Text style={styles.calloutStatus}>
                  {station.status === 'active' ? 'Active' :
                   station.status === 'inactive' ? 'Inactive' :
                   station.status === 'damaged' ? 'Endommagée' :
                   station.status === 'removed' ? 'Retirée' : 'Inconnue'}
                </Text>
                <TouchableOpacity 
                  style={styles.calloutButton}
                  onPress={handleStationDetails}
                >
                  <Text style={styles.calloutButtonText}>Détails</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      
      {/* Boutons de contrôle de la carte */}
      <View style={styles.mapControls}>
        <TouchableOpacity 
          style={styles.mapControlButton}
          onPress={toggleMapType}
        >
          <MaterialIcons 
            name={mapType === 'standard' ? 'satellite' : 'map'} 
            size={24} 
            color="#212121" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.mapControlButton}
          onPress={centerOnCurrentLocation}
        >
          <MaterialIcons name="my-location" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      
      {/* Légende */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Légende</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>Active</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#9E9E9E' }]} />
          <Text style={styles.legendText}>Inactive</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
          <Text style={styles.legendText}>Endommagée</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
          <Text style={styles.legendText}>Retirée</Text>
        </View>
      </View>
      
      {/* Bouton de retour */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'transparent',
  },
  mapControlButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  legendContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#616161',
  },
  calloutContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  calloutStatus: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  calloutButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  calloutButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
