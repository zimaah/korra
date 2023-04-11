import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function GenericModal(props) {
  return (
    <Modal centered show={props.show} onHide={props.onHideHandler} size='lg'>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.body}
        </Modal.Body>

        <Modal.Footer>
          {props.btnLabel && <Button variant="primary" onClick={props.btnClickHandler}>{props.btnLabel}</Button>}
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

export default GenericModal;