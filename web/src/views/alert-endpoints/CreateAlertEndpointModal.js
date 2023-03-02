import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {Formik} from "formik";
import * as yup from "yup";
import {api} from "../../api";
import {AlertEndpointForm} from "./AlertEndpointForm";

function CreateAlertEndpointModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const createAlertEndpoint = async (values) => {
    const {data} = await api.alertEndpoint.create(values)
    props.refetch()
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Add a new alert endpoint
      </Button>
      <Formik
        initialValues={{
          email: "",
          label: "",
          webhook_url: "",
        }}
        validationSchema={yup.object().shape({
          email: yup.string().optional(),
          label: yup.string().required("Required"),
          webhook_url: yup.string().optional(),
        })}
        onSubmit={async (values) => {
          await createAlertEndpoint(values)
        }}>
        {(formik) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Alert Endpoint</ModalHeader>
            <ModalBody>
              <AlertEndpointForm formik={formik}/>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>{' '}
              <Button color="primary" onClick={() => {
                formik.handleSubmit()
                toggle()
              }}>
                Create
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Formik>
    </div>
  );
}

export default CreateAlertEndpointModal;
