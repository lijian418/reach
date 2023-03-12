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
import {TeamForm} from "../TeamForm";

function EditTeamModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const editTeam = async (values) => {
    const {data} = await api.team.update(props.team.id, values)
    props.refetch()
  }

  return (
    <div>
      {
        props.team && (
          <div>
            <Button color="primary" onClick={toggle}>
              Edit Team
            </Button>
            <Formik
              initialValues={{
                email: props.team.email,
                label: props.team.label,
                webhook_url: props.team.webhook_url
              }}
              validationSchema={yup.object().shape({
                email: yup.string().optional(),
                label: yup.string().required('Required'),
                webhook_url: yup.string().optional(),
              })}
              onSubmit={async (values) => {
                await editTeam(values)
              }}>
              {(formik) => (
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Edit Team</ModalHeader>
                  <ModalBody>
                    <TeamForm formik={formik}/>
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

export default EditTeamModal;
