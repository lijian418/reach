import * as yup from "yup";
import {
  Badge,
  Button, Card, CardBody,
  FormFeedback, FormGroup,
  Input, Label,
} from "reactstrap";
import {ErrorMessage, Field, FieldArray, Form, Formik, useFormikContext} from "formik";
import React, {useEffect} from "react";
import {api} from "../../api";
import {useNavigate} from "react-router-dom";
import {AlertRuleTryDataModal} from "./AlertRuleTryDataModal";
import {GrInfo, GrTrigger} from "react-icons/gr";
import {MdPriorityHigh} from "react-icons/md";
import {TbLogicNand, TbLogicNor} from "react-icons/tb";
import {BsSearch} from "react-icons/bs";

export const AlertRuleEditForm = (props) => {
  const navigate = useNavigate()
  const schema = yup.object().shape({
    logic: yup.string().required('Required'),
    levels: yup.array().of(yup.string()),
    priorities: yup.array().of(yup.string()),
    rules: yup.array()
      .of(
        yup.object().shape({
          key: yup.string().required('Required'),
          type: yup.string().required('Required'),
          operator: yup.string().required('Required'),
          value: yup.string().required('Required'),
        })
      )
  });

  const update = async (values) => {
    const {data} = await api.alertRule.update(props.alertRule.id, {
      logic: values.logic,
      rules: values.rules,
      levels: values.levels,
      priorities: values.priorities,
    })
    navigate(`/alert-rules/${props.alertRule.id}`)
  }

  return (
    <Formik
      initialValues={{
        logic: props.alertRule.logic,
        levels: props.alertRule.levels,
        priorities: props.alertRule.priorities,
        rules: props.alertRule.rules.length > 0 ? props.alertRule.rules : [{key: '', type: 'text', operator: '==', value: ''}]
      }}
      validationSchema={schema}
      onSubmit={(values) => update(values)}
    >
      {({errors, touched, values}) => (
        <Form>
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
            <h3 className={'mt-4'}><GrInfo/> Levels</h3>
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
            <h3 className={'mt-4'}><MdPriorityHigh/> Priorities</h3>
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
            <h3 className={'mt-4'}>
              <TbLogicNand/> Logic
            </h3>
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
            <h3 className={'mt-4'}><GrTrigger/> Conditions</h3>
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
                        <Button
                          type={'submit'}
                          color={'primary'}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </CardBody>
            </Card>
          </div>
        </Form>
      )}
    </Formik>
  )
}
