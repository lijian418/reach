import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {ChannelForm} from "../../ChannelForm";
import {Formik} from "formik";
import * as yup from "yup";
import {api} from "../../../../api";

function EditChannelForm(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const editChannel = async (values) => {
    const {data} = await api.channel.update(props.channel.id, values)
    props.refetch()
  }

  return (
    <Formik
      initialValues={{
        slug: props.channel.slug,
        label: props.channel.label,
        description: props.channel.description,
      }}
      validationSchema={yup.object().shape({
        slug: yup.string().required('Required'),
        label: yup.string().required('Required'),
        description: yup.string(),
      })}
      onSubmit={async (values) => {
        await editChannel(values)
      }}>
      {(formik) => (
        <div>
          <ChannelForm formik={formik}/>
          <div className={'d-flex justify-content-end'}>
            <Button color="primary"
            disabled={
              !formik.dirty ||
              !formik.isValid ||
              formik.isSubmitting
            }
                    onClick={() => {
              formik.handleSubmit()
              toggle()
            }}>
              Save
            </Button>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default EditChannelForm;
