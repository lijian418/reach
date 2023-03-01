import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import {useState} from "react";
import {api} from "../../api";
import {Badge} from "reactstrap";
import EditChannelModal from "./EditChannelModal";
import CreateTagModal from "./tags/CreateTagModal";
import {TagList} from "./tags/TagList";
import CreateAlertRouteModal from "../alert-routes/CreateAlertRouteModal";
import AssignAlertRouteModal from "../alert-routes/AssignAlertRouteModal";

const ChannelDetail = () => {
  let { channelId } = useParams();
  const [channel, setChannel] = useState()

  useAsyncEffect(async() => {
    await fetchChannel()
  }, [channelId])

  const fetchChannel = async () => {
    const {data} = await api.channel.get(channelId)
    setChannel(data)
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
        <EditChannelModal channel={channel} refetch={fetchChannel}/>
      </div>

      <div className={'mt-4'}>
        <div className={'d-flex justify-content-between mb-4'}>
          <h3>Tags</h3>
          {
            channel && (
              <CreateTagModal channel={channel} refetch={fetchChannel}/>
            )
          }
        </div>
        <TagList channel={channel} refetch={fetchChannel}/>
      </div>

      <div className={'mt-4'}>
        <div className={'d-flex justify-content-between mb-4'}>
          <h3>Alert Routes</h3>
          {
            channel && (
              <AssignAlertRouteModal/>
            )
          }
        </div>
      </div>
    </>
  )
}

export default ChannelDetail
