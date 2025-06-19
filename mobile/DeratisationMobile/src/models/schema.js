import { appSchema, tableSchema } from '@nozbe/watermelondb';

/**
 * Schéma de la base de données WatermelonDB
 * Définit la structure des tables et des relations entre elles
 */
const schema = appSchema({
  version: 1,
  tables: [
    // Table des utilisateurs
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string', isIndexed: true },
        { name: 'role', type: 'string' },
        { name: 'avatar', type: 'string', isOptional: true },
        { name: 'last_login_at', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    
    // Table des sites
    tableSchema({
      name: 'sites',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'address', type: 'string' },
        { name: 'latitude', type: 'number', isOptional: true },
        { name: 'longitude', type: 'number', isOptional: true },
        { name: 'contact_person', type: 'string', isOptional: true },
        { name: 'contact_phone', type: 'string', isOptional: true },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'status', type: 'string', isIndexed: true },
        { name: 'last_visit_at', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'sync_status', type: 'string', isIndexed: true },
        { name: 'server_id', type: 'string', isOptional: true, isIndexed: true },
      ]
    }),
    
    // Table des stations
    tableSchema({
      name: 'stations',
      columns: [
        { name: 'site_id', type: 'string', isIndexed: true },
        { name: 'identifier', type: 'string', isIndexed: true },
        { name: 'description', type: 'string' },
        { name: 'latitude', type: 'number', isOptional: true },
        { name: 'longitude', type: 'number', isOptional: true },
        { name: 'status', type: 'string', isIndexed: true },
        { name: 'last_consumption_level', type: 'string', isOptional: true },
        { name: 'installation_date', type: 'number', isOptional: true },
        { name: 'last_intervention_at', type: 'number', isOptional: true },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'removed_at', type: 'number', isOptional: true },
        { name: 'sync_status', type: 'string', isIndexed: true },
        { name: 'server_id', type: 'string', isOptional: true, isIndexed: true },
      ]
    }),
    
    // Table des interventions
    tableSchema({
      name: 'interventions',
      columns: [
        { name: 'station_id', type: 'string', isIndexed: true },
        { name: 'technician_id', type: 'string', isIndexed: true },
        { name: 'type', type: 'string', isIndexed: true },
        { name: 'consumption_level', type: 'string' },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'date', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'sync_status', type: 'string', isIndexed: true },
        { name: 'server_id', type: 'string', isOptional: true, isIndexed: true },
      ]
    }),
    
    // Table des photos
    tableSchema({
      name: 'photos',
      columns: [
        { name: 'related_type', type: 'string', isIndexed: true }, // 'station' ou 'intervention'
        { name: 'related_id', type: 'string', isIndexed: true },
        { name: 'uri', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'size', type: 'number', isOptional: true },
        { name: 'width', type: 'number', isOptional: true },
        { name: 'height', type: 'number', isOptional: true },
        { name: 'timestamp', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'sync_status', type: 'string', isIndexed: true },
        { name: 'server_id', type: 'string', isOptional: true, isIndexed: true },
      ]
    }),
    
    // Table des synchronisations
    tableSchema({
      name: 'sync_logs',
      columns: [
        { name: 'timestamp', type: 'number', isIndexed: true },
        { name: 'status', type: 'string', isIndexed: true },
        { name: 'message', type: 'string', isOptional: true },
        { name: 'stats', type: 'string', isOptional: true }, // JSON stringifié
        { name: 'created_at', type: 'number' },
      ]
    }),
  ]
});

export default schema;
