import React from 'react'
import { Nav } from 'react-bootstrap'
import KSpinner from '../spinner/spinner'

export default function AppMenuItems(props) {
    return <>
            {
            props.page === 'app' && !props.userNotAuth &&
            <Nav.Link href={'#'} onClick={props.userProfileClickHandler}>
                {props.authUser?.displayName || props.authUser?.email}
                {!props.authChecked && <KSpinner /> }
            </Nav.Link>
            }
            {
            props.page === 'app' && props.userNotAuth &&
            <Nav.Link href={'#'} onClick={props.loginMenuClickHandler}>
                Entrar
            </Nav.Link>
            }
        </>
}