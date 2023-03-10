import {Field, Form, Formik} from "formik";
import {
  Button, CardBody,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal, ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import React, {useState} from "react";
import * as yup from "yup";
import {api} from "../../../../api";
import {CardWrapper} from "../../../../components/card/CardWrapper";
import {CircleIcon} from "../../../../components/card/CircleIcon";
import {AiOutlineRight} from "react-icons/ai";
import {ClickableCard} from "../../../../components/card/ClickableCard";
import {RxInput} from "react-icons/rx";


function SendMessage(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const sendMessage = async (values) => {
    let toSend = {...values}
    toSend.tags = {
      ...JSON.parse(values.tags)
    }
    toSend.channel_slug = props.channel.slug
    const {data} = await api.message.send(toSend)
    props.refetch()
  }

  return (
    <div>
      {
        props.channel && (
          <div>
            <ClickableCard onClick={toggle}>
              <CardBody>
                <CardWrapper>
                  <div className={'d-flex gap-3 flex-wrap'}>
                    <CircleIcon>
                      <RxInput/>
                    </CircleIcon>
                    <div>
                      <h4>Form</h4>
                      <p className={'text-muted mb-0'}>
                        Use a form to send a message
                      </p>
                    </div>
                  </div>
                  <div>
                    <AiOutlineRight/>
                  </div>
                </CardWrapper>
              </CardBody>
            </ClickableCard>
            <Formik
              initialValues={{
                title: "",
                description: "",
                level: "",
                tags: "",
              }}
              validationSchema={yup.object().shape({
                title: yup.string().required('Required'),
                description: yup.string().required('Required'),
                level: yup.string().required('Required'),
                tags: yup.string().required('Required'),
              })}
              onSubmit={async (values) => {
                await sendMessage(values)
              }}>
              {({errors, touched, handleSubmit}) => (
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Send message to {props.channel.label}</ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup row>
                        <Col>
                          <Label for="title">Title</Label>
                          <Input
                            type="text"
                            name="title"
                            tag={Field}
                            invalid={errors.title && touched.title}
                          />
                          <FormFeedback>{errors.title}</FormFeedback>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col>
                          <Label for="description">Description</Label>
                          <Input
                            type="text"
                            name="description"
                            tag={Field}
                            invalid={errors.description && touched.description}
                          />
                          <FormFeedback>{errors.description}</FormFeedback>
                        </Col>
                      </FormGroup>
                      <FormGroup
                        row
                        tag="fieldset"
                      >
                        <legend className="col-form-label col-sm-2">
                          Level
                        </legend>
                        <Col sm={10}>
                          <FormGroup check inline>
                            <Input
                              name="level"
                              value={"info"}
                              tag={Field}
                              type="radio"
                            />
                            {' '}
                            <Label check>
                              Info
                            </Label>
                          </FormGroup>
                          <FormGroup check inline>
                            <Input
                              name="level"
                              value={"warning"}
                              tag={Field}
                              type="radio"
                            />
                            {' '}
                            <Label check>
                              Warning
                            </Label>
                          </FormGroup>
                          <FormGroup check inline>
                            <Input
                              name="level"
                              value={"error"}
                              tag={Field}
                              type="radio"
                            />
                            {' '}
                            <Label check>
                              Error
                            </Label>
                          </FormGroup>
                          <FormGroup check inline>
                            <Input
                              name="level"
                              value={"success"}
                              tag={Field}
                              type="radio"
                            />
                            {' '}
                            <Label check>
                              Success
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup
                        row
                        tag="fieldset"
                      >
                        <legend className="col-form-label col-sm-2">
                          Priority
                        </legend>
                        <Col sm={10}>
                          <FormGroup check inline>
                            <Input
                              name="priority"
                              value={"low"}
                              tag={Field}
                              type="radio"
                            />
                            {' '}
                            <Label check>
                              Low
                            </Label>
                          </FormGroup>
                          <FormGroup check inline>
                            <Input
                              name="priority"
                              value={"medium"}
                              tag={Field}
                              type="radio"
                            />
                            {' '}
                            <Label check>
                              Medium
                            </Label>
                          </FormGroup>
                          <FormGroup check inline>
                            <Input
                              name="priority"
                              value={"high"}
                              tag={Field}
                              type="radio"
                            />
                            {' '}
                            <Label check>
                              High
                            </Label>
                          </FormGroup>
                          <FormGroup check inline>
                            <Input
                              name="priority"
                              value={"urgent"}
                              tag={Field}
                              type="radio"
                            />
                            {' '}
                            <Label check>
                              Urgent
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="tags">Tags</Label>
                        <Col>
                          <Field component="textarea" placeholder='{"btc": "5000"}'
                                 rows="4" name={'tags'}></Field>
                          <FormFeedback>{errors.tags}</FormFeedback>
                        </Col>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>{' '}
                    <Button color="primary" onClick={() => {
                      handleSubmit()
                      // toggle()
                    }}>
                      Send
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

export default SendMessage;
