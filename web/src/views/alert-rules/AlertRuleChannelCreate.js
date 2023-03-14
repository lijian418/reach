import {Form, Formik} from "formik";
import React from "react";
import {api} from "../../api";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {AlertRuleForm} from "./AlertRuleForm";
import {alertRuleChannelSchema} from "./AlertRuleChannelSchema";
import {AlertRuleChannelForm} from "./AlertRuleChannelForm";

const AlertRuleChannelCreate = () => {
  const navigate = useNavigate()
  const {channelId} = useParams()

  const create = async (values) => {
    const {data} = await api.alertRule.create({
      channel_id: channelId,
      label: values.label,
      logic: values.logic,
      rules: values.rules,
      levels: values.levels,
      priorities: values.priorities,
      destination_ids: values.destination_ids
    })
    navigate(`/channels/${channelId}/alert-rules/${data.id}`)
  }

  return (
    <div>
      <Formik
        initialValues={{
          label: '',
          logic: 'and',
          levels: ["info", "warning", "error", "success"],
          priorities: ["low", "medium", "high", "urgent"],
          rules: [{key: '', type: 'text', operator: '==', value: ''}],
          destination_ids: []
        }}
        validationSchema={alertRuleChannelSchema}
        onSubmit={(values) => create(values)}
      >
        {(formik) => (
          <AlertRuleChannelForm formik={formik}/>
        )}
      </Formik>
    </div>
  )
}

export default AlertRuleChannelCreate
