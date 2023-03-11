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
                name: e.target.name.value,
                date: props.data.start,
                extendedProps: {
                  price: e.target.price.value,
                  data: {
                    ...props.data
                  }
                }
              }
            })
            window.dispatchEvent(customEvent);
            // props.handleConfirm(e.target.name.value, e.target.price.value, props.start)
          }}>
          <Modal.Body>
              <div className='modal__form'>
                <div className='modal__input'>
                  <label>Evento</label>
                  <input type="text" name="name" placeholder="Nome do evento..." autoFocus defaultValue={props?.edit && props.data.title} />
                </div>
                <div className='modal__input'>
                  <label>Custo em R$</label>
                  <input name="price" type="number" defaultValue={props?.edit && props.data.extendedProps.price} />
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              props.handleClose()
            }}>
              Cancelar
            </Button>
            <Button variant="primary" type='submit'>
              Salvar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
  );
}

export default KModal;