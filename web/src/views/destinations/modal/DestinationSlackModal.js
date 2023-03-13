import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input, CardBody,
} from 'reactstrap';
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as yup from "yup";
import {api} from "../../../api";
import {ClickableCard} from "../../../components/card/ClickableCard";
import {CardWrapper} from "../../../components/card/CardWrapper";
import {CircleIcon} from "../../../components/card/CircleIcon";
import {AiFillEdit, AiFillSlackCircle} from "react-icons/ai";

function DestinationSlackModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const updateDestination = async (values) => {
    const {data} = await api.destination.update(props.destination.id, {
      "slack_urls": values.slack_urls,
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
                <AiFillSlackCircle/>
              </CircleIcon>
              <div>
                <h6>Slack URLs</h6>
                {
                  props.destination.slack_urls.length === 0 &&
                  <p className={'text-muted mb-0'}>No Slack URLs set</p>
                }

                {
                  props.destination.slack_urls.length > 0 && (
                    <div className={'d-flex gap-1'}>
                      <p className={'text-muted mb-0'}>Slack URLs assigned - </p>
                      <p className={'text-muted mb-0'}>{props.destination.slack_urls.join(', ')}</p>
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
          slack_urls: props.destination.slack_urls.length === 0 ? [""] : props.destination.slack_urls,
        }}
        validationSchema={yup.object().shape({
          slack_urls: yup.array().of(yup.string()),
        })}
        onSubmit={async (values) => {
          await updateDestination(values)
        }}>
        {({ handleSubmit, values}) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Slack URLs</ModalHeader>
            <ModalBody>
              <Form>
                <FieldArray
                  name="slack_urls"
                  render={arrayHelpers => (
                    <div>
                      {values.slack_urls.map((slack_url, index) => (
                        <div key={index}>
                          <div className={'d-flex gap-2 flex-wrap mt-2'}>
                            <div>
                              <Input
                                style={{width: '300px'}}
                                type="text"
                                name={`slack_urls[${index}]`}
                                tag={Field}
                              />
                              <ErrorMessage name={`slack_urls[${index}].value`}/>
                            </div>
                            <div className={'d-flex gap-2'}>
                              <Button outline
                                      color="danger"
                                      onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                              {
                                index === values.slack_urls.length - 1 &&
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

export default DestinationSlackModal;
