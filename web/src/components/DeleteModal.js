import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CIcon from "@coreui/icons-react";
import {cilTrash} from "@coreui/icons";

function DeleteModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color={'danger'} outline onClick={toggle}>
        {props.label ? props.label : 'Delete'}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this ?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{' '}
          <Button color="danger" onClick={async () => {
            await props.delete();
            toggle();
          }}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteModal;
