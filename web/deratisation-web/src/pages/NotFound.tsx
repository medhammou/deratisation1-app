import React from 'react';
import { Container, Alert } from 'react-bootstrap';

/**
 * Page NotFound pour l'application web
 * Affiche un message d'erreur 404 lorsqu'une page n'existe pas
 * 
 * @returns {JSX.Element}
 */
const NotFound = () => {
  return (
    <Container className="py-5 text-center">
      <Alert variant="warning" className="p-5">
        <h1 className="display-1">404</h1>
        <h2 className="mb-4">Page non trouvée</h2>
        <p className="lead">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <a href="/" className="btn btn-primary mt-3">
          Retour à l'accueil
        </a>
      </Alert>
    </Container>
  );
};

export default NotFound;
