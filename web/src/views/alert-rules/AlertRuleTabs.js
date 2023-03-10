import {CNav, CNavItem, CNavLink, CTabContent, CTabPane} from "@coreui/react";
import {Badge, Card, CardBody} from "reactstrap";
import React, {useEffect, useState} from "react";

export const AlertRuleTabs = (props) => {
  const [activeKey, setActiveKey] = useState()

  useEffect(() => {
    if (props.channel?.alert_rules?.length > 0) {
      setActiveKey(0)
    }
  }, [props.channel])

  const {channel} = props
  return (
    <div>
      {
        channel?.alert_rules?.length > 0 && (
          <div>
            <CNav variant={"tabs"}>
              {
                channel?.alert_rules?.map(
                  (alertRule, index) => {
                    return (
                      <CNavItem>
                        <CNavLink href="#!"
                                  active={activeKey === index}
                                  onClick={() => setActiveKey(index)}>
                          {alertRule.label}
                        </CNavLink>
                      </CNavItem>
                    )
                  }
                )
              }
            </CNav>
            <CTabContent>
              {
                channel?.alert_rules?.map(
                  (alertRule, index) => {
                    return (
                      <CTabPane role="tabpanel"
                                className={'mt-2'}
                                aria-labelledby="home-tab" visible={activeKey === index}>
                        <Card key={index}>
                          <CardBody>
                            <h4>Rule {alertRule.label}</h4>
                            <div className={'d-flex gap-2 flex-wrap'}>
                              <div className={'d-flex gap-2'}>
                                <h6>Levels</h6>
                                <div className={'d-flex gap-1'}>
                                  {
                                    alertRule.levels.map(
                                      (level, index) => {
                                        return (
                                          <div key={index}>
                                            <Badge
                                              pill
                                            >
                                              {level}
                                            </Badge>
                                          </div>
                                        )
                                      }
                                    )
                                  }
                                </div>
                              </div>
                              <div className={'d-flex gap-2'}>
                                <h6>
                                  Priorities
                                </h6>
                                <div className={'d-flex gap-1'}>
                                  {
                                    alertRule.priorities.map(
                                      (priority, index) => {
                                        return (
                                          <div key={index}>
                                            <Badge
                                              pill
                                            >
                                              {priority}
                                            </Badge>
                                          </div>
                                        )
                                      }
                                    )
                                  }
                                </div>
                              </div>
                            </div>
                            <div className={'mt-4'}>
                              <h6>Logic is "{alertRule.logic}"</h6>
                              <ul>
                                {
                                  alertRule.rules.map(
                                    (rule, index) => {
                                      return (
                                        <li key={index}>Trigger when {rule.type} <Badge>{rule.key}</Badge> {rule.operator} {rule.value}</li>
                                      )
                                    }
                                  )
                                }
                              </ul>
                            </div>
                          </CardBody>
                        </Card>
                      </CTabPane>
                    )
                  }
                )
              }
            </CTabContent>
          </div>
        )
      }
      {
        channel?.alert_rules?.length === 0 && <p className={'mb-0'}>There are no rules for this channel</p>
      }
    </div>
  )
}
