import { Model } from '@nozbe/watermelondb';
import { field, date, relation, children, readonly, text } from '@nozbe/watermelondb/decorators';

/**
 * Modèle Site pour WatermelonDB
 * Représente un site d'intervention avec ses propriétés et relations
 */
class Site extends Model {
  static table = 'sites';
  
  static associations = {
    stations: { type: 'has_many', foreignKey: 'site_id' },
  };

  // Champs de base
  @text('name') name;
  @text('address') address;
  @field('latitude') latitude;
  @field('longitude') longitude;
  @text('contact_person') contactPerson;
  @text('contact_phone') contactPhone;
  @text('notes') notes;
  @text('status') status;
  @date('last_visit_at') lastVisitAt;
  
  // Champs de synchronisation
  @text('sync_status') syncStatus;
  @text('server_id') serverId;
  
  // Champs de métadonnées
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
  
  // Relations
  @children('stations') stations;
  
  // Méthodes utilitaires
  
  /**
   * Retourne les coordonnées du site sous forme d'objet
   * 
   * @returns {Object|null} - Coordonnées du site ou null
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
   * Vérifie si le site a des coordonnées valides
   * 
   * @returns {boolean} - True si le site a des coordonnées valides
   */
  get hasValidCoordinates() {
    return this.latitude !== null && 
           this.longitude !== null && 
           !isNaN(this.latitude) && 
           !isNaN(this.longitude);
  }
  
  /**
   * Vérifie si le site est actif
   * 
   * @returns {boolean} - True si le site est actif
   */
  get isActive() {
    return this.status === 'active';
  }
  
  /**
   * Vérifie si le site a été visité récemment (moins de 30 jours)
   * 
   * @returns {boolean} - True si le site a été visité récemment
   */
  get isRecentlyVisited() {
    if (!this.lastVisitAt) return false;
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return this.lastVisitAt > thirtyDaysAgo;
  }
  
  /**
   * Prépare les données du site pour l'API
   * 
   * @returns {Object} - Données du site formatées pour l'API
   */
  prepareForApi() {
    return {
      id: this.serverId || this.id,
      name: this.name,
      address: this.address,
      coordinates: this.coordinates,
      contactPerson: this.contactPerson,
      contactPhone: this.contactPhone,
      notes: this.notes,
      status: this.status,
      lastVisitAt: this.lastVisitAt ? this.lastVisitAt.toISOString() : null,
    };
  }
}

export default Site;
