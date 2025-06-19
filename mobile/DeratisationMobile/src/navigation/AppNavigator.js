import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import des navigateurs
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

/**
 * Navigateur principal de l'application
 * Gère la navigation entre les flux authentifiés et non authentifiés
 */
const AppNavigator = () => {
  // État pour suivre si l'utilisateur est connecté
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // État pour suivre si l'application est en cours de chargement
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    // Simuler la vérification du token d'authentification
    // Dans une implémentation réelle, vous vérifieriez le token stocké
    const checkAuthStatus = async () => {
      try {
        // Simuler un délai de chargement
        setTimeout(() => {
          // Pour les besoins de la démo, on considère l'utilisateur comme non authentifié
          setIsAuthenticated(false);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Fonction pour gérer la connexion
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Contexte d'authentification pour partager les fonctions de connexion/déconnexion
  const authContext = {
    signIn: handleLogin,
    signOut: handleLogout,
  };

  // Afficher un écran de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return null; // Dans une implémentation réelle, vous afficheriez un écran de chargement
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      <NavigationContainer>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
