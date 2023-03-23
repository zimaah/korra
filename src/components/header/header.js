import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
  return (
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Korra</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#features" active={props.page === 'features'}>Features</Nav.Link>
            <Nav.Link href="#contato" active={props.page === 'contact'}>Contato</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Header;