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
import {AlertRouteForm} from "./AlertRouteForm";
import {AsyncPaginate} from "react-select-async-paginate";

function AssignAlertRouteModal(props) {
  const [modal, setModal] = useState(false);
  const [alertRoute, setAlertRoute] = useState()

  const toggle = () => setModal(!modal);

  async function loadOptions(search, loadedOptions) {
    const {data} = await api.alertRoute.find({
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
        <ModalHeader toggle={toggle}>Assign Alert Route</ModalHeader>
        <ModalBody>
          <AsyncPaginate
            value={alertRoute}
            loadOptions={loadOptions}
            onChange={setAlertRoute}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{' '}
          <Button color="primary" onClick={() => {
            props.callbackAssign(alertRoute)
            toggle()
          }}>
            Assign
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AssignAlertRouteModal;
