import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export const DeleteDestinationModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color={'danger'} outline onClick={toggle}>
        Delete destination
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this destination ?
          {
            props.destination.alert_rules.length > 0 && (
              <div>
                <p>Destination is used in the following alert rules:</p>
                <ul>
                  {props.destination.alert_rules.map((rule, index) => {
                    return <li key={index}>{alert_rule.label}</li>
                  })}
                </ul>
              </div>
            )
          }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{' '}
          <Button color="danger" onClick={async () => {
            await props.remove();
            toggle();
          }}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
