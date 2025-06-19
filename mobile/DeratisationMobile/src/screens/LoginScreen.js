import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Écran de connexion pour l'authentification des utilisateurs
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.navigation - L'objet de navigation
 * @returns {JSX.Element}
 */
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fonction pour valider le formulaire
  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir votre adresse e-mail');
      return false;
    }
    
    // Validation simple de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez saisir une adresse e-mail valide');
      return false;
    }
    
    if (!password) {
      Alert.alert('Erreur', 'Veuillez saisir votre mot de passe');
      return false;
    }
    
    return true;
  };

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      
      // Ici, nous simulerons une connexion réussie
      // Dans une implémentation réelle, vous appelleriez votre service d'authentification
      setTimeout(() => {
        setIsLoading(false);
        // Naviguer vers l'écran principal après connexion réussie
        navigation.replace('Main');
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erreur de connexion', 'Identifiants incorrects ou problème de connexion');
      console.error('Erreur de connexion:', error);
    }
  };

  // Fonction pour gérer la récupération de mot de passe
  const handleForgotPassword = () => {
    Alert.alert(
      'Récupération de mot de passe',
      'Un e-mail de réinitialisation sera envoyé à votre adresse e-mail.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Envoyer', 
          onPress: () => {
            if (!email.trim()) {
              Alert.alert('Erreur', 'Veuillez saisir votre adresse e-mail');
              return;
            }
            Alert.alert('E-mail envoyé', 'Veuillez vérifier votre boîte de réception');
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Dératisation Pro</Text>
            <Text style={styles.tagline}>Gestion professionnelle des stations d'appâtage</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.title}>Connexion</Text>
            
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={24} color="#757575" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Adresse e-mail"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color="#757575" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#9E9E9E"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                style={styles.passwordVisibilityButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons 
                  name={showPassword ? 'visibility-off' : 'visibility'} 
                  size={24} 
                  color="#757575" 
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.forgotPasswordButton}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={styles.loginButtonText}>Connexion en cours...</Text>
              ) : (
                <>
                  <MaterialIcons name="login" size={20} color="#FFFFFF" />
                  <Text style={styles.loginButtonText}>Se connecter</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 Dératisation Pro - Tous droits réservés</Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#212121',
    fontSize: 16,
  },
  passwordVisibilityButton: {
    padding: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#2196F3',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    color: '#BDBDBD',
  },
});

export default LoginScreen;
