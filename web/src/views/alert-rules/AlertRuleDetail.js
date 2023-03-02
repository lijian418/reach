import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useState} from "react";
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
    const {data} = await api.alertRule.get(alertRuleId)
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
      <h3 className={'my-4'}>Try data</h3>
      <AlertRuleTryData alertRule={alertRule} localAlertRule={localAlertRule}/>
    </>
  )
}

export default AlertRuleDetail
