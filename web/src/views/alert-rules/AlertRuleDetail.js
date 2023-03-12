import {useNavigate, useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useEffect, useState} from "react";
import {api} from "../../api";
import EditAlertRuleModal from "./EditAlertRuleModal";
import {Badge, Button, Card, CardBody, Input} from "reactstrap";
import {AlertRuleTryDataModal} from "./AlertRuleTryDataModal";
import {DeleteAlertRuleModal} from "./DeleteAlertRuleModal";
import {MdPriorityHigh} from "react-icons/md";
import {GrInfo, GrTrigger} from "react-icons/gr";
import {TbLogicNand, TbLogicNor} from "react-icons/tb";
import {BsSearch} from "react-icons/bs";
import {CNav, CNavItem, CNavLink, CTabContent, CTabPane} from "@coreui/react";
import {BiCog} from "react-icons/bi";

const AlertRuleDetail = () => {
  let { alertRuleId } = useParams();
  const [alertRule, setAlertRule] = useState()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState(0)

  useAsyncEffect(async() => {
    await fetchAlertRule()
  }, [alertRuleId])

  const fetchAlertRule = async () => {
    let {data} = await api.alertRule.get(alertRuleId)
    setAlertRule(data)
  }

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <div>
          <h2>Alert Rule Details - {alertRule?.label}</h2>
        </div>
        <div className={'d-flex gap-2'}>
          <DeleteAlertRuleModal delete={async () => {
            await api.alertRule.remove(alertRuleId)
            navigate(`/alert-rules`)
          }} alertRule={alertRule} />
          <EditAlertRuleModal alertRule={alertRule} refetch={fetchAlertRule}/>
        </div>
      </div>
      <CNav variant="tabs" className={'mt-4'}>
        <CNavItem>
          <CNavLink href="#!"
                    active={activeKey === 0}
                    onClick={() => setActiveKey(0)}>
            <BiCog/> Configuration
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel"
                  className={'mt-2'}
                  aria-labelledby="home-tab" visible={activeKey === 0}>
          <div>
            <div className={'d-flex justify-content-end mt-4'}>
              <div className={'d-flex gap-2'}>
                <AlertRuleTryDataModal alertRule={alertRule}/>
                <div>
                  <Button onClick={() => navigate(`edit-rules`)} color={'primary'}>
                    Edit Rules
                  </Button>
                </div>
              </div>
            </div>
            <h3 className={'mt-4'}><GrInfo/> Levels</h3>
            <Card>
              <CardBody>
                <div className={'d-flex gap-4'}>
                  <div className={'d-flex flex-wrap gap-4'}>
                    <div>
                      <Input type="checkbox" checked={alertRule?.levels?.includes('info')} disabled /> Info
                    </div>
                    <div>
                      <Input type="checkbox" checked={alertRule?.levels?.includes('warning')} disabled /> Warning
                    </div>
                    <div>
                      <Input type="checkbox" checked={alertRule?.levels?.includes('error')} disabled /> Error
                    </div>
                    <div>
                      <Input type="checkbox" checked={alertRule?.levels?.includes('success')} disabled /> Success
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <h3 className={'mt-4'}><MdPriorityHigh/> Priorities</h3>
            <Card>
              <CardBody>
                <div>
                  <div className={'d-flex flex-wrap gap-4'}>
                    <div>
                      <Input type="checkbox" checked={alertRule?.priorities?.includes('low')} disabled /> Low
                    </div>
                    <div>
                      <Input type="checkbox" checked={alertRule?.priorities?.includes('medium')} disabled /> Medium
                    </div>
                    <div>
                      <Input type="checkbox" checked={alertRule?.priorities?.includes('high')} disabled /> High
                    </div>
                    <div>
                      <Input type="checkbox" checked={alertRule?.priorities?.includes('urgent')} disabled /> Urgent
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <h3 className={'mt-4'}>
              {alertRule?.logic === 'and' ? <TbLogicNand/> : <TbLogicNor/>} Logic
            </h3>
            <Card>
              <CardBody>
                <h6>
                  {
                    alertRule?.logic === 'and' ? 'Logic is "AND", all conditions must be true' : 'Logic is "OR", at least one condition must be true'
                  }
                </h6>
              </CardBody>
            </Card>
            <h3 className={'mt-4'}><GrTrigger/> Conditions</h3>
            <Card>
              <CardBody>
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
                  alertRule && alertRule?.rules.length === 0 && (
                    <div className={'d-flex justify-content-center flex-column align-items-center'}>
                      <BsSearch className={'fs-1'}/>
                      <h5 className={'text-center mt-2 text-muted'}>No conditions added</h5>
                    </div>
                  )
                }
              </CardBody>
            </Card>
          </div>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default AlertRuleDetail
