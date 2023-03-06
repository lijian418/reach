import {useNavigate, useNavigation, useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useEffect, useState} from "react";
import {api} from "../../api";
import EditAlertRuleModal from "./EditAlertRuleModal";
import {AlertRuleTryData} from "./AlertRuleTryData";
import {EditRules} from "./EditRules";
import {Badge, Button, Input} from "reactstrap";

const AlertRuleDetail = () => {
  let { alertRuleId } = useParams();
  const [alertRule, setAlertRule] = useState()
  const [localAlertRule, setLocalAlertRule] = useState()
  const navigate = useNavigate()

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
          <h2>Alert Rule Details - {alertRule?.label}</h2>
        </div>
        <EditAlertRuleModal alertRule={alertRule} refetch={fetchAlertRule}/>
      </div>
      <div className={'d-flex justify-content-between mt-4'}>
        <h3>Rules</h3>
        <Button onClick={() => navigate(`edit-rules`)}>
          Edit Rules
        </Button>
      </div>
      <h6>Logic applied: <Badge>{alertRule?.logic}</Badge></h6>

      <div className={'d-flex gap-4'}>
        <h6>Levels accepted:</h6>
        <div className={'d-flex flex-wrap gap-4'}>
          <div>
            <Input type="checkbox" checked={alertRule?.levels?.includes('info')} disabled /> Info
          </div>
          <div>
            <Input type="checkbox" checked={alertRule?.levels?.includes('warning')} disabled /> Warning
          </div>
          <div>
            <Input type="checkbox" checked={alertRule?.levels?.includes('error')} disabled /> Error
          </div>
          <div>
            <Input type="checkbox" checked={alertRule?.levels?.includes('success')} disabled /> Success
          </div>
        </div>
      </div>
      <h6>Triggers:</h6>
      <ul>
        {
          alertRule && alertRule.rules.map((rule, index) => {
            return (
              <li>Trigger when {rule.key}({rule.type}) {rule.operator} {rule.value}</li>
            )
          })
        }
      </ul>
      <h3 className={'mt-4'}>Try data</h3>
      <AlertRuleTryData alertRule={alertRule} />
    </>
  )
}

export default AlertRuleDetail
