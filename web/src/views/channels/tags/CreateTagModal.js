import React, {useRef, useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {TagForm} from "./TagForm";
import {api} from "../../../api";

function CreateTagModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const createTag = async (values) => {
    const {data} = await api.tag.create(values)
    props.refetch()
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Add a tag
      </Button>
      <Formik
        initialValues={{
          slug: "",
          channel_id: props.channel.id,
        }}
        validationSchema={yup.object().shape({
          slug: yup.string().required('Required'),
          channel_id: yup.string().required('Required'),
        })}
        onSubmit={async (values) => {
          await createTag(values)
        }}>
        {(formik) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Tag</ModalHeader>
            <ModalBody>
              <TagForm formik={formik}/>
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

export default CreateTagModal;
