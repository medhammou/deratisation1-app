import React from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FaPlus, FaMapMarkerAlt } from 'react-icons/fa';
import IconWrapper from '../components/IconWrapper';

/**
 * Page Sites pour l'application web
 * Affiche la liste des sites avec leurs informations principales
 * 
 * @returns {JSX.Element}
 */
const Sites = () => {
  // Données simulées pour la liste des sites
  const sites = [
    { id: 1, name: 'Centre Commercial Grand Place', address: '15 Avenue des Commerces, 75001 Paris', stationsCount: 24, lastVisit: '2025-06-05', status: 'active' },
    { id: 2, name: 'Entrepôt Logistique Nord', address: '42 Rue de l\'Industrie, 59000 Lille', stationsCount: 36, lastVisit: '2025-06-02', status: 'active' },
    { id: 3, name: 'Restaurant La Bonne Fourchette', address: '8 Place de la Mairie, 69000 Lyon', stationsCount: 12, lastVisit: '2025-05-28', status: 'warning' },
    { id: 4, name: 'Hôpital Saint-Pierre', address: '101 Boulevard de la Santé, 33000 Bordeaux', stationsCount: 48, lastVisit: '2025-06-08', status: 'active' },
    { id: 5, name: 'École Primaire Jean Moulin', address: '3 Rue des Écoliers, 44000 Nantes', stationsCount: 18, lastVisit: '2025-05-15', status: 'danger' },
    { id: 6, name: 'Résidence Les Oliviers', address: '27 Avenue des Palmiers, 06000 Nice', stationsCount: 22, lastVisit: '2025-06-01', status: 'active' },
  ];

  // Fonction pour déterminer la couleur du badge de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Actif</Badge>;
      case 'warning':
        return <Badge bg="warning">Attention requise</Badge>;
      case 'danger':
        return <Badge bg="danger">Intervention urgente</Badge>;
      default:
        return <Badge bg="secondary">Inconnu</Badge>;
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Sites</h1>
        <Button variant="primary">
          <IconWrapper icon={FaPlus} className="me-2" />
          Nouveau site
        </Button>
      </div>
      
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <Table hover responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Nom du site</th>
                <th>Adresse</th>
                <th className="text-center">Stations</th>
                <th>Dernière visite</th>
                <th>Statut</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => (
                <tr key={site.id}>
                  <td className="fw-bold">{site.name}</td>
                  <td>{site.address}</td>
                  <td className="text-center">{site.stationsCount}</td>
                  <td>{formatDate(site.lastVisit)}</td>
                  <td>{getStatusBadge(site.status)}</td>
                  <td className="text-center">
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <IconWrapper icon={FaMapMarkerAlt} className="me-1" />
                      Voir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default Sites;
