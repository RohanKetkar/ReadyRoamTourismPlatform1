import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Router } from "../Route/Route";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar style={{ backgroundColor: "#5045e3" }} expand="lg">
      <Container>
  
        <Navbar.Brand href="#home" style={{ color: "white" }}>
          ReadyRoam
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav
            className="mx-auto" 
            style={{ textDecoration: "none" }}
          >
            <Link
              to={Router.ABOUT}
              style={{ textDecoration: "none", color: "white", margin: "0 15px" }}
            >
              About Us
            </Link>
            <Link
              to={Router.CONTACTUS}
              style={{ textDecoration: "none", color: "white", margin: "0 15px" }}
            >
              Contact Us
            </Link>
            <Link
              to={Router.SIGNIN}
              style={{ textDecoration: "none", color: "white", margin: "0 15px" }}
            >
              Sign in
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
