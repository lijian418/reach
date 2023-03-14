import {Form, Formik} from "formik";
import React, {useState} from "react";
import {api} from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import {subscriptionSchema} from "./SubscriptionSchema";
import {AlertRuleForm} from "../alert-rules/AlertRuleForm";
import {Button} from "reactstrap";
import {CircleIconButton} from "../../components/card/CircleIcon";
import {AiOutlineLeft} from "react-icons/ai";

const SubscriptionEdit = () => {
  const navigate = useNavigate()
  const {subscriptionId} = useParams()
  const [subscription, setSubscription] = useState()

  useAsyncEffect(async () => {
    const {data} = await api.subscription.get(subscriptionId)
    setSubscription(data)
  }, [])

  const update = async (values) => {
    const {data} = await api.alertRule.update(subscription.alert_rule_id, {
      label: values.label,
      logic: values.logic,
      rules: values.rules,
      levels: values.levels,
      priorities: values.priorities,
      destination_ids: values.destination_ids
    })
    navigate(`/channels/${subscription.channel_id}/subscriptions/${subscription.id}`)
  }

  return (
    <div>
      <CircleIconButton onClick={() => navigate(`/channels/${subscription.channel_id}/subscriptions/${subscription.id}`)}>
        <AiOutlineLeft/>
      </CircleIconButton>
      <h3 className={'mt-4'}>Edit subscription</h3>
      {
        subscription && (
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
                <div className={'mt-3 d-flex justify-content-end'}>
                  <Button
                    type={'submit'}
                    color={'primary'}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )
      }
    </div>
  )
}

export default SubscriptionEdit
