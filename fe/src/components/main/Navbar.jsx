import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';
import logo from './images/logo.png'; 

function AppNavbar() {
  const [expanded, setExpanded] = useState(false); 

  const handleToggle = () => {
    setExpanded(!expanded); 
  };

  const handleSelect = () => {
    setExpanded(false); 
  };

  return (
    <Navbar className="custom-navbar" expand="lg" expanded={expanded} sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-logo" onClick={handleSelect}>
          <img src={logo} alt="Logo" className="logo" onClick={handleSelect} />
          BRM TechNest
        </Navbar.Brand>
        <Navbar.Toggle className="navbar-toggler" onClick={handleToggle} aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/piping" onClick={handleSelect}>Piping</Nav.Link>
            <Nav.Link as={Link} to="/structural" onClick={handleSelect}>Structural</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={handleSelect}>Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
