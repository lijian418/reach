import React, {useRef, useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, Input, FormGroup, Label,
} from 'reactstrap';
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as yup from "yup";
import {api} from "../../api";
import {useUser} from "../../hooks/useUser";
import {AsyncPaginate} from "react-select-async-paginate";

function SubscribeToMultipleAlerts(props) {
  const [modal, setModal] = useState(false);
  const {user} = useUser()

  const toggle = () => setModal(!modal);

  const subscribe = async (values) => {
    const {data} = await api.subscription.create({
      user_id: user.id,
      channel_id: props.channel.id,
      alert_rule_ids: values.alert_rule_ids,
      listen_to_all: false
    })
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Subscribe to alerts
      </Button>
      <Formik
        initialValues={{
          alert_rule_ids: [],
        }}
        validationSchema={yup.object().shape({
          alert_rule_ids: yup.array().required("Required"),
        })}
        onSubmit={async (values) => {
          await subscribe(values)
        }}>
        {(handleSubmit, touched, errors) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Subscribe to specific alerts</ModalHeader>
            <ModalBody>
              <Form>
                <FieldArray
                  name="alert_rule_ids"
                  render={arrayHelpers => (
                    <div>
                      {
                        props.channel.alert_rules.map((alert_rule, index) => (
                          <div key={index} className={'mt-2'}>
                            <FormGroup
                              check
                              inline
                            >
                              <Input type="checkbox" onChange={
                                (e) => {
                                  if (e.target.checked) {
                                    arrayHelpers.push(alert_rule.id)
                                  } else {
                                    arrayHelpers.remove(arrayHelpers.form.values.alert_rule_ids.indexOf(alert_rule.id))
                                  }
                                }
                              } checked={arrayHelpers.form.values.alert_rule_ids.indexOf(alert_rule.id) !== -1}/>
                              <Label check>
                                {alert_rule.label}
                              </Label>
                            </FormGroup>
                          </div>
                        ))
                      }
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
                Subscribe
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Formik>
    </div>
  );
}

export default SubscribeToMultipleAlerts;

