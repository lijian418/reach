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
      alertRule: props.localAlertRule,
    })
    setDataResponse(data)
  }

  return (
    <Formik
      initialValues={{
        data: "",
      }}
      validationSchema={yup.object().shape({
        data: yup.string().required("Required"),
      })}
      onSubmit={async (values) => {
        await sendTry(values)
      }}>
      {({errors, touched}) => (
        <div>
          <Form>
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
