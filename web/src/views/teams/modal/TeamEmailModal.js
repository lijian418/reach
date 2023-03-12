import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, FormGroup, Col, Label, Input, FormFeedback,
} from 'reactstrap';
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as yup from "yup";
import {api} from "../../../api";
import {TeamForm} from "../TeamForm";

function TeamEmailModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const updateTeam = async (values) => {
    const {data} = await api.team.update(props.team.id, {
      "emails": values.emails,
    })
    props.refetch()
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Edit Emails
      </Button>
      <Formik
        initialValues={{
          emails: props.team.emails.length === 0 ? [""] : props.team.emails,
        }}
        validationSchema={yup.object().shape({
          emails: yup.array().of(yup.string()),
        })}
        onSubmit={async (values) => {
          await updateTeam(values)
        }}>
        {({ handleSubmit, values}) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Emails</ModalHeader>
            <ModalBody>
              <Form>
                <FieldArray
                  name="emails"
                  render={arrayHelpers => (
                    <div>
                      {values.emails.map((email, index) => (
                        <div key={index}>
                          <div className={'d-flex gap-2 flex-wrap mt-2'}>
                            <div>
                              <Input
                                style={{width: '250px'}}
                                type="text"
                                name={`emails[${index}]`}
                                tag={Field}
                              />
                              <ErrorMessage name={`emails[${index}].value`}/>
                            </div>
                            <div>
                              <Button onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className={'d-flex flex-wrap gap-2 mt-2'}>
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          + Add
                        </Button>
                      </div>
                    </div>
                  )}
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
                Save
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Formik>
    </div>
  );
}

export default TeamEmailModal;