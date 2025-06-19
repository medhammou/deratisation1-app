import { Model } from '@nozbe/watermelondb';
import { field, date, relation, readonly, text } from '@nozbe/watermelondb/decorators';

/**
 * Modèle Photo pour WatermelonDB
 * Représente une photo liée à une station ou une intervention
 */
class Photo extends Model {
  static table = 'photos';
  
  static associations = {
    stations: { type: 'belongs_to', key: 'related_id' },
    interventions: { type: 'belongs_to', key: 'related_id' },
  };

  // Champs de base
  @text('uri') uri;
  @text('name') name;
  @field('size') size;
  @field('width') width;
  @field('height') height;
  @date('timestamp') timestamp;
  
  // Relations
  @text('related_type') relatedType; // 'station' ou 'intervention'
  @text('related_id') relatedId;
  
  // Champs de synchronisation
  @text('sync_status') syncStatus;
  @text('server_id') serverId;
  
  // Champs de métadonnées
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
  
  // Méthodes utilitaires
  
  /**
   * Vérifie si la photo est liée à une station
   * 
   * @returns {boolean} - True si la photo est liée à une station
   */
  get isStationPhoto() {
    return this.relatedType === 'station';
  }
  
  /**
   * Vérifie si la photo est liée à une intervention
   * 
   * @returns {boolean} - True si la photo est liée à une intervention
   */
  get isInterventionPhoto() {
    return this.relatedType === 'intervention';
  }
  
  /**
   * Vérifie si la photo est synchronisée avec le serveur
   * 
   * @returns {boolean} - True si la photo est synchronisée
   */
  get isSynced() {
    return this.syncStatus === 'synced';
  }
  
  /**
   * Vérifie si la photo est en attente de synchronisation
   * 
   * @returns {boolean} - True si la photo est en attente de synchronisation
   */
  get isPending() {
    return this.syncStatus === 'pending';
  }
  
  /**
   * Vérifie si la photo a échoué à la synchronisation
   * 
   * @returns {boolean} - True si la synchronisation a échoué
   */
  get isFailed() {
    return this.syncStatus === 'failed';
  }
  
  /**
   * Prépare les données de la photo pour l'API
   * 
   * @returns {Object} - Données de la photo formatées pour l'API
   */
  prepareForApi() {
    return {
      id: this.serverId || this.id,
      uri: this.uri,
      name: this.name,
      size: this.size,
      width: this.width,
      height: this.height,
      timestamp: this.timestamp ? this.timestamp.toISOString() : null,
      relatedType: this.relatedType,
      relatedId: this.relatedId,
    };
  }
}

export default Photo;
