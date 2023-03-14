import {CardBody} from "reactstrap";
import {CardWrapper} from "../../components/card/CardWrapper";
import {CircleIcon} from "../../components/card/CircleIcon";
import {MdEmail} from "react-icons/md";
import {AiFillEdit, AiOutlineRight} from "react-icons/ai";
import {ClickableCard} from "../../components/card/ClickableCard";
import React, {useEffect} from "react";
import {CiRoute} from "react-icons/ci";

export const SubscriptionCard = (props) => {
  const {subscription} = props;

  return (
    <ClickableCard>
      <CardBody>
        <CardWrapper>
          <div className={'d-flex gap-3 flex-wrap'}>
            <CircleIcon>
              <CiRoute/>
            </CircleIcon>
            <div>
              <h6>{subscription.alert_rule.label}</h6>
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
