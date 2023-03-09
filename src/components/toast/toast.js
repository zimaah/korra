import React from 'react'
import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import './toast.css';

export default function KToast(props) {
    console.log(props);
    return (
        <ToastContainer position='top-end'>
            <Toast bg={props.bg} animation show={props.show} delay={3000} autohide={props.autohide} onClose={() => {
                props.onClose()
            }}>
                <Toast.Header closeButton={props.closeButton}>
                    <strong className="me-auto">Korra</strong>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}