import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

/**
 * Écran des paramètres de l'application
 * 
 * @returns {JSX.Element}
 */
const SettingsScreen = () => {
  // États pour les paramètres
  const [offlineMode, setOfflineMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState('daily');
  const [userName, setUserName] = useState('Jean Dupont');
  const [userRole, setUserRole] = useState('Technicien');
  const [appVersion, setAppVersion] = useState('1.0.0');
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  // Charger les paramètres au chargement de l'écran
  useEffect(() => {
    loadSettings();
  }, []);

  // Fonction pour charger les paramètres
  const loadSettings = async () => {
    try {
      // Simuler le chargement des paramètres
      // Dans une implémentation réelle, vous chargeriez depuis AsyncStorage ou une API
      setTimeout(() => {
        // Les paramètres sont déjà initialisés avec des valeurs par défaut
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
      setIsLoading(false);
    }
  };

  // Fonction pour sauvegarder un paramètre
  const saveSetting = async (key, value) => {
    try {
      // Simuler la sauvegarde d'un paramètre
      // Dans une implémentation réelle, vous sauvegarderiez dans AsyncStorage ou une API
      console.log(`Sauvegarde du paramètre ${key}:`, value);
      
      // Afficher un message de confirmation pour certains paramètres
      if (key === 'offlineMode') {
        if (value) {
          Alert.alert(
            'Mode hors ligne activé',
            'Les données seront synchronisées lorsque vous serez à nouveau en ligne.'
          );
        } else {
          Alert.alert(
            'Mode hors ligne désactivé',
            'Les données seront synchronisées automatiquement.'
          );
        }
      }
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde du paramètre ${key}:`, error);
    }
  };

  // Fonction pour se déconnecter
  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: () => {
            // Dans une implémentation réelle, vous appelleriez votre service d'authentification
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  // Fonction pour forcer la synchronisation
  const handleForceSync = () => {
    Alert.alert(
      'Synchronisation',
      'Voulez-vous synchroniser toutes les données maintenant ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Synchroniser', 
          onPress: () => {
            // Simuler une synchronisation
            Alert.alert('Synchronisation en cours', 'Veuillez patienter...');
            setTimeout(() => {
              Alert.alert('Synchronisation terminée', 'Toutes les données ont été synchronisées avec succès.');
            }, 2000);
          }
        }
      ]
    );
  };

  // Fonction pour effacer le cache
  const handleClearCache = () => {
    Alert.alert(
      'Effacer le cache',
      'Êtes-vous sûr de vouloir effacer le cache de l\'application ? Cette action ne supprimera pas vos données.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Effacer', 
          style: 'destructive',
          onPress: () => {
            // Simuler l'effacement du cache
            Alert.alert('Cache effacé', 'Le cache de l\'application a été effacé avec succès.');
          }
        }
      ]
    );
  };

  // Rendu en cas de chargement
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement des paramètres...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Informations utilisateur */}
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userName.split(' ').map(n => n[0]).join('')}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userRole}>{userRole}</Text>
          </View>
        </View>

        {/* Section Synchronisation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synchronisation</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <MaterialIcons name="cloud-off" size={24} color="#757575" />
              <Text style={styles.settingLabel}>Mode hors ligne</Text>
            </View>
            <Switch
              value={offlineMode}
              onValueChange={(value) => {
                setOfflineMode(value);
                saveSetting('offlineMode', value);
              }}
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={offlineMode ? '#2196F3' : '#BDBDBD'}
            />
          </View>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleForceSync}>
            <MaterialIcons name="sync" size={24} color="#2196F3" />
            <Text style={styles.actionButtonText}>Forcer la synchronisation</Text>
          </TouchableOpacity>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <MaterialIcons name="update" size={24} color="#757575" />
              <Text style={styles.settingLabel}>Fréquence de synchronisation</Text>
            </View>
            <View style={styles.syncFrequencyContainer}>
              {['hourly', 'daily', 'weekly'].map((freq) => (
                <TouchableOpacity
                  key={freq}
                  style={[
                    styles.syncFrequencyButton,
                    syncFrequency === freq && styles.syncFrequencyButtonSelected
                  ]}
                  onPress={() => {
                    setSyncFrequency(freq);
                    saveSetting('syncFrequency', freq);
                  }}
                >
                  <Text
                    style={[
                      styles.syncFrequencyText,
                      syncFrequency === freq && styles.syncFrequencyTextSelected
                    ]}
                  >
                    {freq === 'hourly' ? 'Horaire' :
                     freq === 'daily' ? 'Quotidienne' :
                     freq === 'weekly' ? 'Hebdomadaire' : freq}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Section Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <MaterialIcons name="notifications" size={24} color="#757575" />
              <Text style={styles.settingLabel}>Activer les notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={(value) => {
                setNotificationsEnabled(value);
                saveSetting('notificationsEnabled', value);
              }}
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={notificationsEnabled ? '#2196F3' : '#BDBDBD'}
            />
          </View>
        </View>

        {/* Section Localisation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localisation</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <MaterialIcons name="location-on" size={24} color="#757575" />
              <Text style={styles.settingLabel}>Activer la localisation</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={(value) => {
                setLocationEnabled(value);
                saveSetting('locationEnabled', value);
              }}
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={locationEnabled ? '#2196F3' : '#BDBDBD'}
            />
          </View>
        </View>

        {/* Section Apparence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apparence</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <MaterialIcons name="brightness-2" size={24} color="#757575" />
              <Text style={styles.settingLabel}>Mode sombre</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={(value) => {
                setDarkMode(value);
                saveSetting('darkMode', value);
              }}
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={darkMode ? '#2196F3' : '#BDBDBD'}
            />
          </View>
        </View>

        {/* Section Maintenance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maintenance</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleClearCache}>
            <MaterialIcons name="cleaning-services" size={24} color="#2196F3" />
            <Text style={styles.actionButtonText}>Effacer le cache</Text>
          </TouchableOpacity>
        </View>

        {/* Section À propos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version de l'application</Text>
            <Text style={styles.infoValue}>{appVersion}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Développé par</Text>
            <Text style={styles.infoValue}>Dératisation Pro</Text>
          </View>
        </View>

        {/* Bouton de déconnexion */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#757575',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#757575',
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
  settingItem: {
    marginBottom: 16,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#212121',
    marginLeft: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#2196F3',
    marginLeft: 12,
  },
  syncFrequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  syncFrequencyButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 4,
  },
  syncFrequencyButtonSelected: {
    backgroundColor: '#E3F2FD',
  },
  syncFrequencyText: {
    fontSize: 14,
    color: '#757575',
  },
  syncFrequencyTextSelected: {
    color: '#2196F3',
    fontWeight: '500',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#212121',
  },
  infoValue: {
    fontSize: 16,
    color: '#757575',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    borderRadius: 8,
    padding: 16,
    marginBottom: 32,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
});

export default SettingsScreen;
