import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

/**
 * Page de connexion pour l'application web
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onLogin - Fonction de gestion de la connexion
 * @returns {JSX.Element}
 */
interface LoginProps {
  onLogin: (credentials: { email: string; password: string }) => boolean;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('admin@deratisation.app');
  const [password, setPassword] = useState('Demo2025!');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simuler un délai de chargement
    setTimeout(() => {
      const success = onLogin({ email, password });
      
      if (success) {
        navigate('/');
      } else {
        setError('Identifiants incorrects. Utilisez les identifiants préremplis pour vous connecter.');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Container className="login-container d-flex align-items-center justify-content-center min-vh-100">
      <Card className="login-card shadow-sm" style={{ maxWidth: '450px', width: '100%' }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <img src={logo} alt="Dératisation Pro Logo" className="login-logo mb-3" style={{ width: '100px', height: '100px' }} />
            <h2 className="text-primary fw-bold">Dératisation Pro</h2>
            <p className="text-muted">Gestion professionnelle des stations d'appâtage</p>
          </div>

          <h4 className="text-center mb-4">Connexion</h4>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button 
                  variant="link" 
                  className="position-absolute end-0 top-0 text-decoration-none"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ padding: '0.375rem 0.75rem' }}
                >
                  {showPassword ? 'Masquer' : 'Afficher'}
                </Button>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end mb-4">
              <Button variant="link" className="p-0 text-decoration-none">
                Mot de passe oublié ?
              </Button>
            </div>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Connexion en cours...
                </>
              ) : 'Se connecter'}
            </Button>
          </Form>

          <Alert variant="info" className="mt-4 mb-0">
            <small className="d-block text-center">
              Pour cette démonstration, utilisez les identifiants préremplis.
            </small>
          </Alert>
        </Card.Body>
        <Card.Footer className="text-center text-muted py-3 bg-light">
          <small>© 2025 Dératisation Pro - Tous droits réservés</small>
          <br />
          <small>Version 1.0.0</small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;
