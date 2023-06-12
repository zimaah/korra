import React, { useState } from 'react'
import { Nav, Offcanvas } from "react-bootstrap"
import AppMenuItems from "./app-menu-items"
import SiteMenuItems from "./site-menu-items"

export default function KoSideMenu(props) {

    return (
        <Offcanvas
          placement="end"
          className={"ko-side-menu"}
          show={props.show}
          onHide={() => {
            props.setShowSideMenu(false)
          }}
          style={{marginTop: "66px"}}
        >
          <Offcanvas.Header closeButton closeVariant='white'>
            <Offcanvas.Title>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              { props.page !== 'app' && <SiteMenuItems page={props.page} />}
              <AppMenuItems
                page={props.page}
                authChecked={props.authChecked}
                authUser={props.authUser}
                loginMenuClickHandler={props.loginMenuClickHandler}
                userProfileClickHandler={props.userProfileClickHandler}
                userNotAuth={props.userNotAuth}
              />
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
    )
}