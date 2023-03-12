import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useState} from "react";
import {api} from "../../api";
import {Button, Card, CardBody, CardTitle} from "reactstrap";
import EditTeamModal from "./modal/EditTeamModal";
import TeamEmailModal from "./modal/TeamEmailModal";
import TeamWebhookModal from "./modal/TeamWebhookModal";
import {DeleteTeamModal} from "./modal/DeleteTeamModal";
import TeamUsersModal from "./modal/TeamUsersModal";
import {CNav, CNavItem, CNavLink, CTabContent, CTabPane} from "@coreui/react";
import {RiGroupLine} from "react-icons/ri";
import {AiOutlineMail, AiOutlineMinusCircle, AiOutlineSetting, AiOutlineSlack} from "react-icons/ai";
import {MdOutlinePersonSearch, MdWebhook} from "react-icons/md";
import {BsSearch} from "react-icons/bs";

const TeamDetail = () => {
  let { teamId } = useParams();
  const [team, setTeam] = useState()
  const [activeKey, setActiveKey] = useState(0)

  useAsyncEffect(async() => {
    await fetchTeam()
  }, [teamId])

  const fetchTeam = async () => {
    const {data} = await api.team.get(teamId)
    setTeam(data)
  }

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <div>
          <h2>Team Details - {team?.label}</h2>
        </div>
      </div>

      <div className={'mt-4'}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink href="#!"
                      active={activeKey === 0}
                      onClick={() => setActiveKey(0)}>
              <AiOutlineMail/> Emails
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!"
                      active={activeKey === 1}
                      onClick={() => setActiveKey(1)}>
              <MdWebhook/> Webhook URLs
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!"
                      active={activeKey === 2}
                      onClick={() => setActiveKey(2)}>
              <AiOutlineSlack/> Slack
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!"
                      active={activeKey === 3}
                      onClick={() => setActiveKey(3)}>
              <AiOutlineSetting/> Settings
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel"
                    className={'mt-2'}
                    aria-labelledby="home-tab" visible={activeKey === 1}>
            <div className={'mt-4'}>
              <div className={'d-flex justify-content-end w-100'}>
                {
                  team && (
                    <TeamEmailModal team={team} refetch={fetchTeam} />
                  )
                }
              </div>
              {
                team?.emails?.map((email, index) => {
                  return (
                    <div key={index} className={'mt-2'}>
                      <Card>
                        <CardBody>
                          <div className={'d-flex gap-2'}>
                            <CardTitle tag={'h3'}>
                              {index + 1}.
                            </CardTitle>
                            <CardTitle tag={'h3'}>
                              {email}
                            </CardTitle>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  )
                })
              }
              {
                team?.emails?.length === 0 && (
                  <div className={'d-flex justify-content-center flex-column align-items-center'}>
                    <BsSearch className={'fs-1'}/>
                    <h5 className={'text-center mt-2 text-muted'}>No Emails are assigned to this team</h5>
                  </div>
                )
              }
            </div>
          </CTabPane>
          <CTabPane role="tabpanel"
                    className={'mt-2'}
                    aria-labelledby="home-tab" visible={activeKey === 2}>
            <div className={'mt-4'}>
              <div className={'d-flex justify-content-end w-100'}>
                {
                  team && (
                    <TeamWebhookModal team={team} refetch={fetchTeam} />
                  )
                }
              </div>
              {
                team?.webhook_urls?.map((webhookUrl, index) => {
                  return (
                    <div key={index} className={'mt-2'}>
                      <Card>
                        <CardBody>
                          <div className={'d-flex gap-2'}>
                            <CardTitle tag={'h3'}>
                              {index + 1}.
                            </CardTitle>
                            <CardTitle tag={'h3'}>
                              {webhookUrl}
                            </CardTitle>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  )
                })
              }
              {
                team?.webhook_urls?.length === 0 && (
                  <div className={'d-flex justify-content-center flex-column align-items-center'}>
                    <BsSearch className={'fs-1'}/>
                    <h5 className={'text-center mt-2 text-muted'}>No Webhooks are assigned to this team</h5>
                  </div>
                )
              }
            </div>
          </CTabPane>
          <CTabPane role="tabpanel"
                    className={'mt-2'}
                    aria-labelledby="home-tab" visible={activeKey === 3}>
          </CTabPane>
          <CTabPane role="tabpanel"
                    className={'mt-2'}
                    aria-labelledby="home-tab" visible={activeKey === 4}>
          </CTabPane>
        </CTabContent>
      </div>

    </>
  )
}

export default TeamDetail
