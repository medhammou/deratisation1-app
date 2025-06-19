import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

/**
 * Écran de liste des sites d'intervention
 * 
 * @returns {JSX.Element}
 */
const SitesScreen = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  // Charger les sites au chargement de l'écran
  useEffect(() => {
    loadSites();
  }, []);

  // Fonction pour charger les sites
  const loadSites = async () => {
    try {
      setLoading(true);
      
      // Simuler un appel API pour récupérer les sites
      // Dans une implémentation réelle, vous appelleriez votre service API
      setTimeout(() => {
        const mockSites = [
          { id: '1', name: 'Restaurant Le Gourmet', address: '15 rue de la Paix, Paris', stationsCount: 12, lastVisit: '2025-05-28' },
          { id: '2', name: 'Hôtel Bellevue', address: '8 avenue des Champs-Élysées, Paris', stationsCount: 24, lastVisit: '2025-06-01' },
          { id: '3', name: 'Supermarché Express', address: '45 boulevard Haussmann, Paris', stationsCount: 18, lastVisit: '2025-05-15' },
          { id: '4', name: 'École Primaire Jules Ferry', address: '12 rue des Écoles, Lyon', stationsCount: 8, lastVisit: '2025-05-20' },
          { id: '5', name: 'Entrepôt Logistique Nord', address: '120 route Industrielle, Lille', stationsCount: 30, lastVisit: '2025-06-05' },
        ];
        
        setSites(mockSites);
        setError(null);
        setLoading(false);
        setRefreshing(false);
      }, 1000);
      
    } catch (err) {
      console.error('Erreur lors du chargement des sites:', err);
      setError('Impossible de charger les sites. Veuillez réessayer.');
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fonction pour rafraîchir la liste
  const handleRefresh = () => {
    setRefreshing(true);
    loadSites();
  };

  // Fonction pour naviguer vers l'écran de détail d'un site
  const handleSitePress = (site) => {
    navigation.navigate('StationsList', { siteId: site.id, siteName: site.name });
  };

  // Fonction pour naviguer vers l'écran d'ajout de site
  const handleAddSite = () => {
    // Cette fonctionnalité serait implémentée dans une version future
    alert('Fonctionnalité d\'ajout de site à venir');
  };

  // Rendu d'un élément de la liste
  const renderSiteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.siteCard}
      onPress={() => handleSitePress(item)}
    >
      <View style={styles.siteHeader}>
        <Text style={styles.siteName}>{item.name}</Text>
        <View style={styles.stationsCountContainer}>
          <MaterialIcons name="place" size={16} color="#2196F3" />
          <Text style={styles.stationsCount}>{item.stationsCount}</Text>
        </View>
      </View>
      
      <Text style={styles.siteAddress}>{item.address}</Text>
      
      <View style={styles.siteFooter}>
        <View style={styles.lastVisitContainer}>
          <MaterialIcons name="event" size={14} color="#757575" />
          <Text style={styles.lastVisitText}>
            Dernière visite: {new Date(item.lastVisit).toLocaleDateString()}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={() => handleSitePress(item)}
        >
          <Text style={styles.detailsButtonText}>Détails</Text>
          <MaterialIcons name="arrow-forward" size={16} color="#2196F3" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Rendu lorsque la liste est vide
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="business" size={64} color="#9E9E9E" />
      <Text style={styles.emptyText}>Aucun site disponible</Text>
      <Text style={styles.emptySubtext}>Les sites que vous ajouterez apparaîtront ici</Text>
    </View>
  );

  // Rendu en cas d'erreur
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={64} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadSites}>
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sites d'intervention</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Chargement des sites...</Text>
        </View>
      ) : (
        <FlatList
          data={sites}
          keyExtractor={(item) => item.id}
          renderItem={renderSiteItem}
          contentContainerStyle={sites.length === 0 ? styles.emptyList : styles.list}
          ListEmptyComponent={renderEmptyList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#2196F3"]}
            />
          }
        />
      )}
      
      <TouchableOpacity style={styles.fab} onPress={handleAddSite}>
        <MaterialIcons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterButton: {
    padding: 8,
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
  list: {
    padding: 16,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  siteCard: {
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
  siteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  siteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
  },
  stationsCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  stationsCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2196F3',
    marginLeft: 4,
  },
  siteAddress: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  siteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastVisitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastVisitText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#2196F3',
    marginRight: 4,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
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

export default SitesScreen;
