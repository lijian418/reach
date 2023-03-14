import {AlertRuleChannelEdit} from "./AlertRuleChannelEdit";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import {api} from "../../api";
import {Button} from "reactstrap";

const EditRules = (props) => {
  let { alertRuleId } = useParams();
  const [alertRule, setAlertRule] = useState()
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
  }

  return (
    <>
      <Button color={'link'}
              className={'p-0'}
              onClick={() => navigate(`/alert-rules/${alertRuleId}`)}>Go Back
      </Button>
      <h3>Editing rules of {alertRule?.label}</h3>
      <div className={'mt-4'}>
        {
          alertRule && (
            <AlertRuleChannelEdit alertRule={alertRule} />
          )
        }
      </div>
    </>
  )
}

export default EditRules
