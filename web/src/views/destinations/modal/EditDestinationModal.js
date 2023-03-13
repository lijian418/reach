import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, CardBody,
} from 'reactstrap';
import {Formik} from "formik";
import * as yup from "yup";
import {api} from "../../../api";
import {DestinationForm} from "../DestinationForm";
import {ClickableCard} from "../../../components/card/ClickableCard";
import {CardWrapper} from "../../../components/card/CardWrapper";
import {CircleIcon} from "../../../components/card/CircleIcon";
import {MdWebhook} from "react-icons/md";
import {AiFillEdit, AiFillSetting} from "react-icons/ai";

function EditDestinationModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const editDestination = async (values) => {
    const {data} = await api.destination.update(props.destination.id, values)
    props.refetch()
  }

  return (
    <div>
      {
        props.destination && (
          <div>
            <ClickableCard onClick={toggle}>
              <CardBody>
                <CardWrapper>
                  <div className={'d-flex gap-3 flex-wrap'}>
                    <CircleIcon>
                      <AiFillSetting/>
                    </CircleIcon>
                    <div>
                      <h6>Settings</h6>
                      <p className={'text-muted mb-0'}>Edit destination settings</p>
                    </div>
                  </div>
                  <div>
                    <AiFillEdit/>
                  </div>
                </CardWrapper>
              </CardBody>
            </ClickableCard>
            <Formik
              initialValues={{
                email: props.destination.email,
                label: props.destination.label,
                webhook_url: props.destination.webhook_url
              }}
              validationSchema={yup.object().shape({
                email: yup.string().optional(),
                label: yup.string().required('Required'),
                webhook_url: yup.string().optional(),
              })}
              onSubmit={async (values) => {
                await editDestination(values)
              }}>
              {(formik) => (
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Edit Destination</ModalHeader>
                  <ModalBody>
                    <DestinationForm formik={formik}/>
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

export default EditDestinationModal;
