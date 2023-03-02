import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import {useState} from "react";
import {api} from "../../api";
import EditAlertRuleModal from "./EditAlertRuleModal";
import {AlertRuleEditForm} from "./AlertRuleEditForm";

const AlertRuleDetail = () => {
  let { alertRuleId } = useParams();
  const [alertRule, setAlertRule] = useState()

  useAsyncEffect(async() => {
    await fetchAlertRule()
  }, [alertRuleId])

  const fetchAlertRule = async () => {
    const {data} = await api.alertRule.get(alertRuleId)
    setAlertRule(data)
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
          <AlertRuleEditForm alertRule={alertRule}/>
        )
      }
    </>
  )
}

export default AlertRuleDetail
