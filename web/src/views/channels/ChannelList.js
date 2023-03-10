import React, {useState} from "react";
import {api} from "../../api";
import useAsyncEffect from "use-async-effect";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import Pagination from "react-js-pagination";
import {useNavigate} from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import {AlertRuleTabs} from "../alert-rules/AlertRuleTabs";

export const ChannelList = (props) => {
  const [search, setSearch] = useState()
  const [channels, setChannels] = useState()
  const [total, setTotal] = useState()
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    const searchData = {
      limit: 10,
      skip: 0
    }
    setSearch(searchData)
    await getChannels(searchData)
  }, [props.refetchAt])

  const getChannels = async (searchData) => {
    const {data} = await api.channel.find(searchData)
    setChannels(data.items)
    setTotal(data.total)
  }

  function pageNumber(total,limit,offset){
    return offset >= total ? -1 : parseInt(offset / limit) + 1;
  }

  const changePage = async (page) => {
    const newOffset = (page - 1) * 10;
    const searchData = {
      limit: 10,
      skip: newOffset
    }
    setSearch(searchData)
    await getChannels(searchData)
  }

  return (
    <>
      <div className={'d-flex flex-row-reverse mt-4'}>
        <div className={'d-flex align-items-end'}>
          <p className={'me-2'}>{search?.skip + channels?.length} out of {total}</p>
          <Pagination
            activePage={pageNumber(total ? total : 0, 10, search?.skip)}
            totalItemsCount={total ? total : 0}
            onChange={changePage}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
      <div>
        {
          channels?.map((channel, index) => {
            return (
              <Card key={index} className={'mt-4'}>
                <CardBody>
                  <CardTitle tag="h3">
                    Channel {channel.label}
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    With slug "{channel.slug}"
                  </CardSubtitle>
                </CardBody>
                <CardBody>
                  <AlertRuleTabs channel={channel} />
                  <div className={'d-flex flex-row-reverse mt-4'}>
                    <div className={'d-flex gap-2 flex-wrap'}>
                      <DeleteModal delete={async () => {
                        await api.channel.remove(channel.id)
                        setChannels(channels.filter((c) => c.id !== channel.id))
                        setTotal(total - 1)
                      }} />
                      <Button color={'primary'} onClick={() => navigate(`/channels/${channel.id}`)}>
                        View
                      </Button>
                    </div>
                  </div>
                </CardBody>
            </Card>
            )
          })
        }
      </div>

      <div className={'d-flex flex-row-reverse mt-4'}>
        <div className={'d-flex align-items-end'}>
          <p className={'me-2'}>{search?.skip + channels?.length} out of {total}</p>
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
