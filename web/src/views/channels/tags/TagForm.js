import {Field, Form} from "formik";
import {Col, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";
import React from "react";

export const TagForm = (props) => {
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
          <FormText>Used to identify your tag with API</FormText>
          <FormFeedback>{errors.slug}</FormFeedback>
        </Col>
      </FormGroup>
    </Form>
  )
}
