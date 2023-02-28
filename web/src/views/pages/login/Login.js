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
import {useUser} from "../../../hooks/useUser";

const Login = () => {
  const navigate = useNavigate()
  const {user, fetchUser} = useUser()

  const login = async (values) => {
    const {data} = await api.user.getByUsername(values.username)
    if (data) {
      localStorage.setItem('username', values.username)
      await fetchUser()
      window.location.reload()
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container className={'d-flex justify-content-center'}>
        <Card style={{minWidth: '300px'}}>
          <CardBody>
            <CardTitle tag="h5">
              Login
            </CardTitle>
            <Formik
              initialValues={{
                username: '',
              }}
              validationSchema={yup.object().shape({
                username: yup.string().required('Required'),
              })}
              onSubmit={async (values) => {
                await login(values)
              }}>
              {({ errors, touched }) => (
                <Form>
                  <FormGroup row>
                    <Col md="2"style={{minWidth: '250px'}}>
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
                  <Button color="primary"
                          onClick={() => {
                            navigate('/register')
                          }}
                          className="me-2">New user ? Register</Button>
                  <Button color="primary" type={"submit"}>Login</Button>
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
