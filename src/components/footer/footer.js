import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './footer.css';

function Footer() {
  return (
    <Navbar bg="primary" variant="secondary" className='footer'>
      <Container>
        <span>
          Korra - Plataforma para corredores.
        </span>
      </Container>
    </Navbar>
  );
}

export default Footer;