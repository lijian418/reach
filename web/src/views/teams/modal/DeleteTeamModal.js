import DeleteModal from "../../../components/DeleteModal";
import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import CIcon from "@coreui/icons-react";
import {cilTrash} from "@coreui/icons";

export const DeleteTeamModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const show = () => {
    if (props.team?.channel_integrations?.length > 0) {
      return (
        <div>
          <Button color={'danger'} onClick={toggle}>
            <CIcon icon={cilTrash} size="sm"/> Delete
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Delete</ModalHeader>
            <ModalBody>
              <p>
                Before you delete this team, you must delete all the channel_integrations associated with it.
              </p>
              <ul>
                {
                  props.team.channel_integrations.map((channel_integration, index) => {
                    return <li key={index}>{channel_integration.label}</li>
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
