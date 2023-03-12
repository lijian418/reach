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

function TeamWebhookModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const updateTeam = async (values) => {
    const {data} = await api.team.update(props.team.id, {
      "webhook_urls": values.webhook_urls,
    })
    props.refetch()
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Edit Webhook URLs
      </Button>
      <Formik
        initialValues={{
          webhook_urls: props.team.webhook_urls.length === 0 ? [""] : props.team.webhook_urls,
        }}
        validationSchema={yup.object().shape({
          webhook_urls: yup.array().of(yup.string()),
        })}
        onSubmit={async (values) => {
          await updateTeam(values)
        }}>
        {({ handleSubmit, values}) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Webhook URLs</ModalHeader>
            <ModalBody>
              <Form>
                <FieldArray
                  name="webhook_urls"
                  render={arrayHelpers => (
                    <div>
                      {values.webhook_urls.map((webhook_url, index) => (
                        <div key={index}>
                          <div className={'d-flex gap-2 flex-wrap mt-2'}>
                            <div>
                              <Input
                                style={{width: '250px'}}
                                type="text"
                                name={`webhook_urls[${index}]`}
                                tag={Field}
                              />
                              <ErrorMessage name={`webhook_urls[${index}].value`}/>
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

export default TeamWebhookModal;
