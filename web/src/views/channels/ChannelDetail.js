import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useState} from "react";
import {api} from "../../api";
import {Badge, Button, Card, CardBody} from "reactstrap";
import EditChannelModal from "./EditChannelModal";
import {CreateAlarmsModal} from "./CreateAlarmsModal";
import SendMessage from "./SendMessage";
import {MessageChannelList} from "./MessageChannelList";
import DeleteModal from "../../components/DeleteModal";
import EditRulesOnChannel from "./EditRulesOnChannel";
import {CNav, CNavItem, CNavLink, CTabContent, CTabPane} from "@coreui/react";
import {AlertRuleTabs} from "../alert-rules/AlertRuleTabs";

const ChannelDetail = () => {
  let { channelId } = useParams();
  const [channel, setChannel] = useState()

  useAsyncEffect(async() => {
    const fetched = await fetchChannel()
  }, [channelId])

  const fetchChannel = async () => {
    const {data} = await api.channel.get(channelId)
    setChannel(data)
    return data
  }

  const removeAlarm = async (alarmId) => {
    await api.alarm.remove(alarmId)
    await fetchChannel()
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
        <div className={'d-flex gap-2'}>
          <DeleteModal delete={async () => {
            await api.channel.remove(channelId)
            window.location.href = '/channels'
          }} />
          <EditChannelModal channel={channel} refetch={fetchChannel}/>
        </div>
      </div>
      <div className={'d-flex mt-4 justify-content-between'}>
        <h3>Subscribable Rules</h3>
        {
          channel && (
            <EditRulesOnChannel channel={channel} refetch={fetchChannel}/>
          )
        }
      </div>
      <div className={'mt-4'}>
        <AlertRuleTabs channel={channel}/>
      </div>

      <div className={'d-flex mt-4 justify-content-between'}>
        <div>
          <h3>Alarms</h3>
          <div className={'d-flex gap-1'}>
            <p className={'mb-0'}>There are</p>
            <div>
              <Badge>{channel?.alarms?.length}</Badge>
            </div>
            <p className={'mb-0'}>alarms for this channel</p>
          </div>
        </div>
        <CreateAlarmsModal channel={channel} refetch={fetchChannel}/>
      </div>
      <div className={'mt-4'}>
        {
          channel?.alarms?.map((alarm, index) => (
            <div key={index}>
              <div className={'d-flex gap-1'}>
                <div>
                  <Badge>
                    Alarm {alarm.label}
                  </Badge>
                </div>
                <p className={'mb-0'}> - When Alert</p>
                <div>
                  <Badge>{alarm.rule.label}</Badge>
                </div>
                <p className={'mb-0'}>is triggered, alert endpoint</p>
                <div>
                  <Badge>{alarm.endpoint.label}</Badge>
                </div>
                <Button color={'link'}
                        onClick={() => removeAlarm(alarm.id)}
                        className={'p-0 m-0'}>
                  Remove
                </Button>
              </div>
            </div>
          ))
        }
      </div>

      <div className={'d-flex mt-4 justify-content-between'}>
        <div>
          <h3>Messages</h3>
        </div>
        <SendMessage channel={channel}/>
      </div>
      {
        channel && <MessageChannelList channel={channel}/>
      }
    </>
  )
}

export default ChannelDetail
