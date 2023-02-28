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

function EditChannelModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const editChannel = async (values) => {
    const {data} = await api.channels.update(props.channel.id, values)
    props.refetch()
  }

  return (
    <div>
      {
        props.channel && (
          <div>
            <Button color="primary" onClick={toggle}>
              Edit
            </Button>
            <Formik
              initialValues={{
                slug: props.channel.slug,
                label: props.channel.label
              }}
              validationSchema={yup.object().shape({
                slug: yup.string().required('Required'),
                label: yup.string().required('Required'),
              })}
              onSubmit={async (values) => {
                await editChannel(values)
              }}>
              {(formik) => (
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Edit {props.channel.label} Channel</ModalHeader>
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

export default EditChannelModal;
