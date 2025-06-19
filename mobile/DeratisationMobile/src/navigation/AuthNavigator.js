import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

/**
 * Navigateur pour les écrans d'authentification
 * Gère la navigation entre les écrans liés à l'authentification
 */
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Autres écrans d'authentification à ajouter ici si nécessaire */}
      {/* Par exemple: inscription, récupération de mot de passe, etc. */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
