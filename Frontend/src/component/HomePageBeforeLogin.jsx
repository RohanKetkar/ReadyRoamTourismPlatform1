import React from "react";
import { Container, Carousel, Row, Col,  Card, Badge } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";


function Home() {
  return (
    <div>
      <NavigationBar />
      <Container fluid className="bg-light py-5 text-center ">
        <h1 className="display-4 mb-3">Pack Your Bags, We've Done the Rest!</h1>
        <p className="lead text-muted mb-4">Your Gateway to Unforgettable Adventures</p>
      </Container>

      
      <Container className="my-5">
        <Carousel variant="dark" className="shadow-lg rounded">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/Images/carousel6.jpg"
              alt="Scenic view of mountains"
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/Images/carousel5.jpg"
              alt="Tropical beach with trees"
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/Images/carousel7.jpg"
              alt="Sunset view"
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
            </Carousel.Item>
        </Carousel>
      </Container>
      <Container className="my-5">
        <Row className="align-items-center g-4">
          <Col md={6} className="text-center">
            <img
              src="/Images/carousel4.jpg"
              alt="Travel illustration"
              className="img-fluid rounded shadow-lg"
            />
          </Col>
          <Col md={6}>
            <Card className="border-0">
              <Card.Body>
                <Card.Title as="h2" className="mb-4">Discover Amazing Places</Card.Title>
                <Card.Text>
                  ReadyRoam helps you explore the world like never before! Enjoy curated travel experiences, personalized itineraries, and seamless planning.
                </Card.Text>
                <div className="mb-4">
                  <h5>Our Features:</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Badge bg="primary" className="me-2">✓</Badge>
                      Customized travel packages
                    </li>
                    <li className="mb-2">
                      <Badge bg="primary" className="me-2">✓</Badge>
                      Exclusive deals on flights and hotels
                    </li>
                    <li className="mb-2">
                      <Badge bg="primary" className="me-2">✓</Badge>
                      24/7 customer support
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="my-5 bg-light py-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <Card className="border-0 bg-transparent">
              <Card.Body>
                <Card.Title as="h2" className="mb-4">Embark on Your Next Adventure</Card.Title>
                <Card.Text>
                  At ReadyRoam, we believe every journey tells a story. From awe-inspiring landscapes to vibrant cultural experiences, we offer unforgettable travel adventures designed just for you.
                </Card.Text>
                <div className="mb-4">
                  <h5>Why Choose ReadyRoam?</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Badge bg="success" className="me-2">✓</Badge>
                      Explore hidden gems off the beaten path
                    </li>
                    <li className="mb-2">
                      <Badge bg="success" className="me-2">✓</Badge>
                      Expert local guides for authentic experiences
                    </li>
                    <li className="mb-2">
                      <Badge bg="success" className="me-2">✓</Badge>
                      Seamless travel planning and support
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="text-center">
            <img
              src="/Images/carousel1.jpeg"
              alt="Travel illustration"
              className="img-fluid rounded shadow-lg"
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
    
  );
}

export default Home; 
