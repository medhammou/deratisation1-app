import React from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import { FaSave, FaUserCog, FaDatabase, FaSync, FaBell } from 'react-icons/fa';
import IconWrapper from '../components/IconWrapper';

/**
 * Page Settings pour l'application web
 * Permet de configurer les paramètres de l'application
 * 
 * @returns {JSX.Element}
 */
const Settings = () => {
  return (
    <Container fluid>
      <h1 className="mb-4">Paramètres</h1>
      
      <Row>
        <Col md={3}>
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-0">
              <Nav className="flex-column">
                <Nav.Link className="active border-start border-4 border-primary ps-3 py-3">
                  <IconWrapper icon={FaUserCog} className="me-2" />
                  Compte utilisateur
                </Nav.Link>
                <Nav.Link className="ps-3 py-3">
                  <IconWrapper icon={FaDatabase} className="me-2" />
                  Données
                </Nav.Link>
                <Nav.Link className="ps-3 py-3">
                  <IconWrapper icon={FaSync} className="me-2" />
                  Synchronisation
                </Nav.Link>
                <Nav.Link className="ps-3 py-3">
                  <IconWrapper icon={FaBell} className="me-2" />
                  Notifications
                </Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={9}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Compte utilisateur</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nom</Form.Label>
                      <Form.Control type="text" defaultValue="Admin Démo" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" defaultValue="admin@deratisation.app" readOnly />
                      <Form.Text className="text-muted">
                        L'adresse email ne peut pas être modifiée
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mot de passe actuel</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nouveau mot de passe</Form.Label>
                      <Form.Control type="password" />
                      <Form.Text className="text-muted">
                        Laissez vide pour ne pas changer
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Langue</Form.Label>
                      <Form.Select defaultValue="fr">
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fuseau horaire</Form.Label>
                      <Form.Select defaultValue="europe_paris">
                        <option value="europe_paris">Europe/Paris</option>
                        <option value="europe_london">Europe/London</option>
                        <option value="america_new_york">America/New York</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="checkbox" 
                        id="notifications" 
                        label="Recevoir des notifications par email" 
                        defaultChecked
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="d-flex justify-content-end">
                  <Button variant="primary">
                    <IconWrapper icon={FaSave} className="me-2" />
                    Enregistrer les modifications
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
