import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#212529", color: "#fff", padding: "20px 0" }}>
      <Container>
        <Row>
          <Col md={3}>
            <h5>Contact</h5>
            <p>123 Travel St, Wanderlust City</p>
            <p>travelwithus@gmail.com</p>
            <p>+91 7397813461</p>
            <p>+91 8238825495</p>
          </Col>
          <Col md={3}>
            <h5>Destinations</h5>
            <ul className="list-unstyled">
              <li>Paris</li>
              <li>New York</li>
              <li>Tokyo</li>
              <li>Maldives</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Experiences</h5>
            <ul className="list-unstyled">
              <li>Adventure</li>
              <li>Relaxation</li>
              <li>Cultural Tours</li>
              <li>Beach Holidays</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Social Media</h5>
            <div className="d-flex">
              <FaInstagram className="me-3 mb-2" style={{ fontSize: "20px" }} />
              <FaFacebook className="me-3 mb-2" style={{ fontSize: "20px" }} />
              <FaLinkedin className="me-3 mb-2" style={{ fontSize: "20px" }} />
              <FaYoutube className="me-3 mb-2" style={{ fontSize: "20px" }} />
              <FaTwitter className="me-3 mb-2" style={{ fontSize: "20px" }} />
            </div>
          </Col>
        </Row>
        <hr style={{ backgroundColor: "#fff", opacity: 0.2 }} />
        <p className="text-center">
          &copy; 2024 Travel With Us. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
