import {
  Button,
  CardBody, Col, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
} from "reactstrap";
import React, {useState} from "react";
import {api} from "../../../../api";
import {CardWrapper} from "../../../../components/card/CardWrapper";
import {CircleIcon} from "../../../../components/card/CircleIcon";
import {AiOutlineRight} from "react-icons/ai";
import {ClickableCard} from "../../../../components/card/ClickableCard";
import {TbBrandPython} from "react-icons/tb";
import {Field, Form} from "formik";


function SendMessagePython(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const sendMessage = async (values) => {
    let toSend = {...values}
    toSend.tags = {
      ...JSON.parse(values.tags)
    }
    toSend.channel_slug = props.channel.slug
    const {data} = await api.message.send(toSend)
    props.refetch()
  }

  return (
    <div>
      {
        props.channel && (
          <div>
            <ClickableCard onClick={toggle}>
              <CardBody>
                <CardWrapper>
                  <div className={'d-flex gap-3 flex-wrap'}>
                    <CircleIcon>
                      <TbBrandPython/>
                    </CircleIcon>
                    <div>
                      <h4>Python</h4>
                      <p className={'text-muted mb-0'}>
                        Use Python to send messages
                      </p>
                    </div>
                  </div>
                  <div>
                    <AiOutlineRight/>
                  </div>
                </CardWrapper>
              </CardBody>
            </ClickableCard>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>
                Sending messages using Python
              </ModalHeader>
              <ModalBody>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => {
                  toggle()
                }}>
                  Done
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        )
      }
    </div>
  );
}

export default SendMessagePython;
