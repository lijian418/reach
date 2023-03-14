import {Form, Formik} from "formik";
import React, {useState} from "react";
import {api} from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import {subscriptionSchema} from "./SubscriptionSchema";
import {AlertRuleForm} from "../alert-rules/AlertRuleForm";
import {Button} from "reactstrap";

const SubscriptionEdit = () => {
  const navigate = useNavigate()
  const {subscriptionId} = useParams()
  const [subscription, setSubscription] = useState(null)

  useAsyncEffect(async () => {
    const {data} = await api.subscription.get(subscriptionId)
    setSubscription(data)
  }, [])

  const update = async (values) => {
    const {data} = await api.alertRule.update(subscription.alert_rule.id, {
      label: values.label,
      logic: values.logic,
      rules: values.rules,
      levels: values.levels,
      priorities: values.priorities,
      destination_ids: values.destination_ids
    })
    navigate(`/channels/${subscription.channel_id}/alert-rules/${subscription.alert_rule.id}`)
  }

  return (
    <Formik
      initialValues={{
        label: subscription.alert_rule.label,
        logic: subscription.alert_rule.logic,
        levels: subscription.alert_rule.levels,
        priorities: subscription.alert_rule.priorities,
        rules: subscription.alert_rule.rules.length > 0 ? subscription.alert_rule.rules : [{key: '', type: 'text', operator: '==', value: ''}],
        destination_ids: []
      }}
      validationSchema={subscriptionSchema}
      onSubmit={(values) => update(values)}
    >
      {(formik) => (
        <Form>
          <AlertRuleForm formik={formik}/>
          <Button
            type={'submit'}
            color={'primary'}
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SubscriptionEdit
