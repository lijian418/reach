import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, FormGroup, Col, Label, Input, FormFeedback,
} from 'reactstrap';
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {api} from "../../api";
import {AlertEndpointForm} from "./AlertEndpointForm";
import {AsyncPaginate} from "react-select-async-paginate";

function AssignAlertEndpointModal(props) {
  const [modal, setModal] = useState(false);
  const [alertEndpoint, setAlertEndpoint] = useState()

  const toggle = () => setModal(!modal);

  async function loadOptions(search, loadedOptions) {
    const {data} = await api.alertEndpoint.find({
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
        <ModalHeader toggle={toggle}>Assign Alert Endpoint</ModalHeader>
        <ModalBody>
          <AsyncPaginate
            value={alertEndpoint}
            loadOptions={loadOptions}
            onChange={setAlertEndpoint}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{' '}
          <Button color="primary" onClick={() => {
            props.callbackAssign(alertEndpoint)
            toggle()
          }}>
            Assign
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AssignAlertEndpointModal;
