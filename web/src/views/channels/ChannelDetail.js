import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import {useState} from "react";
import {api} from "../../api";
import {Badge} from "reactstrap";
import EditChannelModal from "./EditChannelModal";

const ChannelDetail = () => {
  let { channelId } = useParams();
  const [channel, setChannel] = useState()

  useAsyncEffect(async() => {
    await fetchChannel()
  }, [channelId])

  const fetchChannel = async () => {
    const {data} = await api.channels.get(channelId)
    setChannel(data)
  }

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <div>
          <h3>{channel?.label}</h3>
          <div className={'d-flex gap-1'}>
            <p className={'mb-0'}>Slug for API identification is</p>
            <div>
              <Badge>{channel?.slug}</Badge>
            </div>
          </div>
        </div>

        <EditChannelModal channel={channel} refetch={fetchChannel}/>
      </div>
    </>
  )
}

export default ChannelDetail