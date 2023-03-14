import {Formik} from "formik";
import React, {useState} from "react";
import {api} from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import {alertRuleChannelSchema} from "./AlertRuleChannelSchema";
import {AlertRuleChannelForm} from "./AlertRuleChannelForm";
import useAsyncEffect from "use-async-effect";

const AlertRuleChannelEdit = () => {
  const {channelId, alertRuleId} = useParams()
  const navigate = useNavigate()
  const [alertRule, setAlertRule] = useState()

  useAsyncEffect(async () => {
    const {data} = await api.alertRule.get(alertRuleId)
    setAlertRule(data)
  }, [])


  const update = async (values) => {
    const {data} = await api.alertRule.update(alertRule.id, {
      channel_id: channelId,
      label: values.label,
      logic: values.logic,
      rules: values.rules,
      levels: values.levels,
      priorities: values.priorities,
      destination_ids: values.destination_ids
    })
    navigate(`/channels/${channelId}/alert-rules/${alertRule.id}`)
  }

  return (
    <>
      {
        alertRule && (
          <Formik
            initialValues={{
              label: alertRule.label,
              logic: alertRule.logic,
              levels: alertRule.levels,
              priorities: alertRule.priorities,
              rules: alertRule.rules.length > 0 ? alertRule.rules : [{key: '', type: 'text', operator: '==', value: ''}],
              destination_ids: []
            }}
            validationSchema={alertRuleChannelSchema}
            onSubmit={(values) => update(values)}
          >
            {(formik) => (
              <AlertRuleChannelForm formik={formik}/>
            )}
          </Formik>
        )
      }
    </>
  )
}

export default AlertRuleChannelEdit
