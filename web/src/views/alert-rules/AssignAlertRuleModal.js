import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {api} from "../../api";
import {AsyncPaginate} from "react-select-async-paginate";

function AssignAlertRuleModal(props) {
  const [modal, setModal] = useState(false);
  const [alertRule, setAlertRule] = useState()

  const toggle = () => setModal(!modal);

  async function loadOptions(search, loadedOptions) {
    const {data} = await api.alertRule.find({
      limit: 10,
      skip: loadedOptions.length
    })

    return {
      options: data.items.map((item) => {
        if (!props.alreadyAssigned.includes(item.id)) {
          return (
            {
              value: item.id,
              label: item.label,
            }
          )
        } else {
          return (
            {
              value: item.id,
              label: item.label + " - Already Assigned",
              isDisabled: true
            }
          )
        }
      }),
      hasMore: loadedOptions.length < data.total
    };
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Assign
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Assign Alert Rule</ModalHeader>
        <ModalBody>
          <AsyncPaginate
            value={alertRule}
            loadOptions={loadOptions}
            onChange={setAlertRule}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{' '}
          <Button color="primary" onClick={() => {
            props.callbackAssign(alertRule)
            toggle()
          }}>
            Assign
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AssignAlertRuleModal;
