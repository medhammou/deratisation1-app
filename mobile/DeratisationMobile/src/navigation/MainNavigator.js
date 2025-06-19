import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

// Import des écrans
import SitesScreen from '../screens/SitesScreen';
import StationsListScreen from '../screens/StationsListScreen';
import StationDetailsScreen from '../screens/StationDetailsScreen';
import AddStationScreen from '../screens/AddStationScreen';
import EditStationScreen from '../screens/EditStationScreen';
import MapScreen from '../screens/MapScreen';
import InterventionScreen from '../screens/InterventionScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

/**
 * Navigateur principal pour les écrans après authentification
 * Gère la navigation entre les écrans principaux de l'application
 */
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navigateur pour la section Sites
const SitesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Sites" 
        component={SitesScreen} 
        options={{ title: 'Sites d\'intervention' }}
      />
      <Stack.Screen 
        name="StationsList" 
        component={StationsListScreen} 
        options={({ route }) => ({ title: route.params?.siteName || 'Stations' })}
      />
      <Stack.Screen 
        name="StationDetails" 
        component={StationDetailsScreen} 
        options={({ route }) => ({ title: `Station ${route.params?.stationIdentifier || ''}` })}
      />
      <Stack.Screen 
        name="AddStation" 
        component={AddStationScreen} 
        options={{ title: 'Ajouter une station' }}
      />
      <Stack.Screen 
        name="EditStation" 
        component={EditStationScreen} 
        options={{ title: 'Modifier la station' }}
      />
      <Stack.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ title: 'Carte des stations' }}
      />
      <Stack.Screen 
        name="Intervention" 
        component={InterventionScreen} 
        options={{ title: 'Nouvelle intervention' }}
      />
    </Stack.Navigator>
  );
};

// Navigateur pour la section Historique
const HistoryNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="HistoryMain" 
        component={HistoryScreen} 
        options={{ title: 'Historique' }}
      />
      <Stack.Screen 
        name="StationDetails" 
        component={StationDetailsScreen} 
        options={({ route }) => ({ title: `Station ${route.params?.stationIdentifier || ''}` })}
      />
      <Stack.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ title: 'Carte des stations' }}
      />
    </Stack.Navigator>
  );
};

// Navigateur pour la section Paramètres
const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="SettingsMain" 
        component={SettingsScreen} 
        options={{ title: 'Paramètres' }}
      />
    </Stack.Navigator>
  );
};

// Navigateur principal avec onglets
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'SitesTab') {
            iconName = 'place';
          } else if (route.name === 'HistoryTab') {
            iconName = 'history';
          } else if (route.name === 'SettingsTab') {
            iconName = 'settings';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#757575',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="SitesTab" 
        component={SitesNavigator} 
        options={{ title: 'Sites' }}
      />
      <Tab.Screen 
        name="HistoryTab" 
        component={HistoryNavigator} 
        options={{ title: 'Historique' }}
      />
      <Tab.Screen 
        name="SettingsTab" 
        component={SettingsNavigator} 
        options={{ title: 'Paramètres' }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
