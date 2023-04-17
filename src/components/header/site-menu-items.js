import React from 'react'
import { Nav } from 'react-bootstrap'

export default function SiteMenuItems(props) {
    console.log(`props`, props)
    return <>
            <Nav.Link href="#app">App</Nav.Link>
            <Nav.Link href="#features" active={props.page === 'features'}>Features</Nav.Link>
            <Nav.Link href="#contato" active={props.page === 'contact'}>Contato</Nav.Link>
        </>
}