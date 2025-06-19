import { Model } from '@nozbe/watermelondb';
import { field, date, relation, children, readonly, text } from '@nozbe/watermelondb/decorators';

/**
 * Modèle Station pour WatermelonDB
 * Représente une station d'appâtage avec ses propriétés et relations
 */
class Station extends Model {
  static table = 'stations';
  
  static associations = {
    site: { type: 'belongs_to', key: 'site_id' },
    interventions: { type: 'has_many', foreignKey: 'station_id' },
    photos: { type: 'has_many', foreignKey: 'related_id' },
  };

  // Champs de base
  @text('identifier') identifier;
  @text('description') description;
  @field('latitude') latitude;
  @field('longitude') longitude;
  @text('status') status;
  @text('last_consumption_level') lastConsumptionLevel;
  @date('installation_date') installationDate;
  @date('last_intervention_at') lastInterventionAt;
  @text('notes') notes;
  @date('removed_at') removedAt;
  
  // Relations
  @text('site_id') siteId;
  @relation('sites', 'site_id') site;
  @children('interventions') interventions;
  
  // Champs de synchronisation
  @text('sync_status') syncStatus;
  @text('server_id') serverId;
  
  // Champs de métadonnées
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
  
  // Méthodes utilitaires
  
  /**
   * Retourne les coordonnées de la station sous forme d'objet
   * 
   * @returns {Object|null} - Coordonnées de la station ou null
   */
  get coordinates() {
    if (this.latitude && this.longitude) {
      return {
        latitude: this.latitude,
        longitude: this.longitude,
      };
    }
    return null;
  }
  
  /**
   * Vérifie si la station a des coordonnées valides
   * 
   * @returns {boolean} - True si la station a des coordonnées valides
   */
  get hasValidCoordinates() {
    return this.latitude !== null && 
           this.longitude !== null && 
           !isNaN(this.latitude) && 
           !isNaN(this.longitude);
  }
  
  /**
   * Vérifie si la station est active
   * 
   * @returns {boolean} - True si la station est active
   */
  get isActive() {
    return this.status === 'active';
  }
  
  /**
   * Vérifie si la station est endommagée
   * 
   * @returns {boolean} - True si la station est endommagée
   */
  get isDamaged() {
    return this.status === 'damaged';
  }
  
  /**
   * Vérifie si la station a été retirée
   * 
   * @returns {boolean} - True si la station a été retirée
   */
  get isRemoved() {
    return this.status === 'removed' || this.removedAt !== null;
  }
  
  /**
   * Vérifie si la station nécessite une intervention (pas d'intervention depuis 30 jours)
   * 
   * @returns {boolean} - True si la station nécessite une intervention
   */
  get needsIntervention() {
    if (!this.lastInterventionAt) return true;
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return this.lastInterventionAt < thirtyDaysAgo;
  }
  
  /**
   * Retourne le niveau de priorité de la station basé sur son statut et sa consommation
   * 
   * @returns {string} - Niveau de priorité ('high', 'medium', 'low')
   */
  get priorityLevel() {
    if (this.isDamaged || this.lastConsumptionLevel === 'high') {
      return 'high';
    }
    
    if (this.needsIntervention || this.lastConsumptionLevel === 'medium') {
      return 'medium';
    }
    
    return 'low';
  }
  
  /**
   * Retourne la couleur associée au statut de la station
   * 
   * @returns {string} - Code couleur hexadécimal
   */
  get statusColor() {
    switch (this.status) {
      case 'active':
        return '#4CAF50'; // Vert
      case 'inactive':
        return '#9E9E9E'; // Gris
      case 'damaged':
        return '#FF9800'; // Orange
      case 'removed':
        return '#F44336'; // Rouge
      default:
        return '#9E9E9E'; // Gris par défaut
    }
  }
  
  /**
   * Retourne la couleur associée au niveau de consommation
   * 
   * @returns {string} - Code couleur hexadécimal
   */
  get consumptionColor() {
    switch (this.lastConsumptionLevel) {
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
   * Prépare les données de la station pour l'API
   * 
   * @returns {Object} - Données de la station formatées pour l'API
   */
  prepareForApi() {
    return {
      id: this.serverId || this.id,
      siteId: this.siteId,
      identifier: this.identifier,
      description: this.description,
      coordinates: this.coordinates,
      status: this.status,
      lastConsumptionLevel: this.lastConsumptionLevel,
      installationDate: this.installationDate ? this.installationDate.toISOString() : null,
      lastInterventionAt: this.lastInterventionAt ? this.lastInterventionAt.toISOString() : null,
      notes: this.notes,
      removedAt: this.removedAt ? this.removedAt.toISOString() : null,
    };
  }
}

export default Station;
