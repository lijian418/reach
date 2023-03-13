import React, {useRef, useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {ChannelForm} from "./ChannelForm";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {api} from "../../api";
import {ButtonUnderline} from "../../components/ButtonUnderline";

function CreateChannelModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const createChannel = async (values) => {
    const {data} = await api.channel.create(values)
    props.refetch()
  }

  return (
    <div>
      <ButtonUnderline onClick={toggle}>
        Add channel
      </ButtonUnderline>
      <Formik
        initialValues={{
          slug: "",
          label: "",
          description: "",
        }}
        validationSchema={yup.object().shape({
          slug: yup.string().required('Required'),
          label: yup.string().required('Required'),
          description: yup.string(),
        })}
        onSubmit={async (values) => {
          await createChannel(values)
        }}>
        {(formik) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Channel</ModalHeader>
            <ModalBody>
              <ChannelForm formik={formik}/>
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

export default CreateChannelModal;
