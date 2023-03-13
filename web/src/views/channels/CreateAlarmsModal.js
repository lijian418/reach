import * as yup from "yup";
import {
  Button,
  Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
} from "reactstrap";
import {ErrorMessage, Field, FieldArray, Form, Formik, useFormikContext} from "formik";
import React, {useEffect, useState} from "react";
import {api} from "../../api";
import {AsyncPaginate} from "react-select-async-paginate";
import {IoAddCircleOutline} from "react-icons/io5";

export const CreateAlarmsModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const schema = yup.object().shape({
    rule_destination_associations: yup.array()
      .of(
        yup.object().shape({
          label: yup.string().required('Required'),
          destination_id: yup.object().shape({
            value: yup.string().required('Required'),
            label: yup.string().required('Required'),
          }).required('Required'),
          rule_id: yup.object().shape({
            value: yup.string().required('Required'),
            label: yup.string().required('Required'),
          }).required('Required'),
        })
      )
  });

  const create = async (values) => {
    for (const alarm of values.alarms) {
      const {data} = await api.alarm.create({
        label: alarm.label,
        rule_id: alarm.rule_id.value,
        destination_id: alarm.destination_id.value,
        channel_id: props.channel.id
      })
      if (data) {
        props.refetch()
      }
    }
  }

  async function loadOptionsRules(search, loadedOptions) {
    const {data} = await api.alertRule.find({
      limit: 10,
      skip: loadedOptions.length
    })

    return {
      options: data.items.map((item) => {
        return (
          {
            value: item.id,
            label: item.label
          }
        )
      }),
      hasMore: loadedOptions.length < data.total
    };
  }

  async function loadOptionsTeams(search, loadedOptions) {
    const {data} = await api.destination.find({
      limit: 10,
      skip: loadedOptions.length
    })

    return {
      options: data.items.map((item) => {
        return (
          {
            value: item.id,
            label: item.label
          }
        )
      }),
      hasMore: loadedOptions.length < data.total
    };
  }

  return (
    <>
      {
        props.channel && (
          <div>
            <Button color="primary" onClick={toggle}>
              <IoAddCircleOutline/> Add Channel Integrations
            </Button>
            <Formik
              initialValues={{
                alarms: [
                  {
                    label: '',
                    rule_id: null,
                    destination_id: null,
                  }
                ]
              }}
              validationSchema={schema}
              onSubmit={(values, {resetForm}) => {
                create(values)
                resetForm()
              }}
            >
              {({errors, touched, values, resetForm,
                  setFieldValue, handleSubmit}) => (
                <Modal isOpen={modal} toggle={toggle} size={'lg'}>
                  <ModalHeader toggle={toggle}>Create Channel Integrations</ModalHeader>
                  <ModalBody>
                    <Form>
                      <FieldArray
                        name="alarms"
                        render={arrayHelpers => (
                          <div>
                            {values.alarms.map((alarm, index) => (
                              <div key={index}>
                                <div className={'d-flex gap-4 flex-wrap mt-2'}>
                                  <div style={{width: '200px'}}>
                                    {
                                      index === 0 && (
                                        <p className={'mb-0'}>Label</p>
                                      )
                                    }
                                    <Input
                                      type="text"
                                      name={`alarms[${index}].label`}
                                      placeholder="Label"
                                      value={values.alarms[index].label}
                                      onChange={(e) => {
                                        setFieldValue(`alarms[${index}].label`, e.target.value)
                                      }}/>
                                  </div>
                                  <div style={{width: '200px'}}>
                                    {
                                      index === 0 && (
                                        <p className={'mb-0'}>Rule</p>
                                      )
                                    }
                                    <AsyncPaginate
                                      value={values.alarms[index].rule_id}
                                      loadOptions={loadOptionsRules}
                                      onChange={(value) => {
                                        setFieldValue(`alarms[${index}].rule_id`, value)
                                      }}
                                    />
                                    <ErrorMessage name={`alarms[${index}].rule_id`}/>
                                  </div>
                                  <div style={{width: '200px'}}>
                                    {
                                      index === 0 && (
                                        <p className={'mb-0'}>Team</p>
                                      )
                                    }
                                    <AsyncPaginate
                                      value={values.alarms[index].destination_id}
                                      loadOptions={loadOptionsTeams}
                                      onChange={(value) => {
                                        setFieldValue(`alarms[${index}].destination_id`, value)
                                      }}
                                    />
                                    <ErrorMessage name={`alarms[${index}].destination_id`}/>
                                  </div>
                                  <div className={'mt-auto'}>
                                    <Button onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                                  </div>
                                </div>
                              </div>
                            ))}

                            <div className={'d-flex mt-4'}>
                              <Button
                                color={'primary'}
                                type="button"
                                onClick={() => arrayHelpers.push({ key: '', value: '', type: 'text', operator: '=='})}
                              >
                                + Add
                              </Button>
                            </div>
                          </div>
                        )}
                      />
                      <div>
                        {
                          typeof errors.rules === 'string' && (
                            <div className={'text-danger'}>
                              {errors.rules}
                            </div>
                          )
                        }
                      </div>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>{' '}
                    <Button color="primary" onClick={() => {
                      handleSubmit()
                      toggle()
                    }}>
                      Create
                    </Button>
                  </ModalFooter>
                </Modal>
              )}
            </Formik>
          </div>
        )
      }
    </>
  )
}
