import React, {useState} from "react";
import {api} from "../../api";
import useAsyncEffect from "use-async-effect";
import Pagination from "react-js-pagination";
import {useNavigate} from "react-router-dom";
import {pageNumber} from "../../utils/pageNumber";
import {CAccordionBody, CAccordionHeader, CAccordionItem} from "@coreui/react";
import {DeleteDestinationModal} from "./modal/DeleteDestinationModal";
import {CAccordionCustom} from "../../components/CAccordionCustom";
import DestinationEmailModal from "./modal/DestinationEmailModal";
import DestinationWebhookModal from "./modal/DestinationWebhookModal";
import EditDestinationModal from "./modal/EditDestinationModal";
import DestinationSlackModal from "./modal/DestinationSlackModal";
import {CircleIcon} from "../../components/card/CircleIcon";
import {MdEmail, MdOutlineCallMade, MdOutlineCallReceived} from "react-icons/md";

export const DestinationList = (props) => {
  const [search, setSearch] = useState()
  const [destinations, setDestinations] = useState()
  const [total, setTotal] = useState()
  const [activeItemKey, setActiveItemKey] = useState()

  useAsyncEffect(async () => {
    const searchData = {
      limit: 10,
      skip: 0
    }
    setSearch(searchData)
    await getDestinations(searchData)
  }, [props.refetchAt])

  const getDestinations = async (searchData) => {
    const {data} = await api.destination.find(searchData)
    setDestinations(data.items)
    setTotal(data.total)
  }

  const getDestination = async (id) => {
    const {data} = await api.destination.get(id)
    return data
  }

  const refetchOnEdit = async (id) => {
    const destination = await getDestination(id)
    const index = destinations.findIndex((destination) => destination.id === id)
    const newDestinations = [...destinations]
    newDestinations[index] = destination
    setDestinations(newDestinations)
  }

  const changePage = async (page) => {
    const newOffset = (page - 1) * 10;
    const searchData = {
      limit: 10,
      skip: newOffset
    }
    setSearch(searchData)
    await getDestinations(searchData)
  }

  const removeDestination = async (id) => {
    await api.destination.remove(id)
    setDestinations(destinations.filter((destination) => destination.id !== id))
    setTotal(total - 1)
  }

  return (
    <>
      <CAccordionCustom
        activeItemKey={activeItemKey}
        onActiveItemChange={setActiveItemKey}>
        {
          destinations && destinations.map((destination, index) => {
            return (
              <CAccordionItem itemKey={index} key={destination.id}>
                <CAccordionHeader>
                  <div className={'d-flex gap-3'}>
                    <CircleIcon>
                      <MdOutlineCallMade/>
                    </CircleIcon>
                    <div>
                      <h4>{destination.label}</h4>
                      <p className={'text-muted mb-0'}>
                        {
                          destination.emails.length > 0 && `${destination.emails.length} email` + (destination.emails.length > 1 ? 's' : '')
                        }
                        {
                          destination.emails.length > 0 && destination.slack_urls.length > 0 && ', '
                        }
                        {
                          destination.slack_urls.length > 0 && `${destination.slack_urls.length} slack url` + (destination.slack_urls.length > 1 ? 's' : '')
                        }
                        {
                          (destination.emails.length > 0 || destination.slack_urls.length > 0) && destination.webhook_urls.length > 0 && ', '
                        }
                        {
                          destination.webhook_urls.length > 0 && `${destination.webhook_urls.length} webhook url` + (destination.webhook_urls.length > 1 ? 's' : '')
                        }
                        {
                          (destination.emails.length === 0 && destination.slack_urls.length === 0 && destination.webhook_urls.length === 0) && 'No destination'
                        }
                      </p>
                    </div>
                  </div>
                </CAccordionHeader>
                <CAccordionBody>
                  <div className={'d-flex gap-2 flex-column'}>
                    <DestinationEmailModal destination={destination}
                                           refetch={() => refetchOnEdit(destination.id)}/>
                    <DestinationWebhookModal destination={destination}
                                             refetch={() => refetchOnEdit(destination.id)}/>
                    <DestinationSlackModal destination={destination}
                                           refetch={() => refetchOnEdit(destination.id)}/>
                    <EditDestinationModal destination={destination}
                                          refetch={() => refetchOnEdit(destination.id)}/>
                    <hr/>
                    <div className={'d-flex justify-content-end gap-2 flex-wrap mt-3'}>
                      <DeleteDestinationModal destination={destination}
                                              remove={() => removeDestination(destination.id)}/>
                    </div>
                  </div>
                </CAccordionBody>
              </CAccordionItem>
            )
          })
        }
      </CAccordionCustom>
      <div className={'d-flex flex-row-reverse mt-4'}>
        <div className={'d-flex align-items-end'}>
          <p className={'me-2'}>{search?.skip + destinations?.length} out of {total}</p>
          <Pagination
            activePage={pageNumber(total ? total : 0, 10, search?.skip)}
            totalItemsCount={total ? total : 0}
            onChange={changePage}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    </>
  )
}
