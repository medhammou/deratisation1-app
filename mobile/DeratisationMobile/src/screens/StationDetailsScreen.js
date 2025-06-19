import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import StatusBadge from '../components/StatusBadge';
import ConsumptionIndicator from '../components/ConsumptionIndicator';
import MapView, { Marker } from 'react-native-maps';

/**
 * Écran de détails d'une station d'appâtage
 * 
 * @returns {JSX.Element}
 */
const StationDetailsScreen = () => {
  const [station, setStation] = useState(null);
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { stationId, stationIdentifier } = route.params || {};

  // Charger les détails de la station au chargement de l'écran
  useEffect(() => {
    // Définir le titre de l'écran avec l'identifiant de la station
    navigation.setOptions({
      title: stationIdentifier ? `Station ${stationIdentifier}` : 'Détails de la station',
    });

    loadStationDetails();
  }, [stationId, navigation, stationIdentifier]);

  // Fonction pour charger les détails de la station
  const loadStationDetails = async () => {
    if (!stationId) {
      setError('Identifiant de station manquant');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Simuler un appel API pour récupérer les détails de la station
      // Dans une implémentation réelle, vous appelleriez votre service API
      setTimeout(() => {
        const mockStation = {
          id: stationId,
          identifier: stationIdentifier || 'ST-001',
          description: 'Station située près de l\'entrée principale, derrière le comptoir d\'accueil.',
          status: 'active',
          lastConsumptionLevel: 'medium',
          coordinates: {
            latitude: 48.8566,
            longitude: 2.3522,
          },
          installationDate: '2025-01-15',
          lastMaintenanceDate: '2025-05-28',
          notes: 'Station facilement accessible. Vérifier régulièrement car zone à fort passage.',
          photos: [
            { id: 'p1', uri: 'https://example.com/photo1.jpg', date: '2025-05-28' },
            { id: 'p2', uri: 'https://example.com/photo2.jpg', date: '2025-04-15' },
          ],
        };
        
        const mockInterventions = [
          {
            id: 'i1',
            date: '2025-05-28',
            type: 'maintenance',
            consumptionLevel: 'medium',
            notes: 'Remplacement de l\'appât. Traces d\'activité observées.',
            technician: 'Jean Dupont',
          },
          {
            id: 'i2',
            date: '2025-04-15',
            type: 'inspection',
            consumptionLevel: 'high',
            notes: 'Forte activité détectée. Appât presque entièrement consommé.',
            technician: 'Marie Martin',
          },
          {
            id: 'i3',
            date: '2025-03-02',
            type: 'installation',
            consumptionLevel: 'none',
            notes: 'Installation initiale de la station.',
            technician: 'Jean Dupont',
          },
        ];
        
        setStation(mockStation);
        setInterventions(mockInterventions);
        setError(null);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Erreur lors du chargement des détails de la station:', err);
      setError('Impossible de charger les détails de la station');
      setLoading(false);
    }
  };

  // Fonction pour naviguer vers l'écran d'édition de la station
  const handleEditStation = () => {
    navigation.navigate('EditStation', { stationId: station.id });
  };

  // Fonction pour naviguer vers l'écran d'ajout d'intervention
  const handleAddIntervention = () => {
    navigation.navigate('Intervention', { stationId: station.id, stationIdentifier: station.identifier });
  };

  // Fonction pour signaler un incident
  const handleReportIncident = () => {
    navigation.navigate('ReportIncident', { stationId: station.id, stationIdentifier: station.identifier });
  };

  // Fonction pour signaler le retrait d'une station
  const handleRemoveStation = () => {
    Alert.alert(
      'Retirer la station',
      'Êtes-vous sûr de vouloir marquer cette station comme retirée ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Confirmer', 
          style: 'destructive',
          onPress: () => {
            // Dans une implémentation réelle, vous appelleriez votre service API
            Alert.alert('Station retirée', 'La station a été marquée comme retirée avec succès');
            // Mettre à jour l'état local
            setStation(prev => ({ ...prev, status: 'removed' }));
          }
        }
      ]
    );
  };

  // Rendu en cas de chargement
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Chargement des détails...</Text>
      </View>
    );
  }

  // Rendu en cas d'erreur
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="error-outline" size={64} color="#F44336" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadStationDetails}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Rendu si la station n'est pas trouvée
  if (!station) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="location-off" size={64} color="#9E9E9E" />
        <Text style={styles.errorText}>Station non trouvée</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* En-tête avec statut et actions */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.stationId}>Station {station.identifier}</Text>
            <StatusBadge status={station.status} size="medium" />
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditStation}>
            <MaterialIcons name="edit" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>

        {/* Carte de localisation */}
        {station.coordinates && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: station.coordinates.latitude,
                longitude: station.coordinates.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: station.coordinates.latitude,
                  longitude: station.coordinates.longitude,
                }}
                title={`Station ${station.identifier}`}
              />
            </MapView>
            <TouchableOpacity 
              style={styles.expandMapButton}
              onPress={() => navigation.navigate('Map', { stationId: station.id })}
            >
              <MaterialIcons name="fullscreen" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Informations générales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations générales</Text>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="info" size={20} color="#757575" />
            <Text style={styles.infoLabel}>Description:</Text>
            <Text style={styles.infoValue}>{station.description}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="calendar-today" size={20} color="#757575" />
            <Text style={styles.infoLabel}>Installation:</Text>
            <Text style={styles.infoValue}>{new Date(station.installationDate).toLocaleDateString()}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="build" size={20} color="#757575" />
            <Text style={styles.infoLabel}>Dernière maintenance:</Text>
            <Text style={styles.infoValue}>{new Date(station.lastMaintenanceDate).toLocaleDateString()}</Text>
          </View>
          
          <View style={styles.consumptionContainer}>
            <Text style={styles.consumptionLabel}>Niveau de consommation actuel:</Text>
            <ConsumptionIndicator level={station.lastConsumptionLevel} size={24} />
          </View>
          
          {station.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Notes:</Text>
              <Text style={styles.notesText}>{station.notes}</Text>
            </View>
          )}
        </View>

        {/* Historique des interventions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique des interventions</Text>
          
          {interventions.length > 0 ? (
            interventions.map((intervention) => (
              <View key={intervention.id} style={styles.interventionItem}>
                <View style={styles.interventionHeader}>
                  <Text style={styles.interventionDate}>
                    {new Date(intervention.date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.interventionType}>{intervention.type}</Text>
                </View>
                
                <View style={styles.interventionDetails}>
                  <ConsumptionIndicator level={intervention.consumptionLevel} size={20} />
                  <Text style={styles.interventionNotes}>{intervention.notes}</Text>
                  <Text style={styles.interventionTechnician}>Par: {intervention.technician}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Aucune intervention enregistrée</Text>
          )}
          
          <TouchableOpacity 
            style={styles.addInterventionButton}
            onPress={handleAddIntervention}
          >
            <MaterialIcons name="add" size={18} color="#FFFFFF" />
            <Text style={styles.addInterventionText}>Nouvelle intervention</Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleReportIncident}
          >
            <MaterialIcons name="report-problem" size={24} color="#FF9800" />
            <Text style={styles.actionButtonText}>Signaler un incident</Text>
          </TouchableOpacity>
          
          {station.status !== 'removed' && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.removeButton]}
              onPress={handleRemoveStation}
            >
              <MaterialIcons name="delete" size={24} color="#F44336" />
              <Text style={[styles.actionButtonText, styles.removeButtonText]}>
                Retirer la station
              </Text>
            </TouchableOpacity>
          )}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginRight: 12,
  },
  editButton: {
    padding: 8,
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  expandMapButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
    marginLeft: 8,
    marginRight: 8,
  },
  infoValue: {
    fontSize: 14,
    color: '#212121',
    flex: 1,
  },
  consumptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  consumptionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
    marginRight: 8,
  },
  notesContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#212121',
  },
  interventionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 12,
  },
  interventionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  interventionDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  interventionType: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  interventionDetails: {
    marginLeft: 8,
  },
  interventionNotes: {
    fontSize: 14,
    color: '#616161',
    marginVertical: 8,
  },
  interventionTechnician: {
    fontSize: 12,
    color: '#9E9E9E',
    fontStyle: 'italic',
    textAlign: 'right',
  },
  emptyText: {
    fontSize: 14,
    color: '#9E9E9E',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 16,
  },
  addInterventionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  addInterventionText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 8,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginLeft: 12,
  },
  removeButton: {
    borderColor: '#FFCDD2',
    backgroundColor: '#FFEBEE',
  },
  removeButtonText: {
    color: '#F44336',
  },
});

export default StationDetailsScreen;
