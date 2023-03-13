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
import {api} from "../../../api";
import {DestinationForm} from "../DestinationForm";
import {ButtonUnderline} from "../../../components/ButtonUnderline";

function CreateDestinationModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const createDestination = async (values) => {
    const {data} = await api.destination.create(values)
    props.refetch()
  }

  return (
    <div>
      <ButtonUnderline onClick={toggle}>
        Add destination
      </ButtonUnderline>
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
          await createDestination(values)
        }}>
        {(formik) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Destination</ModalHeader>
            <ModalBody>
              <DestinationForm formik={formik}/>
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

export default CreateDestinationModal;
