import React from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';
import IconWrapper from '../components/IconWrapper';

/**
 * Page Stations pour l'application web
 * Affiche la liste des stations avec leurs informations principales
 * 
 * @returns {JSX.Element}
 */
const Stations = () => {
  // Données simulées pour la liste des stations
  const stations = [
    { id: 1, name: 'ST-001', site: 'Centre Commercial Grand Place', location: 'Entrée principale', lastCheck: '2025-06-05', consumption: 'high', status: 'active' },
    { id: 2, name: 'ST-002', site: 'Centre Commercial Grand Place', location: 'Zone de stockage', lastCheck: '2025-06-05', consumption: 'medium', status: 'active' },
    { id: 3, name: 'ST-003', site: 'Centre Commercial Grand Place', location: 'Parking sous-sol', lastCheck: '2025-06-05', consumption: 'low', status: 'active' },
    { id: 4, name: 'ST-101', site: 'Entrepôt Logistique Nord', location: 'Quai de chargement', lastCheck: '2025-06-02', consumption: 'high', status: 'warning' },
    { id: 5, name: 'ST-102', site: 'Entrepôt Logistique Nord', location: 'Zone de stockage A', lastCheck: '2025-06-02', consumption: 'high', status: 'active' },
    { id: 6, name: 'ST-201', site: 'Restaurant La Bonne Fourchette', location: 'Cuisine', lastCheck: '2025-05-28', consumption: 'medium', status: 'active' },
    { id: 7, name: 'ST-301', site: 'Hôpital Saint-Pierre', location: 'Sous-sol', lastCheck: '2025-06-08', consumption: 'none', status: 'inactive' },
    { id: 8, name: 'ST-302', site: 'Hôpital Saint-Pierre', location: 'Cafétéria', lastCheck: '2025-06-08', consumption: 'low', status: 'active' },
  ];

  // Fonction pour déterminer la couleur du badge de consommation
  const getConsumptionBadge = (consumption: string) => {
    switch (consumption) {
      case 'high':
        return <Badge bg="danger">Élevée</Badge>;
      case 'medium':
        return <Badge bg="warning">Moyenne</Badge>;
      case 'low':
        return <Badge bg="success">Faible</Badge>;
      case 'none':
        return <Badge bg="secondary">Aucune</Badge>;
      default:
        return <Badge bg="secondary">Inconnue</Badge>;
    }
  };

  // Fonction pour déterminer la couleur du badge de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'warning':
        return <Badge bg="warning">Attention</Badge>;
      case 'inactive':
        return <Badge bg="danger">Inactive</Badge>;
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
        <h1>Stations</h1>
        <div>
          <Button variant="outline-secondary" className="me-2">
            Filtrer
          </Button>
          <Button variant="primary">
            Exporter
          </Button>
        </div>
      </div>
      
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <Table hover responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Site</th>
                <th>Emplacement</th>
                <th>Dernière vérification</th>
                <th>Consommation</th>
                <th>Statut</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station) => (
                <tr key={station.id}>
                  <td className="fw-bold">{station.name}</td>
                  <td>{station.site}</td>
                  <td>{station.location}</td>
                  <td>{formatDate(station.lastCheck)}</td>
                  <td>{getConsumptionBadge(station.consumption)}</td>
                  <td>{getStatusBadge(station.status)}</td>
                  <td className="text-center">
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <IconWrapper icon={FaMapMarkerAlt} className="me-1" />
                      Voir
                    </Button>
                    <Button variant="outline-success" size="sm">
                      <IconWrapper icon={FaClipboardList} className="me-1" />
                      Historique
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

export default Stations;
