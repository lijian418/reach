import React, {useState} from 'react'
import CreateAlertRouteModal from "./CreateAlertRouteModal";
import {AlertRouteList} from "./AlertRouteList";

const AlertRoutes = () => {
  const [refetchAt, setRefetchAt] = useState(new Date())

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <h2>Alert Routes</h2>
        <CreateAlertRouteModal refetch={() => setRefetchAt(new Date())}/>
      </div>
      <AlertRouteList refetchAt={refetchAt}/>
    </>
  )
}

export default AlertRoutes
