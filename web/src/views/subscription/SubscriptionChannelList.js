import React, {useState} from "react";
import useAsyncEffect from "use-async-effect";
import {useUser} from "../../hooks/useUser";
import {api} from "../../api";
import {SubscriptionCard} from "./SubscriptionCard";
import {Empty} from "../../components/Empty";
import {BiAddToQueue} from "react-icons/bi";
import {useNavigate} from "react-router-dom";

export const SubscriptionChannelList = (props) => {
  const [subscriptions, setSubscriptions] = useState()
  const {user} = useUser()
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    if (props.channel.id && user) {
      const {data} = await api.subscription.find({
        user_id: user.id,
        channel_id: props.channel.id,
        limit: 2,
        skip: 0
      })
      setSubscriptions(data.items)
    }
  }, [user, props])

  return (
    <div>
      {subscriptions && subscriptions.map((subscription) => (
        <SubscriptionCard key={subscription.id}
                          subscription={subscription}/>
      ))}
      {
        subscriptions && subscriptions.length === 0 && (
          <Empty label={'No subscriptions'} icon={<BiAddToQueue className={'fs-1'}/>}/>
        )
      }
    </div>
  )
}
