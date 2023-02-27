import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import {api} from "../../../api";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import {Field, Form, Formik} from "formik";
import * as yup from "yup"

const Login = () => {
  const navigate = useNavigate();

  const login = async (values) => {
    const {data} = await api.user.getByUsername(values.username)
    if (data) {
      localStorage.setItem('username', values.username)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Card>
          <CardBody>
            <CardTitle tag="h5">
              Login
            </CardTitle>
            <Formik
              initialValues={{
                username: '',
              }}
              validationSchema={yup.object().shape({
                username: yup.string()
                  .min(2, 'Too Short!')
                  .max(5, 'Too Long!')
                  .required('Required'),
              })}
              onSubmit={async (values) => {
                await login(values)
              }}>
              {({ errors, touched }) => (
                <Form>
                  <FormGroup row>
                    <Col md="2">
                      <Label for="username">Username</Label>
                      <Input
                        type="text"
                        name="username"
                        tag={Field}
                        invalid={errors.username && touched.username}
                      />
                      <FormFeedback>{errors.username}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <Button color="primary" type={"submit"}>Submit</Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default Login
