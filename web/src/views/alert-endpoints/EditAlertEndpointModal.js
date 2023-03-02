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

function EditAlertEndpointModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const editAlertEndpoint = async (values) => {
    const {data} = await api.alertEndpoint.update(props.alertEndpoint.id, values)
    props.refetch()
  }

  return (
    <div>
      {
        props.alertEndpoint && (
          <div>
            <Button color="primary" onClick={toggle}>
              Edit Alert Endpoint
            </Button>
            <Formik
              initialValues={{
                email: props.alertEndpoint.email,
                label: props.alertEndpoint.label,
                webhook_url: props.alertEndpoint.webhook_url
              }}
              validationSchema={yup.object().shape({
                email: yup.string().optional(),
                label: yup.string().required('Required'),
                webhook_url: yup.string().optional(),
              })}
              onSubmit={async (values) => {
                await editAlertEndpoint(values)
              }}>
              {(formik) => (
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Edit Alert Endpoint</ModalHeader>
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
                      Edit
                    </Button>
                  </ModalFooter>
                </Modal>
              )}
            </Formik>
          </div>
        )
      }
    </div>
  );
}

export default EditAlertEndpointModal;
