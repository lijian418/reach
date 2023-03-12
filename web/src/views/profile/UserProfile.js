import * as yup from "yup";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import {Field, Form, Formik} from "formik";
import React, {useEffect} from "react";
import {useUser} from "../../hooks/useUser";
import {api} from "../../api";

const UserProfile = () => {
  const {user} = useUser()

  const editUser = async (values) => {
    await api.user.update(user.id, {
      email: values.email,
      webhook_url: values.webhook_url
    })
  }

  return (
    <>
      <h3>Profile</h3>
      {
        user && (
          <Formik
            initialValues={{
              email: user?.email,
              webhook_url: user?.webhook_url,
              slack_url: user?.webhook_url
            }}
            validationSchema={yup.object().shape({
              email: yup.string().optional(),
              webhook_url: yup.string().optional(),
              slack_url: yup.string().optional(),
            })}
            onSubmit={async (values) => {
              await editUser(values)
            }}>
            {({errors, touched}) => (
              <Form>
                <FormGroup row>
                  <Col>
                    <Label for="label">Email</Label>
                    <Input
                      type="text"
                      name="email"
                      tag={Field}
                      invalid={errors.email && touched.email}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Label for="label">Webhook URL</Label>
                    <Input
                      type="text"
                      name="webhook_url"
                      tag={Field}
                      invalid={errors.webhook_url && touched.webhook_url}
                    />
                    <FormFeedback>{errors.webhook_url}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Label for="label">Slack URL</Label>
                    <Input
                      type="text"
                      name="webhook_url"
                      tag={Field}
                      invalid={errors.slack_url && touched.slack_url}
                    />
                    <FormFeedback>{errors.slack_url}</FormFeedback>
                  </Col>
                </FormGroup>
                <Button type={'submit'}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        )
      }
    </>
  )
}

export default UserProfile
