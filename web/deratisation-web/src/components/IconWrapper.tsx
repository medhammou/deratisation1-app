import React from 'react';

/**
 * Composant wrapper pour les icônes React
 * Résout les problèmes de typage TypeScript avec react-icons
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {any} props.icon - Le composant d'icône à afficher
 * @param {number} props.size - La taille de l'icône
 * @param {string} props.className - Classes CSS additionnelles
 * @returns {JSX.Element}
 */
const IconWrapper = ({ 
  icon: IconComponent, 
  size = 18, 
  className = '' 
}: { 
  icon: any; 
  size?: number; 
  className?: string;
}) => {
  return <IconComponent size={size} className={className} />;
};

export default IconWrapper;
