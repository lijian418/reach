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

function CreateAlertRuleModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const createAlertRule = async (values) => {
    values.logic = "AND"
    const {data} = await api.alertRule.create(values)
    props.refetch()
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Add a new alert rule
      </Button>
      <Formik
        initialValues={{
          label: "",
        }}
        validationSchema={yup.object().shape({
          label: yup.string().required("Required"),
        })}
        onSubmit={async (values) => {
          await createAlertRule(values)
        }}>
        {(formik) => (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Alert Rule</ModalHeader>
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
                Create
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Formik>
    </div>
  );
}

export default CreateAlertRuleModal;
