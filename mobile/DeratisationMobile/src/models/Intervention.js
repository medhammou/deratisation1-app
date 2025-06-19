import { Model } from '@nozbe/watermelondb';
import { field, date, relation, readonly, text } from '@nozbe/watermelondb/decorators';

/**
 * Modèle Intervention pour WatermelonDB
 * Représente une intervention sur une station d'appâtage
 */
class Intervention extends Model {
  static table = 'interventions';
  
  static associations = {
    stations: { type: 'belongs_to', key: 'station_id' },
    users: { type: 'belongs_to', key: 'technician_id' },
    photos: { type: 'has_many', foreignKey: 'related_id' },
  };

  // Champs de base
  @text('type') type;
  @text('consumption_level') consumptionLevel;
  @text('notes') notes;
  @date('date') date;
  
  // Relations
  @text('station_id') stationId;
  @relation('stations', 'station_id') station;
  @text('technician_id') technicianId;
  @relation('users', 'technician_id') technician;
  
  // Champs de synchronisation
  @text('sync_status') syncStatus;
  @text('server_id') serverId;
  
  // Champs de métadonnées
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
  
  // Méthodes utilitaires
  
  /**
   * Vérifie si l'intervention est une inspection
   * 
   * @returns {boolean} - True si l'intervention est une inspection
   */
  get isInspection() {
    return this.type === 'inspection';
  }
  
  /**
   * Vérifie si l'intervention est une maintenance
   * 
   * @returns {boolean} - True si l'intervention est une maintenance
   */
  get isMaintenance() {
    return this.type === 'maintenance';
  }
  
  /**
   * Vérifie si l'intervention est un incident
   * 
   * @returns {boolean} - True si l'intervention est un incident
   */
  get isIncident() {
    return this.type === 'incident';
  }
  
  /**
   * Vérifie si l'intervention est une installation
   * 
   * @returns {boolean} - True si l'intervention est une installation
   */
  get isInstallation() {
    return this.type === 'installation';
  }
  
  /**
   * Vérifie si l'intervention a détecté une consommation élevée
   * 
   * @returns {boolean} - True si la consommation est élevée
   */
  get hasHighConsumption() {
    return this.consumptionLevel === 'high';
  }
  
  /**
   * Vérifie si l'intervention a détecté une consommation moyenne
   * 
   * @returns {boolean} - True si la consommation est moyenne
   */
  get hasMediumConsumption() {
    return this.consumptionLevel === 'medium';
  }
  
  /**
   * Vérifie si l'intervention a détecté une consommation faible
   * 
   * @returns {boolean} - True si la consommation est faible
   */
  get hasLowConsumption() {
    return this.consumptionLevel === 'low';
  }
  
  /**
   * Vérifie si l'intervention n'a détecté aucune consommation
   * 
   * @returns {boolean} - True si aucune consommation n'a été détectée
   */
  get hasNoConsumption() {
    return this.consumptionLevel === 'none';
  }
  
  /**
   * Retourne la couleur associée au niveau de consommation
   * 
   * @returns {string} - Code couleur hexadécimal
   */
  get consumptionColor() {
    switch (this.consumptionLevel) {
      case 'none':
        return '#9E9E9E'; // Gris
      case 'low':
        return '#4CAF50'; // Vert
      case 'medium':
        return '#FF9800'; // Orange
      case 'high':
        return '#F44336'; // Rouge
      default:
        return '#9E9E9E'; // Gris par défaut
    }
  }
  
  /**
   * Retourne la couleur associée au type d'intervention
   * 
   * @returns {string} - Code couleur hexadécimal
   */
  get typeColor() {
    switch (this.type) {
      case 'inspection':
        return '#2196F3'; // Bleu
      case 'maintenance':
        return '#4CAF50'; // Vert
      case 'incident':
        return '#F44336'; // Rouge
      case 'installation':
        return '#9C27B0'; // Violet
      default:
        return '#9E9E9E'; // Gris par défaut
    }
  }
  
  /**
   * Prépare les données de l'intervention pour l'API
   * 
   * @returns {Object} - Données de l'intervention formatées pour l'API
   */
  prepareForApi() {
    return {
      id: this.serverId || this.id,
      stationId: this.stationId,
      technicianId: this.technicianId,
      type: this.type,
      consumptionLevel: this.consumptionLevel,
      notes: this.notes,
      date: this.date ? this.date.toISOString() : null,
    };
  }
}

export default Intervention;
