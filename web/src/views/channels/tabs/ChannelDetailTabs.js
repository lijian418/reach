import {CNav, CNavItem, CNavLink, CTabContent, CTabPane} from "@coreui/react";
import {AiOutlineUser} from "react-icons/ai";
import {BsSearch, BsSoundwave} from "react-icons/bs";
import {Button, Card, CardBody} from "reactstrap";
import React, {useState} from "react";
import {Empty} from "../../../components/Empty";
import {CiCircleAlert} from "react-icons/ci";
import {BiMessageDetail} from "react-icons/bi";
import {ButtonUnderline} from "../../../components/ButtonUnderline";

export const ChannelDetailTabs = (props) => {
  const [activeKey, setActiveKey] = useState(0)

  const {channel} = props
  return (
    <div>
      <CNav variant={'pills'}>
        <CNavItem>
          <CNavLink href="#!"
                    active={activeKey === 0}
                    onClick={() => setActiveKey(0)}>
            <AiOutlineUser/> Personal
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#!"
                    active={activeKey === 1}
                    onClick={() => setActiveKey(1)}>
            <BsSoundwave /> Channel
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel"
                  className={'mt-2'}
                  aria-labelledby="home-tab" visible={activeKey === 0}>
          <div className={'mt-4'}>
            <div className={'d-flex justify-content-between'}>
              <h4 className={'mb-0'}>Your alert rules</h4>
              <div className={'d-flex gap-2'}>
                <ButtonUnderline>
                  <h6 className={'mb-0'}>See all</h6>
                </ButtonUnderline>
                <ButtonUnderline>
                  <h6 className={'mb-0'}>Add</h6>
                </ButtonUnderline>
              </div>
            </div>
            <hr/>
            {
              channel?.alert_rules.length === 0 && (
                <Empty label={'No alert rules'} icon={<CiCircleAlert className={'fs-1'}/>}/>
              )
            }
          </div>
          <div className={'mt-3'}>
            <div className={'d-flex justify-content-between'}>
              <h4 className={'mb-0'}>Your Messages</h4>
              <div>
                <ButtonUnderline>
                  <h6 className={'mb-0'}>See all</h6>
                </ButtonUnderline>
              </div>
            </div>
            <hr/>
            {
              channel?.alert_rules.length === 0 && (
                <Empty label={'No messages yet'} icon={<BiMessageDetail className={'fs-1'}/>}/>
              )
            }
          </div>
        </CTabPane>
        <CTabPane role="tabpanel"
                  className={'mt-2'}
                  aria-labelledby="home-tab" visible={activeKey === 1}>
        </CTabPane>
      </CTabContent>
    </div>
  )
}
