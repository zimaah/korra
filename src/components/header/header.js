import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { app } from '../../engine/persistence/firebase';
import './header.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SiteMenuItems from './site-menu-items';
import AppMenuItems from './app-menu-items';

function Header(props) {
  const [authUser, setAuthUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [showSideMenu, setShowSideMenu] = useState(false)

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
  const expand = false

  return (
    <Navbar bg={"primary"} variant='dark' expand={expand} className="header">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="/assets/korra_logo.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={() => {
          setShowSideMenu(true)
        }}/>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          className={"ko-side-menu"}
          show={showSideMenu}
        >
          <Offcanvas.Header>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              <img src="/assets/korra_logo.png" />
            </Offcanvas.Title>
            <div class="close" onClick={() => {
              setShowSideMenu(false)
            }}></div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              { props.page !== 'app' && <SiteMenuItems page={props.page} />}
              <AppMenuItems
                page={props.page}
                authChecked={authChecked}
                authUser={authUser}
                loginMenuClickHandler={props.loginMenuClickHandler}
                userProfileClickHandler={props.userProfileClickHandler}
                userNotAuth={userNotAuth}
              />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Header;