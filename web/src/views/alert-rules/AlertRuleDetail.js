import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useEffect, useState} from "react";
import {api} from "../../api";
import EditAlertRuleModal from "./EditAlertRuleModal";
import {AlertRuleEditForm} from "./AlertRuleEditForm";
import {AlertRuleTryData} from "./AlertRuleTryData";

const AlertRuleDetail = () => {
  let { alertRuleId } = useParams();
  const [alertRule, setAlertRule] = useState()
  const [localAlertRule, setLocalAlertRule] = useState()

  useAsyncEffect(async() => {
    await fetchAlertRule()
  }, [alertRuleId])

  const fetchAlertRule = async () => {
    let {data} = await api.alertRule.get(alertRuleId)
    if (data.rules.length === 0) {
      data.rules.push({ key: '', value: '', type: 'text', operator: '=='})
    }
    setAlertRule(data)
    setLocalAlertRule(data)
  }

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <div>
          <h2>Alert Rule Details</h2>
        </div>
        <EditAlertRuleModal alertRule={alertRule} refetch={fetchAlertRule}/>
      </div>
      {
        alertRule && (
          <AlertRuleEditForm alertRule={alertRule} setLocalAlertRule={setLocalAlertRule}/>
        )
      }
      <h3 className={'mt-4'}>Try data</h3>
      <AlertRuleTryData alertRule={alertRule} localAlertRule={localAlertRule}/>
    </>
  )
}

export default AlertRuleDetail
