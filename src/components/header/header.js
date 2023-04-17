import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { app } from '../../engine/persistence/firebase';
import SiteMenuItems from './site-menu-items';
import AppMenuItems from './app-menu-items';
import './header.css';

function Header(props) {
  const [authUser, setAuthUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
      getAuth(app).onAuthStateChanged((user) => {
        let authUser = false
        
        if (user)
          authUser = user

        setAuthUser(authUser)
        setAuthChecked(true)
      });
  }, [])

  const userNotAuth = !authUser && authChecked

  return (
    <Navbar bg="primary" variant="dark" className='header'>
      <Container>
        <Navbar.Brand href="/">Korra</Navbar.Brand>
        <Nav className="me-auto">
          { props.page !== 'app' && <SiteMenuItems page={props.page} />}
        </Nav>
        <Nav className="ms-auto">
          <AppMenuItems
            page={props.page}
            authChecked={authChecked}
            authUser={authUser}
            loginMenuClickHandler={props.loginMenuClickHandler}
            userProfileClickHandler={props.userProfileClickHandler}
            userNotAuth={userNotAuth}
          />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;