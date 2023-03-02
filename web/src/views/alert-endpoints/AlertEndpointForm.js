import {Field, Form} from "formik";
import {Col, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import React from "react";

export const AlertEndpointForm = (props) => {
  const {errors, touched} = props.formik

  return (
    <Form>
      <FormGroup row>
        <Col>
          <Label for="label">Label</Label>
          <Input
            type="text"
            name="label"
            tag={Field}
            invalid={errors.label && touched.label}
          />
          <FormFeedback>{errors.label}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Label for="email">Email</Label>
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
          <Label for="webhook_url">Webhook</Label>
          <Input
            type="text"
            name="webhook_url"
            tag={Field}
            invalid={errors.webhook_url && touched.webhook_url}
          />
          <FormFeedback>{errors.webhook_url}</FormFeedback>
        </Col>
      </FormGroup>
    </Form>
  )
}
