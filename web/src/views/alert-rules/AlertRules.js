import React, {useState} from 'react'
import CreateAlertRuleModal from "./CreateAlertRuleModal";
import {AlertRuleList} from "./AlertRuleList";

const AlertRules = () => {
  const [refetchAt, setRefetchAt] = useState(new Date())

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <h2>Alert Rules</h2>
        <CreateAlertRuleModal refetch={() => setRefetchAt(new Date())}/>
      </div>
      <AlertRuleList refetchAt={refetchAt}/>
    </>
  )
}

export default AlertRules
