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
    </Form>
  )
}
