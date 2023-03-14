import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useState} from "react";
import {api} from "../../api";
import {ChannelDetailAccordion} from "./accordion/ChannelDetailAccordion";
import {ChannelDetailTabs} from "./tabs/ChannelDetailTabs";
import {ButtonUnderline} from "../../components/ButtonUnderline";

const ChannelDetail = () => {
  let { channelId } = useParams();
  const [channel, setChannel] = useState()

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
      {
        channel && (
          <div className={'d-flex gap-4 flex-column'}>
            <div>
              <h3>{channel.label}</h3>
              <p className={'text-muted'}>{channel.description}</p>
            </div>
            <div>
              <ChannelDetailTabs channel={channel} refetch={fetchChannel}/>
              <h4 className={'mb-0 mt-4'}>Channel</h4>
              <hr/>
            </div>
            <div>
              <ChannelDetailAccordion channel={channel} refetch={fetchChannel}/>
            </div>
          </div>
        )
      }
    </>
  )
}

export default ChannelDetail
