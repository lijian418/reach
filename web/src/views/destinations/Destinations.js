import React, {useState} from 'react'
import CreateDestinationModal from "./modal/CreateDestinationModal";
import {DestinationList} from "./DestinationList";
import {BiGroup} from "react-icons/bi";

const Destinations = () => {
  const [refetchAt, setRefetchAt] = useState(new Date())

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <h2>Destinations</h2>
        <CreateDestinationModal refetch={() => setRefetchAt(new Date())}/>
      </div>
      <div className={'mt-4'}>
        <DestinationList refetchAt={refetchAt}/>
      </div>
    </>
  )
}

export default Destinations
