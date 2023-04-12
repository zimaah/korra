import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { app } from '../../engine/persistence/firebase';
import KSpinner from '../spinner/spinner';
import GenericModal from '../modal/generic-modal';

function Header(props) {
  const [authUser, setAuthUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
      getAuth(app).onAuthStateChanged((user) => {
          setAuthUser(user)
          setAuthChecked(true)
      });
  }, [])

  const userNotAuth = !authUser && authChecked

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Korra</Navbar.Brand>
        <Nav className="me-auto">
          {
            props.page !== 'app' &&
            <>
              <Nav.Link href="#app" active={props.page === 'app'}>App</Nav.Link>
              <Nav.Link href="#features" active={props.page === 'features'}>Features</Nav.Link>
              <Nav.Link href="#contato" active={props.page === 'contact'}>Contato</Nav.Link>
            </>
          }
        </Nav>
        <Nav className="ms-auto">
          {
            props.page === 'app' && !userNotAuth &&
            <Nav.Link href={'#'} onClick={props.userProfileClickHandler}>
              {authUser?.displayName || authUser?.email}
              {!authChecked && <KSpinner /> }
            </Nav.Link>
          }
          {
            props.page === 'app' && userNotAuth &&
            <Nav.Link href={'#'} onClick={props.loginMenuClickHandler}>
              Entrar
            </Nav.Link>
          }
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;