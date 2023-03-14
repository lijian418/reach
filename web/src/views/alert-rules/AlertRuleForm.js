import {ErrorMessage, Field, FieldArray} from "formik";
import {GrInfo, GrTrigger} from "react-icons/gr";
import {Button, Card, CardBody, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {MdPriorityHigh} from "react-icons/md";
import {TbLogicNand} from "react-icons/tb";
import React from "react";

export const AlertRuleForm = (props) => {
  const {formik} = props;
  const {values, touched, errors} = formik;
  return (
    <div>
      <div>
        {
          typeof errors.rules === 'string' && (
            <div className={'text-danger'}>
              {errors.rules}
            </div>
          )
        }
      </div>
      <div>
        <h4 className={'mt-4'}>Label</h4>
        <div>
          <Input
            name={`label`}
            type="text"
            tag={Field}
            component={"input"}
            invalid={touched.label && !!errors.label}
          />
          <ErrorMessage name="label" component={FormFeedback}/>
        </div>

        <h4 className={'mt-4'}><GrInfo/> Levels</h4>
        <Card>
          <CardBody>
            <FieldArray
              name="levels"
              render={arrayHelpers => (
                <div>
                  <div className={'mt-2'}>
                    <FormGroup
                      check
                      inline
                    >
                      <Input type="checkbox" onChange={
                        (e) => {
                          if (e.target.checked) {
                            arrayHelpers.push('info')
                          } else {
                            arrayHelpers.remove(arrayHelpers.form.values.levels.indexOf('info'))
                          }
                        }
                      } checked={arrayHelpers.form.values.levels.indexOf('info') !== -1}/>
                      <Label check>
                        Info
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                      inline
                    >
                      <Input type="checkbox" onChange={
                        (e) => {
                          if (e.target.checked) {
                            arrayHelpers.push('warning')
                          } else {
                            arrayHelpers.remove(arrayHelpers.form.values.levels.indexOf('warning'))
                          }
                        }
                      } checked={arrayHelpers.form.values.levels.indexOf('warning') !== -1}/>
                      <Label check>
                        Warning
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                      inline
                    >
                      <Input type="checkbox" onChange={
                        (e) => {
                          if (e.target.checked) {
                            arrayHelpers.push('error')
                          } else {
                            arrayHelpers.remove(arrayHelpers.form.values.levels.indexOf('error'))
                          }
                        }
                      } checked={arrayHelpers.form.values.levels.indexOf('error') !== -1}/>
                      <Label check>
                        Error
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                      inline
                    >
                      <Input type="checkbox" onChange={
                        (e) => {
                          if (e.target.checked) {
                            arrayHelpers.push('success')
                          } else {
                            arrayHelpers.remove(arrayHelpers.form.values.levels.indexOf('success'))
                          }
                        }
                      } checked={arrayHelpers.form.values.levels.indexOf('success') !== -1}/>
                      <Label check>
                        Success
                      </Label>
                    </FormGroup>
                  </div>
                </div>
              )}
            />
          </CardBody>
        </Card>
        <h4 className={'mt-4'}><MdPriorityHigh/> Priorities</h4>
        <Card>
          <CardBody>
            <FieldArray
              name="priorities"
              render={arrayHelpers => (
                <div>
                  <div className={'mt-2'}>
                    <FormGroup
                      check
                      inline
                    >
                      <Input type="checkbox" onChange={
                        (e) => {
                          if (e.target.checked) {
                            arrayHelpers.push('low')
                          } else {
                            arrayHelpers.remove(arrayHelpers.form.values.priorities.indexOf('low'))
                          }
                        }
                      } checked={arrayHelpers.form.values.priorities.indexOf('low') !== -1}/>
                      <Label check>
                        Low
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                      inline
                    >
                      <Input type="checkbox" onChange={
                        (e) => {
                          if (e.target.checked) {
                            arrayHelpers.push('medium')
                          } else {
                            arrayHelpers.remove(arrayHelpers.form.values.priorities.indexOf('medium'))
                          }
                        }
                      } checked={arrayHelpers.form.values.priorities.indexOf('medium') !== -1}/>
                      <Label check>
                        Medium
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                      inline
                    >
                      <Input type="checkbox" onChange={
                        (e) => {
                          if (e.target.checked) {
                            arrayHelpers.push('high')
                          } else {
                            arrayHelpers.remove(arrayHelpers.form.values.priorities.indexOf('high'))
                          }
                        }
                      } checked={arrayHelpers.form.values.priorities.indexOf('high') !== -1}/>
                      <Label check>
                        High
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                      inline
                    >
                      <Input type="checkbox" onChange={
                        (e) => {
                          if (e.target.checked) {
                            arrayHelpers.push('urgent')
                          } else {
                            arrayHelpers.remove(arrayHelpers.form.values.priorities.indexOf('urgent'))
                          }
                        }
                      } checked={arrayHelpers.form.values.priorities.indexOf('urgent') !== -1}/>
                      <Label check>
                        Urgent
                      </Label>
                    </FormGroup>
                  </div>
                </div>
              )}
            />
          </CardBody>
        </Card>
        <h4 className={'mt-4'}>
          <TbLogicNand/> Logic
        </h4>
        <Card>
          <CardBody>
            <div>
              <Input
                style={{width: '130px'}}
                name={`logic`}
                type="select"
                tag={Field}
                component={"select"}
              >
                <option label={'And'}>
                  and
                </option>
                <option label={'Or'}>
                  or
                </option>
              </Input>
            </div>
          </CardBody>
        </Card>
        <h4 className={'mt-4'}><GrTrigger/> Conditions</h4>
        <Card>
          <CardBody>
            <FieldArray
              name="rules"
              render={arrayHelpers => (
                <div>
                  {values.rules.map((rule, index) => (
                    <div key={index}>
                      <div className={'d-flex gap-4 flex-wrap mt-2'}>
                        <div>
                          {
                            index === 0 && (
                              <h6>Key</h6>
                            )
                          }
                          <Input
                            style={{width: '200px'}}
                            type="text"
                            name={`rules[${index}].key`}
                            tag={Field}
                          />
                          <FormFeedback>{errors.key}</FormFeedback>
                          <ErrorMessage name={`rules[${index}].key`}/>
                        </div>
                        <div>
                          {
                            index === 0 && (
                              <h6>Type</h6>
                            )
                          }
                          <Input
                            style={{width: '130px'}}
                            name={`rules[${index}].type`}
                            type="select"
                            tag={Field}
                            component={"select"}
                          >
                            <option label={'Text'}>
                              text
                            </option>
                            <option label={'Number'}>
                              number
                            </option>
                          </Input>
                          <ErrorMessage name={`rules[${index}].type`}/>
                        </div>
                        <div>
                          {
                            index === 0 && (
                              <h6>Operator</h6>
                            )
                          }
                          <Input
                            style={{width: '100px'}}
                            name={`rules[${index}].operator`}
                            type="select"
                            tag={Field}
                            component={"select"}
                          >
                            <option>
                              ==
                            </option>
                            <option>
                              !=
                            </option>
                          </Input>
                          <ErrorMessage name={`rules[${index}].operator`}/>
                        </div>
                        <div>
                          {
                            index === 0 && (
                              <h6>Value</h6>
                            )
                          }
                          <Input
                            style={{width: '200px'}}
                            type="text"
                            name={`rules[${index}].value`}
                            tag={Field}
                          />
                          <ErrorMessage name={`rules[${index}].value`}/>
                        </div>
                        <div className={'mt-auto'}>
                          <Button onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className={'d-flex flex-wrap gap-2 mt-2'}>
                    <Button
                      type="button"
                      onClick={() => arrayHelpers.push({ key: '', value: '', type: 'text', operator: '=='})}
                    >
                      + Add
                    </Button>
                  </div>
                </div>
              )}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
