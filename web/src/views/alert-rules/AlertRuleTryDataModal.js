import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {api} from "../../api";

export const AlertRuleTryDataModal = (props) => {
  const [dataResponse, setDataResponse] = useState()
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const sendTry = async (dataTry) => {
    const {data} = await api.alertRule.tryData(props.alertRule.id, {
      data: dataTry.data,
      level: dataTry.level,
      alertRule: props.alertRule,
    })
    setDataResponse(data)
  }

  return (
    <div>
      <Button onClick={toggle}>
        Try Data
      </Button>
      <Formik
        initialValues={{
          level: "",
          data: "",
        }}
        validationSchema={yup.object().shape({
          level: yup.string().required("Required"),
          data: yup.string().required("Required"),
        })}
        onSubmit={async (values) => {
          await sendTry(values)
        }}>
        {({errors, touched, handleSubmit}) => (
          <div>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Assign Alert Rule</ModalHeader>
              <ModalBody>
                <Form>
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
                  <FormGroup row>
                    <Col>
                      <Field component="textarea" rows="4" name={'data'}></Field>
                      <FormFeedback>{errors.data}</FormFeedback>
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
                  toggle()
                }}>
                  Send
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        )}
      </Formik>
    </div>
  )
}
