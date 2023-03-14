import {Form, Formik} from "formik";
import React, {useState} from "react";
import {api} from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../hooks/useUser";
import {subscriptionSchema} from "./SubscriptionSchema";
import {AlertRuleForm} from "../alert-rules/AlertRuleForm";
import useAsyncEffect from "use-async-effect";
import {CircleIcon, CircleIconButton} from "../../components/card/CircleIcon";
import {AiOutlineLeft} from "react-icons/ai";
import {Button} from "reactstrap";

const SubscriptionCreate = () => {
  const navigate = useNavigate()
  const {channelId} = useParams()
  const {user} = useUser()

  const [channel, setChannel] = useState()

  useAsyncEffect(async () => {
    const {data} = await api.channel.get(channelId)
    setChannel(data)
  }, [channelId])

  const create = async (values) => {
    const {data} = await api.subscription.create({
      user_id: user?.id,
      channel_id: channelId,
      alert_rule: {
        label: values.label,
        logic: values.logic,
        rules: values.rules,
        levels: values.levels,
        priorities: values.priorities
      }
    })
    navigate(`/channels/${channelId}/subscriptions/${data.id}`)
  }

  return (
    <div>
      <CircleIconButton onClick={() => navigate(`/channels/${channelId}`)}>
        <AiOutlineLeft/>
      </CircleIconButton>
      <h3 className={'mt-4'}>Create your subscription on {channel?.label}</h3>
      <Formik
        initialValues={{
          label: '',
          logic: 'and',
          levels: ["info", "warning", "error", "success"],
          priorities: ["low", "medium", "high", "urgent"],
          rules: [{key: '', type: 'text', operator: '==', value: ''}]
        }}
        validationSchema={subscriptionSchema}
        onSubmit={(values) => create(values)}
      >
        {(formik) => (
          <Form>
            <AlertRuleForm formik={formik} />
            <div className={'mt-3 d-flex justify-content-end'}>
              <Button
                type={'submit'}
                color={'primary'}
              >
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SubscriptionCreate
