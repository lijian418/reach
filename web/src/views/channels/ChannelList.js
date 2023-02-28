import {useEffect, useState} from "react";
import {api} from "../../api";
import useAsyncEffect from "use-async-effect";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle, CardText,
  CardTitle,
} from "reactstrap";
import Pagination from "react-js-pagination";
import {cilTrash} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {useNavigate} from "react-router-dom";

export const ChannelList = () => {
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
  }, [])

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
      <div className={'d-flex gap-3 flex-wrap'}>
        {
          channels && channels.map((channel) => {
            return (
              <Card style={{width: '25rem', minWidth: '300px'}} key={channel.id}>
                <CardBody>
                  <CardTitle tag="h5">
                    {channel.label}
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    {channel.slug}
                  </CardSubtitle>
                  <div className={'my-2'}>
                    {
                      channel.tags.length > 0 ? (
                        <div>
                          {
                            channel.tags.map((tag) => (
                              <Badge className={'me-2'} key={tag.id}>
                                {tag.slug}
                              </Badge>
                            ))
                          }
                        </div>
                      ) : (
                        <div>
                          <Badge className={'me-2'}>
                            No tags
                          </Badge>
                        </div>
                      )
                    }
                  </div>
                  <div className={'d-flex flex-row-reverse'}>
                    <div className={'d-flex gap-2 flex-wrap'}>
                      <Button color={'danger'}>
                        <CIcon icon={cilTrash} size="sm"/> Delete
                      </Button>
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
