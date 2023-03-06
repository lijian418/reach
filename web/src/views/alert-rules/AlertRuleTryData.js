import {Field, Form, Formik} from "formik";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import React, {useState} from "react";
import * as yup from "yup";
import {api} from "../../api";

export const AlertRuleTryData = (props) => {
  const [dataResponse, setDataResponse] = useState()

  const sendTry = async (dataTry) => {
    const {data} = await api.alertRule.tryData(props.alertRule.id, {
      data: dataTry.data,
      level: dataTry.level,
      alertRule: props.alertRule,
    })
    setDataResponse(data)
  }

  return (
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
      {({errors, touched}) => (
        <div>
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
            <Button type={'submit'} color={'primary'}>Try</Button>
          </Form>
        </div>
      )}
    </Formik>
  )
}
