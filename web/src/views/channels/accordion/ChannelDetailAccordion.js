import {CAccordionCustom} from "../../../components/CAccordionCustom";
import {CAccordionBody, CAccordionHeader, CAccordionItem} from "@coreui/react";
import {CircleIcon} from "../../../components/card/CircleIcon";
import {RiSendPlaneFill} from "react-icons/ri";
import {AiFillSetting} from "react-icons/ai";
import React, {useState} from "react";
import SendMessage from "./modal/SendMessage";
import SendMessagePython from "./modal/SendMessagePython";
import EditChannelForm from "./modal/EditChannelForm";

export const ChannelDetailAccordion = (props) => {
  const {channel} = props
  const [activeItemKey, setActiveItemKey] = useState()

  return (
    <CAccordionCustom
      activeItemKey={activeItemKey}
      onActiveItemChange={setActiveItemKey}>
      <CAccordionItem itemKey={0}>
        <CAccordionHeader>
          <div className={'d-flex gap-3'}>
            <CircleIcon>
              <RiSendPlaneFill/>
            </CircleIcon>
            <div>
              <h4>Send</h4>
              <p className={'text-muted mb-0'}>
                Send a message to this channel via API or Form
              </p>
            </div>
          </div>
        </CAccordionHeader>
        <CAccordionBody>
          <SendMessage channel={channel}/>
          <SendMessagePython channel={channel}/>
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem itemKey={1}>
        <CAccordionHeader>
          <div className={'d-flex gap-3'}>
            <CircleIcon>
              <AiFillSetting/>
            </CircleIcon>
            <div>
              <h4>Settings</h4>
              <p className={'text-muted mb-0'}>
                Modify the channel settings
              </p>
            </div>
          </div>
        </CAccordionHeader>
        <CAccordionBody>
          <EditChannelForm channel={channel}
                           refetch={props.refetch}/>
        </CAccordionBody>
      </CAccordionItem>
    </CAccordionCustom>
  )

}
