import DeleteModal from "../../components/DeleteModal";
import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import CIcon from "@coreui/icons-react";
import {cilTrash} from "@coreui/icons";

export const DeleteAlertEndpointModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const show = () => {
    if (props.alertEndpoint?.alarms?.length > 0) {
      return (
        <div>
          <Button color={'danger'} onClick={toggle}>
            <CIcon icon={cilTrash} size="sm"/> Delete
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Delete</ModalHeader>
            <ModalBody>
              <p>
                Before you delete this alert endpoint, you must delete all the alarms associated with it.
              </p>
              <ul>
                {
                  props.alertEndpoint.alarms.map((alarm, index) => {
                    return <li key={index}>{alarm.label}</li>
                  })
                }
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )
    } else {
      return <DeleteModal delete={props.delete} />
    }
  }

  return show()
}
