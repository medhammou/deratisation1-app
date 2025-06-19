import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Table } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClipboardList, FaCamera, FaHistory, FaEdit } from 'react-icons/fa';
import IconWrapper from '../components/IconWrapper';

/**
 * Page SiteDetails pour l'application web
 * Affiche les détails d'un site spécifique
 * 
 * @returns {JSX.Element}
 */
const SiteDetails = () => {
  // Données simulées pour le site
  const site = {
    id: 1,
    name: 'Centre Commercial Grand Place',
    address: '15 Avenue des Commerces, 75001 Paris',
    contact: 'Jean Dupont',
    phone: '01 23 45 67 89',
    email: 'j.dupont@grandplace.com',
    stationsCount: 24,
    activeStations: 22,
    inactiveStations: 2,
    lastVisit: '2025-06-05',
    nextVisit: '2025-07-05',
    status: 'active',
    notes: 'Centre commercial avec forte affluence. Attention particulière aux zones de restauration et aux entrées de service.',
    stations: [
      { id: 1, name: 'ST-001', location: 'Entrée principale', lastCheck: '2025-06-05', consumption: 'high', status: 'active' },
      { id: 2, name: 'ST-002', location: 'Zone de stockage', lastCheck: '2025-06-05', consumption: 'medium', status: 'active' },
      { id: 3, name: 'ST-003', location: 'Parking sous-sol', lastCheck: '2025-06-05', consumption: 'low', status: 'active' },
      { id: 4, name: 'ST-004', location: 'Quai de livraison', lastCheck: '2025-06-05', consumption: 'none', status: 'inactive' },
      { id: 5, name: 'ST-005', location: 'Couloir technique', lastCheck: '2025-06-05', consumption: 'high', status: 'active' },
    ],
    interventions: [
      { id: 1, date: '2025-06-05', technician: 'Pierre Martin', type: 'Inspection régulière', stations: 24, notes: 'RAS' },
      { id: 2, date: '2025-05-05', technician: 'Pierre Martin', type: 'Inspection régulière', stations: 24, notes: 'Remplacement de 2 stations endommagées' },
      { id: 3, date: '2025-04-05', technician: 'Sophie Dubois', type: 'Inspection régulière', stations: 24, notes: 'Forte activité détectée près de l\'entrée de service' },
    ]
  };

  // Fonction pour déterminer la couleur du badge de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Actif</Badge>;
      case 'warning':
        return <Badge bg="warning">Attention requise</Badge>;
      case 'danger':
        return <Badge bg="danger">Intervention urgente</Badge>;
      case 'inactive':
        return <Badge bg="secondary">Inactif</Badge>;
      default:
        return <Badge bg="secondary">Inconnu</Badge>;
    }
  };

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

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{site.name}</h1>
        <div>
          <Button variant="outline-secondary" className="me-2">
            <IconWrapper icon={FaHistory} className="me-2" />
            Historique
          </Button>
          <Button variant="primary">
            <IconWrapper icon={FaEdit} className="me-2" />
            Modifier
          </Button>
        </div>
      </div>
      
      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Informations générales</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Adresse:</strong> {site.address}</p>
                  <p><strong>Contact:</strong> {site.contact}</p>
                  <p><strong>Téléphone:</strong> {site.phone}</p>
                  <p><strong>Email:</strong> {site.email}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Statut:</strong> {getStatusBadge(site.status)}</p>
                  <p><strong>Dernière visite:</strong> {formatDate(site.lastVisit)}</p>
                  <p><strong>Prochaine visite:</strong> {formatDate(site.nextVisit)}</p>
                  <p><strong>Stations:</strong> {site.stationsCount} ({site.activeStations} actives, {site.inactiveStations} inactives)</p>
                </Col>
              </Row>
              <div className="mt-3">
                <h6>Notes:</h6>
                <p>{site.notes}</p>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Stations</h5>
              <Button variant="outline-primary" size="sm">
                <IconWrapper icon={FaMapMarkerAlt} className="me-2" />
                Voir sur la carte
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>ID</th>
                    <th>Emplacement</th>
                    <th>Dernière vérification</th>
                    <th>Consommation</th>
                    <th>Statut</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {site.stations.map((station) => (
                    <tr key={station.id}>
                      <td className="fw-bold">{station.name}</td>
                      <td>{station.location}</td>
                      <td>{formatDate(station.lastCheck)}</td>
                      <td>{getConsumptionBadge(station.consumption)}</td>
                      <td>{getStatusBadge(station.status)}</td>
                      <td className="text-center">
                        <Button variant="outline-primary" size="sm" className="me-2">
                          <IconWrapper icon={FaClipboardList} className="me-1" />
                          Détails
                        </Button>
                        <Button variant="outline-success" size="sm">
                          <IconWrapper icon={FaCamera} className="me-1" />
                          Photos
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Carte du site</h5>
            </Card.Header>
            <Card.Body className="text-center">
              <div className="bg-light p-5 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                <div className="text-muted">
                  <IconWrapper icon={FaMapMarkerAlt} size={32} className="mb-2" />
                  <p>Carte du site</p>
                  <p className="small">(Simulée pour la démonstration)</p>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Historique des interventions</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                {site.interventions.map((intervention) => (
                  <a key={intervention.id} href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">{formatDate(intervention.date)}</h6>
                      <small>{intervention.type}</small>
                    </div>
                    <p className="mb-1">Technicien: {intervention.technician}</p>
                    <small className="text-muted">{intervention.notes}</small>
                  </a>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SiteDetails;
