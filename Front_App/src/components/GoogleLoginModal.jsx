import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

function GoogleLoginModal() {
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false);
      };
    
      return (
        <>
          <Modal show={show} onHide={handleClose} className="mt-5 pt-5">
            <Modal.Header closeButton>
              <Modal.Title>Processing...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>First time here!</p>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </>
      )
}

export default GoogleLoginModal