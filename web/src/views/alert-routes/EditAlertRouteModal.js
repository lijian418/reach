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
import {AlertRouteForm} from "./AlertRouteForm";

function EditAlertRouteModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const editAlertRoute = async (values) => {
    const {data} = await api.alertRoute.update(props.alertRoute.id, values)
    props.refetch()
  }

  return (
    <div>
      {
        props.alertRoute && (
          <div>
            <Button color="primary" onClick={toggle}>
              Edit Alert Route
            </Button>
            <Formik
              initialValues={{
                email: props.alertRoute.email,
                label: props.alertRoute.label,
                webhook_url: props.alertRoute.webhook_url
              }}
              validationSchema={yup.object().shape({
                email: yup.string().optional(),
                label: yup.string().required('Required'),
                webhook_url: yup.string().optional(),
              })}
              onSubmit={async (values) => {
                await editAlertRoute(values)
              }}>
              {(formik) => (
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Edit Alert Route</ModalHeader>
                  <ModalBody>
                    <AlertRouteForm formik={formik}/>
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

export default EditAlertRouteModal;
