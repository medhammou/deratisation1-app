import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaChartBar, FaFilePdf, FaFileExcel, FaCalendarAlt } from 'react-icons/fa';
import IconWrapper from '../components/IconWrapper';

/**
 * Page Reports pour l'application web
 * Permet de générer et visualiser les rapports d'activité
 * 
 * @returns {JSX.Element}
 */
const Reports = () => {
  return (
    <Container fluid>
      <h1 className="mb-4">Rapports</h1>
      
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Générer un rapport</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Type de rapport</Form.Label>
                      <Form.Select>
                        <option>Rapport d'activité par site</option>
                        <option>Rapport de consommation</option>
                        <option>Rapport d'interventions</option>
                        <option>Rapport de stations inactives</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Site</Form.Label>
                      <Form.Select>
                        <option>Tous les sites</option>
                        <option>Centre Commercial Grand Place</option>
                        <option>Entrepôt Logistique Nord</option>
                        <option>Restaurant La Bonne Fourchette</option>
                        <option>Hôpital Saint-Pierre</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Période du</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>au</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Format</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          name="format"
                          id="format-pdf"
                          label="PDF"
                          defaultChecked
                        />
                        <Form.Check
                          inline
                          type="radio"
                          name="format"
                          id="format-excel"
                          label="Excel"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="d-flex align-items-end">
                    <Button variant="primary" className="w-100">
                      <IconWrapper icon={FaChartBar} className="me-2" />
                      Générer le rapport
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Rapports récents</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-danger bg-opacity-10 p-2 me-3">
                      <IconWrapper icon={FaFilePdf} className="text-danger" />
                    </div>
                    <div>
                      <h6 className="mb-0">Rapport d'activité - Tous les sites</h6>
                      <small className="text-muted d-flex align-items-center">
                        <IconWrapper icon={FaCalendarAlt} size={12} className="me-1" />
                        10/06/2025
                      </small>
                    </div>
                  </div>
                  <Button variant="outline-primary" size="sm">Télécharger</Button>
                </a>
                
                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-success bg-opacity-10 p-2 me-3">
                      <IconWrapper icon={FaFileExcel} className="text-success" />
                    </div>
                    <div>
                      <h6 className="mb-0">Rapport de consommation - Centre Commercial Grand Place</h6>
                      <small className="text-muted d-flex align-items-center">
                        <IconWrapper icon={FaCalendarAlt} size={12} className="me-1" />
                        05/06/2025
                      </small>
                    </div>
                  </div>
                  <Button variant="outline-primary" size="sm">Télécharger</Button>
                </a>
                
                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-danger bg-opacity-10 p-2 me-3">
                      <IconWrapper icon={FaFilePdf} className="text-danger" />
                    </div>
                    <div>
                      <h6 className="mb-0">Rapport d'interventions - Hôpital Saint-Pierre</h6>
                      <small className="text-muted d-flex align-items-center">
                        <IconWrapper icon={FaCalendarAlt} size={12} className="me-1" />
                        01/06/2025
                      </small>
                    </div>
                  </div>
                  <Button variant="outline-primary" size="sm">Télécharger</Button>
                </a>
                
                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-danger bg-opacity-10 p-2 me-3">
                      <IconWrapper icon={FaFilePdf} className="text-danger" />
                    </div>
                    <div>
                      <h6 className="mb-0">Rapport de stations inactives - Tous les sites</h6>
                      <small className="text-muted d-flex align-items-center">
                        <IconWrapper icon={FaCalendarAlt} size={12} className="me-1" />
                        28/05/2025
                      </small>
                    </div>
                  </div>
                  <Button variant="outline-primary" size="sm">Télécharger</Button>
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
