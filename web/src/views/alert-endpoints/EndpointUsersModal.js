import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, FormGroup, Col, Label, Input, FormFeedback,
} from 'reactstrap';
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as yup from "yup";
import {api} from "../../api";
import {AlertEndpointForm} from "./AlertEndpointForm";
import {AsyncPaginate} from "react-select-async-paginate";

function EndpointEmailModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const updateEndpoint = async (values) => {
    const {data} = await api.alertEndpoint.update(props.alertEndpoint.id, {
      "user_ids": values.user_ids.map((user) => user.value),
    })
    props.refetch()
  }

  async function loadOptionsEndpoints(search, loadedOptions) {
    const {data} = await api.user.find({
      limit: 10,
      skip: loadedOptions.length
    })

    return {
      options: data.items.map((item) => {
        return (
          {
            value: item.id,
            label: item.username
          }
        )
      }),
      hasMore: loadedOptions.length < data.total
    };
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Edit Users
      </Button>
      <Formik
        initialValues={{
          user_ids: props.alertEndpoint.user_ids,
        }}
        validationSchema={yup.object().shape({
          user_ids: yup.array(),
        })}
        onSubmit={async (values) => {
          await updateEndpoint(values)
        }}>
        {({ handleSubmit, values, setFieldValue}) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Users</ModalHeader>
            <ModalBody>
              <Form>
                <FieldArray
                  name="user_ids"
                  render={arrayHelpers => (
                    <div>
                      {values.user_ids.map((email, index) => (
                        <div key={index}>
                          <div className={'d-flex gap-2 flex-wrap mt-2'}>
                            <div>
                              <AsyncPaginate
                                value={values.user_ids[index]}
                                loadOptions={loadOptionsEndpoints}
                                onChange={(value) => {
                                  setFieldValue(`user_ids[${index}]`, value)
                                }}
                              />
                              <ErrorMessage name={`user_ids[${index}]`}/>
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

export default EndpointEmailModal;
