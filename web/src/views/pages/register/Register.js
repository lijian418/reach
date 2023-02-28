import React from 'react'
import {useNavigate} from "react-router-dom";
import {Button, Card, CardBody, CardTitle, Col, Container, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {useUser} from "../../../hooks/useUser";
import {api} from "../../../api";

const Register = () => {
  const navigate = useNavigate();
  const {user, fetchUser} = useUser()

  const register = async (values) => {
    const {data} = await api.user.create({
      username: values.username
    })
    if (data) {
      localStorage.setItem('username', values.username)
      await fetchUser()
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container className={'d-flex justify-content-center'}>
        <Card style={{minWidth: '300px'}}>
          <CardBody>
            <CardTitle tag="h5">
              Register
            </CardTitle>
            <Formik
              initialValues={{
                username: '',
              }}
              validationSchema={yup.object().shape({
                username: yup.string().required('Required'),
              })}
              onSubmit={async (values) => {
                await register(values)
              }}>
              {({ errors, touched }) => (
                <Form>
                  <FormGroup row>
                    <Col>
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
                            navigate('/login')
                          }}
                          className="me-2">Already have an account ? Login</Button>
                  <Button color="primary" type={"submit"}>Register</Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default Register
