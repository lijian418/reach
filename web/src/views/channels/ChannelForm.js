import {Field, Form} from "formik";
import {Col, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";
import React from "react";

export const ChannelForm = (props) => {
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
          <FormText>Only used for display</FormText>
          <FormFeedback>{errors.label}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Label for="slug">Slug</Label>
          <Input
            type="text"
            name="slug"
            tag={Field}
            invalid={errors.slug && touched.slug}
          />
          <FormText>Used to identify your channel</FormText>
          <FormFeedback>{errors.slug}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Label for="description">Description</Label>
          <Input
            type="text"
            name="description"
            tag={Field}
            invalid={errors.description && touched.description}
          />
          <FormText>Brief description of what messages are sent to this channel</FormText>
          <FormFeedback>{errors.description}</FormFeedback>
        </Col>
      </FormGroup>
    </Form>
  )
}
