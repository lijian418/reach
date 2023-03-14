import {CardBody} from "reactstrap";
import {CardWrapper} from "../../components/card/CardWrapper";
import {CircleIcon} from "../../components/card/CircleIcon";
import {MdEmail} from "react-icons/md";
import {AiFillEdit, AiOutlineRight} from "react-icons/ai";
import {ClickableCard} from "../../components/card/ClickableCard";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {RiUserReceived2Line} from "react-icons/ri";

export const SubscriptionCard = (props) => {
  const {subscription, from} = props;
  const navigate = useNavigate()

  const goToDetail = () => {
    if (from === 'subscriptions') {
      navigate(`/channels/${subscription.channel_id}/subscriptions/${subscription.id}?from=subscriptions`)
    } else {
      navigate(`/channels/${subscription.channel_id}/subscriptions/${subscription.id}`)
    }
  }

  return (
    <ClickableCard onClick={goToDetail}>
      <CardBody>
        <CardWrapper>
          <div className={'d-flex gap-3 flex-wrap'}>
            <CircleIcon>
              <RiUserReceived2Line/>
            </CircleIcon>
            <div>
              <h6>{subscription.alert_rule.label}</h6>
              <p className={'text-muted'}>
                {subscription.alert_rule.rules.length} condition{subscription.alert_rule.rules.length > 1 ? 's' : ''} set
              </p>
            </div>
          </div>
          <div>
            <AiOutlineRight/>
          </div>
        </CardWrapper>
      </CardBody>
    </ClickableCard>
  )
}
