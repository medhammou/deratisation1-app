import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClipboardList, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import IconWrapper from '../components/IconWrapper';

/**
 * Page Dashboard pour l'application web
 * Affiche le tableau de bord principal avec les statistiques et informations importantes
 * 
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  // Données simulées pour le tableau de bord
  const stats = {
    sites: 12,
    stations: 156,
    activeStations: 142,
    inactiveStations: 14,
    highConsumption: 23,
    mediumConsumption: 48,
    lowConsumption: 71,
    noConsumption: 14,
    recentInterventions: 34,
    pendingInterventions: 8,
  };

  return (
    <Container fluid>
      <h1 className="mb-4">Tableau de bord</h1>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <IconWrapper icon={FaMapMarkerAlt} size={24} className="text-primary" />
              </div>
              <div>
                <h6 className="mb-0 text-muted">Sites</h6>
                <h2 className="mb-0">{stats.sites}</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <IconWrapper icon={FaClipboardList} size={24} className="text-success" />
              </div>
              <div>
                <h6 className="mb-0 text-muted">Stations</h6>
                <h2 className="mb-0">{stats.stations}</h2>
                <small className="text-success">{stats.activeStations} actives</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                <IconWrapper icon={FaExclamationTriangle} size={24} className="text-warning" />
              </div>
              <div>
                <h6 className="mb-0 text-muted">Consommation élevée</h6>
                <h2 className="mb-0">{stats.highConsumption}</h2>
                <small className="text-warning">Nécessite attention</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                <IconWrapper icon={FaCheckCircle} size={24} className="text-info" />
              </div>
              <div>
                <h6 className="mb-0 text-muted">Interventions récentes</h6>
                <h2 className="mb-0">{stats.recentInterventions}</h2>
                <small className="text-info">7 derniers jours</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Activité par site</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-5">
                <p className="text-muted">Graphique d'activité par site</p>
                <p className="text-muted small">(Données simulées pour la démonstration)</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Répartition des consommations</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-4">
                <p className="text-muted">Graphique de répartition</p>
                <p className="text-muted small">(Données simulées pour la démonstration)</p>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Élevée</span>
                  <span className="text-danger">{stats.highConsumption} stations</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Moyenne</span>
                  <span className="text-warning">{stats.mediumConsumption} stations</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Faible</span>
                  <span className="text-success">{stats.lowConsumption} stations</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Aucune</span>
                  <span className="text-muted">{stats.noConsumption} stations</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Interventions à planifier</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-4">
                <h3 className="text-warning">{stats.pendingInterventions}</h3>
                <p className="text-muted">stations nécessitent une intervention</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Stations inactives</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-4">
                <h3 className="text-danger">{stats.inactiveStations}</h3>
                <p className="text-muted">stations sont actuellement inactives</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
