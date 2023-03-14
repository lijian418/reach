import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {CircleIcon, CircleIconButton} from "../../components/card/CircleIcon";
import {AiOutlineLeft} from "react-icons/ai";
import React, {useState} from "react";
import {Button, Card, CardBody} from "reactstrap";
import {RiUserReceived2Line} from "react-icons/ri";
import useAsyncEffect from "use-async-effect";
import {api} from "../../api";
import AlertRuleDetail from "../alert-rules/AlertRuleDetail";

const SubscriptionDetail = () => {
  const navigate = useNavigate();
  const {subscriptionId} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [subscription, setSubscription] = useState()
  const [alertRule, setAlertRule] = useState()

  useAsyncEffect(async () => {
    if (subscriptionId) {
      const {data} = await api.subscription.get(subscriptionId)
      setSubscription(data)
      setAlertRule(data.alert_rule)
    }
  }, [subscriptionId])

  const goBack = () => {
    if (searchParams.get('from') === 'subscriptions') {
      navigate(`/channels/${subscription.channel_id}/subscriptions`)
    } else {
      navigate(`/channels/${subscription.channel_id}`)
    }
  }

  return (
    <div>
      {
        subscription && alertRule && (
          <div className={'d-flex gap-4 flex-column'}>
            <CircleIconButton onClick={goBack}>
              <AiOutlineLeft/>
            </CircleIconButton>
            <h2>Subscription Detail</h2>
            <Card>
              <CardBody>
                <div className={'d-flex gap-3 justify-content-between flex-wrap'}>
                  <div className={'d-flex gap-3'}>
                    <CircleIcon>
                      <RiUserReceived2Line/>
                    </CircleIcon>
                    <div>
                      <h5>{alertRule.label}</h5>
                      <p className={'text-muted mb-0'}>Subscribed</p>
                    </div>
                  </div>
                  <div className={'d-flex gap-2'}>
                    <div>
                      <Button color={'primary'}
                              onClick={() => navigate(`/channels/${subscription.channel_id}/subscriptions/${subscription.id}/edit`)}
                              outline>
                        Edit
                      </Button>
                    </div>
                    <div>
                      <Button color={'danger'} outline>
                        Unsubscribe
                      </Button>
                    </div>
                  </div>

                </div>
                <hr/>
                <AlertRuleDetail alertRule={alertRule}/>
              </CardBody>
            </Card>
          </div>
        )
      }
    </div>
  )
}

export default SubscriptionDetail
