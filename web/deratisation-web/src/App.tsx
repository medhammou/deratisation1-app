import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Composants
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Sites from './pages/Sites';
import SiteDetails from './pages/SiteDetails';
import Stations from './pages/Stations';
import StationDetails from './pages/StationDetails';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Définition du type User
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('userToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
      
      setIsLoading(false);
    };
    
    // Simuler un délai de chargement pour une meilleure UX
    setTimeout(checkAuth, 1000);
  }, []);

  // Fonction de connexion pour la démo
  const handleLogin = (credentials: { email: string; password: string }) => {
    // Pour la démo, accepter des identifiants prédéfinis
    if (credentials.email === 'admin@deratisation.app' && credentials.password === 'Demo2025!') {
      const userData = {
        id: 'user-admin',
        name: 'Admin Démo',
        email: 'admin@deratisation.app',
        role: 'admin',
      };
      
      localStorage.setItem('userToken', 'demo-token-admin-123456');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Afficher un écran de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement de l'application...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated ? (
          <div className="app-container">
            <Sidebar user={user} onLogout={handleLogout} />
            <div className="main-content">
              <Header user={user} />
              <div className="page-container">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/sites" element={<Sites />} />
                  <Route path="/sites/:id" element={<SiteDetails />} />
                  <Route path="/stations" element={<Stations />} />
                  <Route path="/stations/:id" element={<StationDetails />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
