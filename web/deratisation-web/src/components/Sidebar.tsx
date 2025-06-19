import React from 'react';
import { Nav, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaClipboardList, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';

// Composant d'icône pour contourner les problèmes de typage
const Icon = ({ icon: IconComponent, size = 18 }: { icon: any, size?: number }) => {
  return <IconComponent size={size} />;
};

// Import du type User
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Composant Sidebar pour l'application web
 * Affiche le menu latéral avec les liens de navigation
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {User|null} props.user - Informations sur l'utilisateur connecté
 * @param {Function} props.onLogout - Fonction de déconnexion
 * @returns {JSX.Element}
 */
const Sidebar = ({ user, onLogout }: { user: User | null; onLogout: () => void }) => {
  const location = useLocation();
  
  // Définition des liens de navigation avec les icônes
  const navItems = [
    { path: '/', label: 'Tableau de bord', iconComponent: FaHome },
    { path: '/sites', label: 'Sites', iconComponent: FaMapMarkerAlt },
    { path: '/stations', label: 'Stations', iconComponent: FaClipboardList },
    { path: '/reports', label: 'Rapports', iconComponent: FaChartBar },
    { path: '/settings', label: 'Paramètres', iconComponent: FaCog },
  ];

  return (
    <div className="sidebar bg-dark text-white d-flex flex-column" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3 border-bottom border-secondary">
        <h4 className="text-center mb-0">Dératisation Pro</h4>
        <p className="text-center text-muted small mb-0">Gestion professionnelle</p>
      </div>
      
      <div className="p-3 border-bottom border-secondary">
        <div className="d-flex align-items-center">
          <div 
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{ width: '40px', height: '40px', fontSize: '16px' }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="fw-bold">{user?.name || 'Utilisateur'}</div>
            <div className="text-muted small">{user?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}</div>
          </div>
        </div>
      </div>
      
      <Nav className="flex-column mt-3">
        <ListGroup variant="flush" className="w-100">
          {navItems.map((item) => (
              <ListGroup.Item 
              key={item.path}
              as={Link}
              to={item.path}
              action
              active={location.pathname === item.path}
              className="border-0 d-flex align-items-center"
              style={{ 
                backgroundColor: location.pathname === item.path ? '#2c3e50' : 'transparent',
                color: location.pathname === item.path ? '#ffffff' : '#adb5bd'
              }}
            >
              <span className="me-3"><Icon icon={item.iconComponent} size={18} /></span>
              {item.label}
            </ListGroup.Item>         ))}
        </ListGroup>
      </Nav>
      
      <div className="mt-auto p-3">
        <button 
          className="btn btn-outline-light btn-sm d-flex align-items-center" 
          onClick={onLogout}
        >
          <span className="me-2"><Icon icon={FaSignOutAlt} /></span>
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
