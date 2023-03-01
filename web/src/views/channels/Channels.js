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
      <ChannelList refetchAt={refetchAt}/>
    </>
  )
}

export default Channels
