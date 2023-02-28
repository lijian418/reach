import React, {useEffect, useState} from 'react';
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
import {TagForm} from "./TagForm";

function EditTagModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const editTag = async (values) => {
    const {data} = await api.tag.update(props.tag.id, {
      slug: values.slug,
      channel_id: props.channel.id
    })
    props.refetch()
  }

  return (
    <div>
      {
        props.channel && props.tag && (
          <div>
            <Button color="primary" onClick={toggle}>
              Edit
            </Button>
            <Formik
              initialValues={{
                slug: props.tag.slug,
              }}
              validationSchema={yup.object().shape({
                slug: yup.string().required('Required'),
              })}
              onSubmit={async (values) => {
                await editTag(values)
              }}>
              {(formik) => (
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Edit {props.tag.slug} Tag</ModalHeader>
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

export default EditTagModal;
