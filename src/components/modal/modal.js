import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css';

function KModal(props) {

  console.log(props);
  
  return (
    <Modal show={props.show} onHide={() => {
      props.handleClose()
    }}>
        <Modal.Header closeButton>
          <Modal.Title>{props.edit ? 'Editar' : 'Adicionar'} evento</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => {
            e.preventDefault()

            console.log(e.target);

            const customEvent = new CustomEvent("saveEvent", {
              detail: {
                title: e.target.title.value,
                date: props.data.startStr,
                extendedProps: {
                  price: e.target.price.value,
                  distance: e.target.distance.value,
                  eventLink: e.target.eventLink.value,
                  equipment: e.target.equipment.checked,
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
                  <input name="price" type="number" inputMode='numeric' defaultValue={props?.edit && props.data.extendedProps.price} />
                </div>
                <div className='modal__input'>
                  <label>Distancia em KM</label>
                  <input name="distance" type="number" inputMode='numeric' defaultValue={props?.edit && props.data.extendedProps.distance} />
                </div>
                <div className='modal__input'>
                  <label>Link do Evento</label>
                  <input name="eventLink" type="text" defaultValue={props?.edit && props.data.extendedProps.eventLink} placeholder='https://www...' />
                </div>
                <div className='modal__input'>
                  <label>Requer Equip. Especial (lanterna, etc)</label>
                  <input name="equipment" type="checkbox" defaultChecked={props?.edit && props.data.extendedProps.equipment}>
                  </input>
                </div>
                <div className='modal__input'>
                  <label>Observacao</label>
                  <textarea name="observation" rows={5} defaultValue={props?.edit && props.data.extendedProps.observation}></textarea>
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer className='modal-footer__delete-btn'>
            {
              props.data?.title &&
              <Button variant="danger" type='button' onClick={() => {
                if (confirm("Tem certeza que deseja remover o evento?")) {
                  const customEvent = new CustomEvent("deleteEvent", {
                    detail: {
                      path: props.data.extendedProps.firebaseRef.path
                    }
                  })
                  window.dispatchEvent(customEvent)
                }
                }}
              >
                Remover
              </Button>
            }
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