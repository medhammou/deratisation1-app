import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, text } from '@nozbe/watermelondb/decorators';

/**
 * Modèle User pour WatermelonDB
 * Représente un utilisateur de l'application (technicien, superviseur, etc.)
 */
class User extends Model {
  static table = 'users';
  
  static associations = {
    interventions: { type: 'has_many', foreignKey: 'technician_id' },
  };

  // Champs de base
  @text('name') name;
  @text('email') email;
  @text('role') role;
  @text('avatar') avatar;
  @date('last_login_at') lastLoginAt;
  
  // Champs de métadonnées
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
  
  // Méthodes utilitaires
  
  /**
   * Vérifie si l'utilisateur est un technicien
   * 
   * @returns {boolean} - True si l'utilisateur est un technicien
   */
  get isTechnician() {
    return this.role === 'technician';
  }
  
  /**
   * Vérifie si l'utilisateur est un superviseur
   * 
   * @returns {boolean} - True si l'utilisateur est un superviseur
   */
  get isSupervisor() {
    return this.role === 'supervisor';
  }
  
  /**
   * Vérifie si l'utilisateur est un administrateur
   * 
   * @returns {boolean} - True si l'utilisateur est un administrateur
   */
  get isAdmin() {
    return this.role === 'admin';
  }
  
  /**
   * Retourne les initiales de l'utilisateur
   * 
   * @returns {string} - Initiales de l'utilisateur
   */
  get initials() {
    if (!this.name) return '';
    
    return this.name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }
  
  /**
   * Vérifie si l'utilisateur s'est connecté récemment (moins de 24h)
   * 
   * @returns {boolean} - True si l'utilisateur s'est connecté récemment
   */
  get isRecentlyActive() {
    if (!this.lastLoginAt) return false;
    
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    return this.lastLoginAt > twentyFourHoursAgo;
  }
  
  /**
   * Prépare les données de l'utilisateur pour l'API
   * 
   * @returns {Object} - Données de l'utilisateur formatées pour l'API
   */
  prepareForApi() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      avatar: this.avatar,
      lastLoginAt: this.lastLoginAt ? this.lastLoginAt.toISOString() : null,
    };
  }
}

export default User;
