import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { app } from '../../engine/persistence/firebase';
import './header.css';
import KoSideMenu from './ko-side-menu';

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
    <Navbar bg={"primary"} variant='dark' expand={expand} className="ko-header">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="/assets/korra_logo.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={() => {
          setShowSideMenu(true)
        }}/>
        <KoSideMenu {...props} userNotAuth={userNotAuth} show={showSideMenu} setShowSideMenu={setShowSideMenu} />
      </Container>
    </Navbar>
  )
}

export default Header;