import React, {useState} from 'react'
import CreateAlertEndpointModal from "./CreateAlertEndpointModal";
import {AlertEndpointList} from "./AlertEndpointList";

const AlertEndpoints = () => {
  const [refetchAt, setRefetchAt] = useState(new Date())

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <h2>Alert Endpoints</h2>
        <CreateAlertEndpointModal refetch={() => setRefetchAt(new Date())}/>
      </div>
      <AlertEndpointList refetchAt={refetchAt}/>
    </>
  )
}

export default AlertEndpoints
