import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Korra</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Contato</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Header;