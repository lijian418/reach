import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, FormGroup, Col, Label, Input, FormFeedback, CardBody,
} from 'reactstrap';
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as yup from "yup";
import {api} from "../../../api";
import {DestinationForm} from "../DestinationForm";
import {ClickableCard} from "../../../components/card/ClickableCard";
import {CardWrapper} from "../../../components/card/CardWrapper";
import {CircleIcon} from "../../../components/card/CircleIcon";
import {MdEmail} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";

function DestinationEmailModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const updateDestination = async (values) => {
    const {data} = await api.destination.update(props.destination.id, {
      "emails": values.emails,
    })
    props.refetch()
  }

  return (
    <div>
      <ClickableCard onClick={toggle}>
        <CardBody>
          <CardWrapper>
            <div className={'d-flex gap-3 flex-wrap'}>
              <CircleIcon>
                <MdEmail/>
              </CircleIcon>
              <div>
                <h6>Emails</h6>
                {
                  props.destination.emails.length === 0 &&
                  <p className={'text-muted mb-0'}>No emails set</p>
                }
                {
                  props.destination.emails.length > 0 && (
                    <div className={'d-flex gap-1'}>
                      <p className={'text-muted mb-0'}>Emails assigned - </p>
                      <p className={'text-muted mb-0'}>{props.destination.emails.join(', ')}</p>
                    </div>
                  )
                }
              </div>
            </div>
            <div>
              <AiFillEdit/>
            </div>
          </CardWrapper>
        </CardBody>
      </ClickableCard>
      <Formik
        initialValues={{
          emails: props.destination.emails.length === 0 ? [''] : props.destination.emails,
        }}
        validationSchema={yup.object().shape({
          emails: yup.array().of(yup.string()),
        })}
        onSubmit={async (values) => {
          await updateDestination(values)
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
                                style={{width: '300px'}}
                                type="text"
                                name={`emails[${index}]`}
                                tag={Field}
                              />
                              <ErrorMessage name={`emails[${index}].value`}/>
                            </div>
                            <div className={'d-flex gap-2'}>
                              <Button outline
                                      color="danger"
                                      onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                              {
                                index === values.emails.length - 1 &&
                                <Button outline
                                        onClick={() => arrayHelpers.push('')}>Add</Button>
                              }
                            </div>
                          </div>
                        </div>
                      ))}
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

export default DestinationEmailModal;
