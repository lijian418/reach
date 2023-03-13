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
import {MdEmail, MdWebhook} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";

function DestinationWebhookModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const updateDestination = async (values) => {
    const {data} = await api.destination.update(props.destination.id, {
      "webhook_urls": values.webhook_urls,
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
                <MdWebhook/>
              </CircleIcon>
              <div>
                <h6>Webhook URLs</h6>
                {
                  props.destination.webhook_urls.length === 0 &&
                  <p className={'text-muted mb-0'}>No webhooks set</p>
                }

                {
                  props.destination.webhook_urls.length > 0 && (
                    <div className={'d-flex gap-1'}>
                      <p className={'text-muted mb-0'}>Webhooks assigned - </p>
                      <p className={'text-muted mb-0'}>{props.destination.webhook_urls.join(', ')}</p>
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
          webhook_urls: props.destination.webhook_urls.length === 0 ? [""] : props.destination.webhook_urls,
        }}
        validationSchema={yup.object().shape({
          webhook_urls: yup.array().of(yup.string()),
        })}
        onSubmit={async (values) => {
          await updateDestination(values)
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
                                style={{width: '300px'}}
                                type="text"
                                name={`webhook_urls[${index}]`}
                                tag={Field}
                              />
                              <ErrorMessage name={`webhook_urls[${index}].value`}/>
                            </div>
                            <div className={'d-flex gap-2'}>
                              <Button outline
                                      color="danger"
                                      onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                              {
                                index === values.webhook_urls.length - 1 &&
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

export default DestinationWebhookModal;
