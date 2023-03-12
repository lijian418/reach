import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useState} from "react";
import {api} from "../../api";
import {Badge, Button, Card, CardBody} from "reactstrap";
import EditChannelModal from "./EditChannelModal";
import DeleteModal from "../../components/DeleteModal";
import {CNav, CNavItem, CNavLink, CTabContent, CTabPane} from "@coreui/react";
import {FaEnvelope} from "react-icons/fa";
import {MessageChannelList} from "./MessageChannelList";
import SendMessage from "./SendMessage";
import {cilWarning} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {RiSignalTowerFill} from "react-icons/ri";
import {AiOutlineSetting, AiOutlineTeam, AiOutlineUser} from "react-icons/ai";
import {RxLinkBreak2} from "react-icons/rx";

const ChannelDetail = () => {
  let { channelId } = useParams();
  const [channel, setChannel] = useState()
  const [activeKey, setActiveKey] = useState(0)

  useAsyncEffect(async() => {
    await fetchChannel()
  }, [channelId])

  const fetchChannel = async () => {
    const {data} = await api.channel.get(channelId)
    setChannel(data)
    return data
  }

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <div>
          <h2>{channel?.label}</h2>
          <div className={'d-flex gap-1'}>
            <p className={'mb-0'}>Slug for Channel Message identification is</p>
            <div>
              <Badge>{channel?.slug}</Badge>
            </div>
          </div>
        </div>
      </div>
      <div className={'mt-4'}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink href="#!"
                      active={activeKey === 0}
                      onClick={() => setActiveKey(0)}>
              <FaEnvelope/> Messages
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!"
                      active={activeKey === 1}
                      onClick={() => setActiveKey(1)}>
              <CIcon icon={cilWarning} /> Alert Rules
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!"
                      active={activeKey === 2}
                      onClick={() => setActiveKey(2)}>
              <AiOutlineSetting/> Settings
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel"
                    className={'mt-2'}
                    aria-labelledby="home-tab" visible={activeKey === 0}>
            <div className={'mt-4'}>
              <div className={'d-flex justify-content-end mb-4 '}>
                <SendMessage channel={channel}/>
              </div>
              {
                channel && <MessageChannelList channel={channel}/>
              }
            </div>
          </CTabPane>
          <CTabPane role="tabpanel"
                    className={'mt-2'}
                    aria-labelledby="home-tab" visible={activeKey === 1}>
          </CTabPane>
          <CTabPane role="tabpanel"
                    className={'mt-2'}
                    aria-labelledby="home-tab" visible={activeKey === 2}>
            <div className={'d-flex gap-2'}>
              <DeleteModal delete={async () => {
                await api.channel.remove(channelId)
                window.location.href = '/channels'
              }} />
              <EditChannelModal channel={channel} refetch={fetchChannel}/>
            </div>
          </CTabPane>
        </CTabContent>

      </div>
    </>
  )
}

export default ChannelDetail
