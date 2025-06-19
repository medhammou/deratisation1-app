import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import Site from './Site';
import Station from './Station';
import Intervention from './Intervention';
import Photo from './Photo';
import User from './User';

/**
 * Configuration et initialisation de la base de données WatermelonDB
 * Gère la persistance locale des données pour l'application mobile
 */

// Configuration de l'adaptateur SQLite
const adapter = new SQLiteAdapter({
  schema,
  // Nom de la base de données
  dbName: 'deratisation_mobile',
  // Migrations pour les futures versions
  migrations: [],
  // Options de performance
  jsi: true, // Utiliser JSI pour de meilleures performances
  onSetUpError: (error) => {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  },
});

// Initialisation de la base de données avec tous les modèles
const database = new Database({
  adapter,
  modelClasses: [
    Site,
    Station,
    Intervention,
    Photo,
    User,
  ],
});

/**
 * Initialise la base de données et effectue les vérifications nécessaires
 * 
 * @returns {Promise<Database>} - Instance de la base de données initialisée
 */
export const initializeDatabase = async () => {
  try {
    // Vérifier que la base de données est accessible
    await database.adapter.schema;
    
    console.log('Base de données WatermelonDB initialisée avec succès');
    return database;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
};

/**
 * Efface toutes les données de la base de données
 * Utile pour les tests ou la réinitialisation complète
 * 
 * @returns {Promise<void>}
 */
export const clearDatabase = async () => {
  try {
    await database.write(async () => {
      await database.unsafeResetDatabase();
    });
    
    console.log('Base de données effacée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'effacement de la base de données:', error);
    throw error;
  }
};

/**
 * Récupère des statistiques sur la base de données
 * 
 * @returns {Promise<Object>} - Statistiques de la base de données
 */
export const getDatabaseStats = async () => {
  try {
    const [
      sitesCount,
      stationsCount,
      interventionsCount,
      photosCount,
      usersCount,
    ] = await Promise.all([
      database.collections.get('sites').query().fetchCount(),
      database.collections.get('stations').query().fetchCount(),
      database.collections.get('interventions').query().fetchCount(),
      database.collections.get('photos').query().fetchCount(),
      database.collections.get('users').query().fetchCount(),
    ]);

    return {
      sites: sitesCount,
      stations: stationsCount,
      interventions: interventionsCount,
      photos: photosCount,
      users: usersCount,
      total: sitesCount + stationsCount + interventionsCount + photosCount + usersCount,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
};

/**
 * Vérifie l'intégrité de la base de données
 * 
 * @returns {Promise<Object>} - Résultat de la vérification d'intégrité
 */
export const checkDatabaseIntegrity = async () => {
  try {
    // Vérifier que toutes les collections sont accessibles
    const collections = ['sites', 'stations', 'interventions', 'photos', 'users'];
    const results = {};
    
    for (const collectionName of collections) {
      try {
        const collection = database.collections.get(collectionName);
        const count = await collection.query().fetchCount();
        results[collectionName] = { accessible: true, count };
      } catch (error) {
        results[collectionName] = { accessible: false, error: error.message };
      }
    }
    
    return {
      success: true,
      collections: results,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Erreur lors de la vérification d\'intégrité:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};

export default database;
