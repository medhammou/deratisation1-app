import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import du type User
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Composant Header pour l'application web
 * Affiche la barre de navigation supérieure avec le titre et les informations utilisateur
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {User|null} props.user - Informations sur l'utilisateur connecté
 * @returns {JSX.Element}
 */
const Header = ({ user }: { user: User | null }) => {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="ms-2 fw-bold text-primary">Dératisation Pro</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <div className="d-flex align-items-center">
              <div className="me-3 text-end">
                <div className="fw-bold">{user?.name || 'Utilisateur'}</div>
                <div className="text-muted small">{user?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}</div>
              </div>
              <div 
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', fontSize: '16px' }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
