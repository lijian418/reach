import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import React, {useState} from "react";
import {api} from "../../api";
import {Card, CardBody, CardTitle} from "reactstrap";
import DestinationEmailModal from "./modal/DestinationEmailModal";
import DestinationWebhookModal from "./modal/DestinationWebhookModal";
import {CNav, CNavItem, CNavLink, CTabContent, CTabPane} from "@coreui/react";
import {AiOutlineMail, AiOutlineSetting, AiOutlineSlack} from "react-icons/ai";
import {MdWebhook} from "react-icons/md";
import {BsSearch} from "react-icons/bs";

const DestinationDetail = () => {
  let { destinationId } = useParams();
  const [destination, setDestination] = useState()
  const [activeKey, setActiveKey] = useState(0)

  useAsyncEffect(async() => {
    await fetchDestination()
  }, [destinationId])

  const fetchDestination = async () => {
    const {data} = await api.destination.get(destinationId)
    setDestination(data)
  }

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <div>
          <h2>Destination Details - {destination?.label}</h2>
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
                  destination && (
                    <DestinationEmailModal destination={destination} refetch={fetchDestination} />
                  )
                }
              </div>
              {
                destination?.emails?.map((email, index) => {
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
                destination?.emails?.length === 0 && (
                  <div className={'d-flex justify-content-center flex-column align-items-center'}>
                    <BsSearch className={'fs-1'}/>
                    <h5 className={'text-center mt-2 text-muted'}>No Emails are assigned to this destination</h5>
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
                  destination && (
                    <DestinationWebhookModal destination={destination} refetch={fetchDestination} />
                  )
                }
              </div>
              {
                destination?.webhook_urls?.map((webhookUrl, index) => {
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
                destination?.webhook_urls?.length === 0 && (
                  <div className={'d-flex justify-content-center flex-column align-items-center'}>
                    <BsSearch className={'fs-1'}/>
                    <h5 className={'text-center mt-2 text-muted'}>No Webhooks are assigned to this destination</h5>
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

export default DestinationDetail
