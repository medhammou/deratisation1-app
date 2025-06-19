import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Table } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClipboardList, FaCamera, FaHistory, FaEdit, FaExclamationTriangle } from 'react-icons/fa';
import IconWrapper from '../components/IconWrapper';

/**
 * Page StationDetails pour l'application web
 * Affiche les détails d'une station spécifique
 * 
 * @returns {JSX.Element}
 */
const StationDetails = () => {
  // Données simulées pour la station
  const station = {
    id: 1,
    name: 'ST-001',
    site: 'Centre Commercial Grand Place',
    location: 'Entrée principale',
    coordinates: { lat: 48.8584, lng: 2.2945 },
    installDate: '2024-12-15',
    lastCheck: '2025-06-05',
    nextCheck: '2025-07-05',
    status: 'active',
    consumption: 'high',
    type: 'Poste d\'appâtage sécurisé',
    notes: 'Station située près de l\'entrée principale, zone à fort passage. Consommation régulièrement élevée.',
    interventions: [
      { id: 1, date: '2025-06-05', technician: 'Pierre Martin', type: 'Inspection régulière', consumption: 'high', notes: 'Appât presque entièrement consommé, rechargé complètement' },
      { id: 2, date: '2025-05-05', technician: 'Pierre Martin', type: 'Inspection régulière', consumption: 'medium', notes: 'Consommation moyenne, rechargé partiellement' },
      { id: 3, date: '2025-04-05', technician: 'Sophie Dubois', type: 'Inspection régulière', consumption: 'high', notes: 'Forte activité, rechargé complètement' },
    ],
    photos: [
      { id: 1, date: '2025-06-05', thumbnail: 'photo1_thumb.jpg', url: 'photo1.jpg', caption: 'État de la station après intervention' },
      { id: 2, date: '2025-05-05', thumbnail: 'photo2_thumb.jpg', url: 'photo2.jpg', caption: 'Traces d\'activité' },
    ]
  };

  // Fonction pour déterminer la couleur du badge de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'warning':
        return <Badge bg="warning">Attention requise</Badge>;
      case 'inactive':
        return <Badge bg="danger">Inactive</Badge>;
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
        <div>
          <h1>{station.name}</h1>
          <p className="text-muted mb-0">{station.site} - {station.location}</p>
        </div>
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
                  <p><strong>Site:</strong> {station.site}</p>
                  <p><strong>Emplacement:</strong> {station.location}</p>
                  <p><strong>Type:</strong> {station.type}</p>
                  <p><strong>Date d'installation:</strong> {formatDate(station.installDate)}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Statut:</strong> {getStatusBadge(station.status)}</p>
                  <p><strong>Consommation:</strong> {getConsumptionBadge(station.consumption)}</p>
                  <p><strong>Dernière vérification:</strong> {formatDate(station.lastCheck)}</p>
                  <p><strong>Prochaine vérification:</strong> {formatDate(station.nextCheck)}</p>
                </Col>
              </Row>
              <div className="mt-3">
                <h6>Notes:</h6>
                <p>{station.notes}</p>
              </div>
              
              {station.consumption === 'high' && (
                <div className="alert alert-warning d-flex align-items-center mt-3">
                  <IconWrapper icon={FaExclamationTriangle} className="me-2" />
                  <div>
                    <strong>Attention:</strong> Cette station présente une consommation élevée. Une surveillance accrue est recommandée.
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Historique des interventions</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Date</th>
                    <th>Technicien</th>
                    <th>Type</th>
                    <th>Consommation</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {station.interventions.map((intervention) => (
                    <tr key={intervention.id}>
                      <td>{formatDate(intervention.date)}</td>
                      <td>{intervention.technician}</td>
                      <td>{intervention.type}</td>
                      <td>{getConsumptionBadge(intervention.consumption)}</td>
                      <td>{intervention.notes}</td>
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
              <h5 className="mb-0">Localisation</h5>
            </Card.Header>
            <Card.Body className="text-center">
              <div className="bg-light p-5 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                <div className="text-muted">
                  <IconWrapper icon={FaMapMarkerAlt} size={32} className="mb-2" />
                  <p>Carte de localisation</p>
                  <p className="small">(Simulée pour la démonstration)</p>
                </div>
              </div>
              <div className="mt-3 text-start">
                <p className="mb-1"><strong>Coordonnées:</strong></p>
                <p className="mb-0">Latitude: {station.coordinates.lat}</p>
                <p>Longitude: {station.coordinates.lng}</p>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Photos</h5>
              <Button variant="outline-primary" size="sm">
                <IconWrapper icon={FaCamera} className="me-2" />
                Ajouter
              </Button>
            </Card.Header>
            <Card.Body>
              <Row>
                {station.photos.map((photo) => (
                  <Col md={6} key={photo.id} className="mb-3">
                    <Card>
                      <div className="bg-light p-3 d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
                        <IconWrapper icon={FaCamera} size={24} />
                      </div>
                      <Card.Body className="p-2">
                        <small className="d-block text-muted">{formatDate(photo.date)}</small>
                        <small>{photo.caption}</small>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StationDetails;
