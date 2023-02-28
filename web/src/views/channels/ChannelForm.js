import {Field, Form} from "formik";
import {Col, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";
import React from "react";

export const ChannelForm = (props) => {
  const {errors, touched} = props.formik

  return (
    <Form>
      <FormGroup row>
        <Col>
          <Label for="slug">Slug</Label>
          <Input
            type="text"
            name="slug"
            tag={Field}
            invalid={errors.slug && touched.slug}
          />
          <FormText>Used to identify your channel with API</FormText>
          <FormFeedback>{errors.slug}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Label for="label">Label</Label>
          <Input
            type="text"
            name="label"
            tag={Field}
            invalid={errors.label && touched.label}
          />
          <FormText>Only used for display</FormText>
          <FormFeedback>{errors.label}</FormFeedback>
        </Col>
      </FormGroup>
    </Form>
  )
}
