import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {ErrorMessage, FieldArray, Form, Formik} from "formik";
import * as yup from "yup";
import {api} from "../../api";
import {AsyncPaginate} from "react-select-async-paginate";

function EditRulesOnChannel(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const updateChannel = async (values) => {
    const {data} = await api.channel.update(props.channel.id, {
      "alert_rule_ids": values.alert_rule_ids.map((alert_rule) => alert_rule.value),
    })
    props.refetch()
  }

  async function loadOptionsEndpoints(search, loadedOptions) {
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

  const initialOptions = props.channel?.alert_rules?.map((alertRule) => {
    return (
      {
        value: alertRule.id,
        label: alertRule.label
      }
    )
  })

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Edit Alert Rules
      </Button>
      <Formik
        initialValues={{
          alert_rule_ids: initialOptions ? initialOptions : [""]
        }}
        validationSchema={yup.object().shape({
          alert_rule_ids: yup.array(),
        })}
        onSubmit={async (values) => {
          await updateChannel(values)
        }}>
        {({ handleSubmit, values, setFieldValue}) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Alert Rules</ModalHeader>
            <ModalBody>
              <Form>
                <FieldArray
                  name="alert_rule_ids"
                  render={arrayHelpers => (
                    <div>
                      {values.alert_rule_ids?.map((email, index) => (
                        <div key={index}>
                          <div className={'d-flex gap-2 flex-wrap mt-2'}>
                            <div style={{minWidth: '250px'}}>
                              <AsyncPaginate
                                value={values.alert_rule_ids[index]}
                                loadOptions={loadOptionsEndpoints}
                                onChange={(value) => {
                                  setFieldValue(`alert_rule_ids[${index}]`, value)
                                }}
                              />
                              <ErrorMessage name={`alert_rule_ids[${index}]`}/>
                            </div>
                            <div>
                              <Button onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className={'d-flex flex-wrap gap-2 mt-2'}>
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          + Add
                        </Button>
                      </div>
                    </div>
                  )}
                />
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
                Save
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Formik>
    </div>
  );
}

export default EditRulesOnChannel;
