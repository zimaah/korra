import React, { useState } from 'react'
import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import './toast.css';

export default function KToast(props) {

    const body = !props.loading ? props.message : <span className='ktoast__dots'>{props.message}</span>;


    return (
        <ToastContainer position='top-end' className='ktoast'>
            <Toast bg={props.bg} animation show={props.show} delay={3000} autohide={props.autohide} onClose={() => {
                props.onClose()
            }}>
                <Toast.Header closeButton={props.closeButton}>
                    <strong className="me-auto">Korra</strong>
                </Toast.Header>
                <Toast.Body>
                    {body}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}