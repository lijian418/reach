import React, {useState} from 'react'
import CreateChannelModal from "./CreateChannelModal";
import {ChannelList} from "./ChannelList";

const Channels = () => {
  const [refetchAt, setRefetchAt] = useState(new Date())
  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <h2>Channels</h2>
        <CreateChannelModal refetch={() => setRefetchAt(new Date())}/>
      </div>
      <div className={'mt-4'}>
        <ChannelList refetchAt={refetchAt}/>
      </div>
    </>
  )
}

export default Channels
