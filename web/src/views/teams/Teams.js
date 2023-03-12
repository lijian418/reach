import React, {useState} from 'react'
import CreateTeamModal from "./modal/CreateTeamModal";
import {TeamList} from "./TeamList";
import {BiGroup} from "react-icons/bi";

const Teams = () => {
  const [refetchAt, setRefetchAt] = useState(new Date())

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <h2><BiGroup/> Teams</h2>
        <CreateTeamModal refetch={() => setRefetchAt(new Date())}/>
      </div>
      <div className={'mt-4'}>
        <TeamList refetchAt={refetchAt}/>
      </div>
    </>
  )
}

export default Teams
