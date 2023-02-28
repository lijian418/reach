import React from 'react'
import CreateChannelModal from "./CreateChannelModal";
import {ChannelList} from "./ChannelList";

const Channels = () => {

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <h2>Channels</h2>
        <CreateChannelModal/>
      </div>
      <ChannelList/>
    </>
  )
}

export default Channels
