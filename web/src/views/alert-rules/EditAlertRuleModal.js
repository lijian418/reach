import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {Formik} from "formik";
import * as yup from "yup";
import {api} from "../../api";
import {AlertRuleForm} from "./AlertRuleForm";

function EditAlertRuleModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const editAlertRule = async (values) => {
    const {data} = await api.alertRule.update(props.alertRule.id, values)
    props.refetch()
  }

  return (
    <div>
      {
        props.alertRule && (
          <div>
            <Button color="primary" onClick={toggle}>
              Edit Alert Rule
            </Button>
            <Formik
              initialValues={{
                label: props.alertRule.label,
              }}
              validationSchema={yup.object().shape({
                label: yup.string().required('Required'),
              })}
              onSubmit={async (values) => {
                await editAlertRule(values)
              }}>
              {(formik) => (
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Edit Alert Rule</ModalHeader>
                  <ModalBody>
                    <AlertRuleForm formik={formik}/>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>{' '}
                    <Button color="primary" onClick={() => {
                      formik.handleSubmit()
                      toggle()
                    }}>
                      Edit
                    </Button>
                  </ModalFooter>
                </Modal>
              )}
            </Formik>
          </div>
        )
      }
    </div>
  );
}

export default EditAlertRuleModal;
