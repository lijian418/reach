import {useNavigate, useNavigation, useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useEffect, useState} from "react";
import {api} from "../../api";
import EditAlertRuleModal from "./EditAlertRuleModal";
import {Badge, Button, Input} from "reactstrap";
import {AlertRuleTryDataModal} from "./AlertRuleTryDataModal";
import {DeleteAlertRuleModal} from "./DeleteAlertRuleModal";

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
    setAlertRule(data)
    setLocalAlertRule(data)
  }

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <div>
          <h2>Alert Rule Details - {alertRule?.label}</h2>
        </div>
        <div className={'d-flex gap-2'}>
          <DeleteAlertRuleModal delete={async () => {
            await api.alertRule.remove(alertRuleId)
            navigate(`/alert-rules`)
          }} alertRule={alertRule} />
          <EditAlertRuleModal alertRule={alertRule} refetch={fetchAlertRule}/>
        </div>
      </div>
      <div className={'d-flex justify-content-between mt-4'}>
        <h3>Rules</h3>
        <div className={'d-flex gap-2'}>
          <AlertRuleTryDataModal alertRule={alertRule}/>
          <div>
            <Button onClick={() => navigate(`edit-rules`)} color={'primary'}>
              Edit Rules
            </Button>
          </div>
        </div>
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
          alertRule && alertRule?.rules.map((rule, index) => {
            return (
              <li>Trigger when {rule.type} <Badge>{rule.key}</Badge> {rule.operator} {rule.value}</li>
            )
          })
        }
      </ul>
    </>
  )
}

export default AlertRuleDetail
