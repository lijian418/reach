import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {ErrorMessage, FieldArray, Form, Formik} from "formik";
import * as yup from "yup";
import {AsyncPaginate} from "react-select-async-paginate";
import {AiOutlineUserAdd} from "react-icons/ai";
import {api} from "../../../api";
import {IoAdd} from "react-icons/io5";

function TeamUserModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const addUsers = async (values) => {
    const {data} = await api.team.addUsers(props.team.id, {
      "user_ids": values.user_ids.map((user) => user.value),
    })
    props.refetch()
  }

  async function loadOptionsTeams(search, loadedOptions) {
    const {data} = await api.user.find({
      limit: 10,
      skip: loadedOptions.length
    })

    return {
      options: data.items.map((item) => {
        return (
          {
            value: item.id,
            label: item.username
          }
        )
      }),
      hasMore: loadedOptions.length < data.total
    };
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        <AiOutlineUserAdd/> Add Users
      </Button>
      <Formik
        initialValues={{
          user_ids: [""],
        }}
        validationSchema={yup.object().shape({
          user_ids: yup.array(),
        })}
        onSubmit={async (values) => {
          await addUsers(values)
        }}>
        {({ handleSubmit, values, setFieldValue}) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Users</ModalHeader>
            <ModalBody>
              <Form>
                <AsyncPaginate
                  value={values.user_ids}
                  loadOptions={loadOptionsTeams}
                  isMulti
                  closeMenuOnSelect={false}
                  onChange={(value) => {
                    setFieldValue("user_ids", value)
                  }}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>{' '}
              <Button color="primary" onClick={() => {
                handleSubmit()
                toggle()
              }}>
                <AiOutlineUserAdd/> Add
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Formik>
    </div>
  );
}

export default TeamUserModal;
