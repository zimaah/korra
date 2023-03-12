import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css';

function KModal(props) {
  
  return (
    <Modal show={props.show} onHide={() => {
      props.handleClose()
    }}>
        <Modal.Header closeButton>
          <Modal.Title>{props.edit ? 'Editar' : 'Adicionar'} evento</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => {
            e.preventDefault()

            const customEvent = new CustomEvent("saveEvent", {
              detail: {
                title: e.target.title.value,
                date: props.data.startStr,
                extendedProps: {
                  price: e.target.price.value,
                  firebaseId: props.data?.extendedProps?.firebaseId,
                  firebaseRef: props.data?.extendedProps?.firebaseRef
                }
              }
            })
            window.dispatchEvent(customEvent);
          }}>
          <Modal.Body>
              <div className='modal__form'>
                <div className='modal__input'>
                  <label>Evento</label>
                  <input type="text" name="title" placeholder="Nome do evento..." autoFocus defaultValue={props?.edit && props.data.title} />
                </div>
                <div className='modal__input'>
                  <label>Custo em R$</label>
                  <input name="price" type="number" defaultValue={props?.edit && props.data.extendedProps.price} />
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer className='modal-footer__delete-btn'>
            <Button variant="danger" type='button' onClick={() => {
                  if (confirm("Tem certeza que deseja remover o evento?")) {
                    console.log("removendo...", props.data);
                    const customEvent = new CustomEvent("deleteEvent", {
                      detail: {
                        path: props.data.extendedProps.firebaseRef.path
                      }
                    })
                    window.dispatchEvent(customEvent)
                  }
                }}>
              Remover
            </Button>
            <div className='modal-footer__right'>
              <Button id="cancel-btn" variant="secondary" onClick={() => {
                props.handleClose()
              }}>
                Cancelar
              </Button>
              <Button variant="primary" type='submit'>
                Salvar
              </Button>
            </div>
          </Modal.Footer>
        </form>
    </Modal>
  );
}

export default KModal;