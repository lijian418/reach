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
import {AiOutlineUsergroupAdd} from "react-icons/ai";

function CreateTeamModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const createTeam = async (values) => {
    const {data} = await api.team.create(values)
    props.refetch()
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        <AiOutlineUsergroupAdd/> Add a new team
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
          await createTeam(values)
        }}>
        {(formik) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Team</ModalHeader>
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
                Create
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Formik>
    </div>
  );
}

export default CreateTeamModal;
