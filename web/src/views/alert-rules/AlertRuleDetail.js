import {useNavigate, useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useState} from "react";
import {api} from "../../api";
import {Badge, Button, Card, CardBody, Input} from "reactstrap";
import {DeleteAlertRuleModal} from "./DeleteAlertRuleModal";
import {MdPriorityHigh} from "react-icons/md";
import {GrInfo, GrTrigger} from "react-icons/gr";
import {TbLogicNand, TbLogicNor} from "react-icons/tb";
import {BsSearch} from "react-icons/bs";
import {CNav, CNavItem, CNavLink, CTabContent, CTabPane} from "@coreui/react";
import {BiCog} from "react-icons/bi";

const AlertRuleDetail = (props) => {
  const {alertRule} = props

  return (
    <div className={'d-flex flex-wrap gap-4 justify-content-between px-4'}>
      <div>
        <h6>Condition details</h6>
        <ul>
          {
            alertRule && alertRule?.rules.map((rule, index) => {
              return (
                <li>Trigger when {rule.type} <Badge>{rule.key}</Badge> {rule.operator} {rule.value}</li>
              )
            })
          }
        </ul>
        {
          alertRule && alertRule.rules.length === 0 && (
            <div className={'d-flex justify-content-center flex-column align-items-center'}>
              <BsSearch className={'fs-1'}/>
              <h5 className={'text-center mt-2 text-muted'}>No conditions added</h5>
            </div>
          )
        }
      </div>
      <div>
        <h6>Logic</h6>
        {
          alertRule.logic === 'and' ? 'Logic is "AND", all conditions must be true' : 'Logic is "OR", at least one condition must be true'
        }
      </div>
      <div>
        <div>
          <h6>Level</h6>
          <div className={'d-flex gap-4'}>
            <div className={'d-flex flex-wrap gap-4'}>
              <div>
                <Input type="checkbox" checked={alertRule.levels.includes('info')} disabled /> Info
              </div>
              <div>
                <Input type="checkbox" checked={alertRule.levels.includes('warning')} disabled /> Warning
              </div>
              <div>
                <Input type="checkbox" checked={alertRule.levels.includes('error')} disabled /> Error
              </div>
              <div>
                <Input type="checkbox" checked={alertRule.levels.includes('success')} disabled /> Success
              </div>
            </div>
          </div>
        </div>
        <div className={'mt-4'}>
          <h6>Priority</h6>
          <div>
            <div className={'d-flex flex-wrap gap-4'}>
              <div>
                <Input type="checkbox" checked={alertRule.priorities.includes('low')} disabled /> Low
              </div>
              <div>
                <Input type="checkbox" checked={alertRule.priorities.includes('medium')} disabled /> Medium
              </div>
              <div>
                <Input type="checkbox" checked={alertRule.priorities.includes('high')} disabled /> High
              </div>
              <div>
                <Input type="checkbox" checked={alertRule.priorities.includes('urgent')} disabled /> Urgent
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertRuleDetail
