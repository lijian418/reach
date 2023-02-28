import {useEffect, useState} from "react";
import {api} from "../../api";
import useAsyncEffect from "use-async-effect";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import Pagination from "react-js-pagination";

export const ChannelList = () => {
  const [search, setSearch] = useState()
  const [channels, setChannels] = useState()
  const [total, setTotal] = useState()

  useAsyncEffect(async () => {
    const searchData = {
      limit: 10,
      skip: 0
    }
    setSearch(searchData)
    await getChannels(searchData)
  }, [])

  const getChannels = async (searchData) => {
    const {data} = await api.channels.find(searchData)
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
      <div className={'d-flex flex-column align-items-end my-2'}>
        <p className={'mb-1'}>{search?.skip + channels?.length} out of {total}</p>
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
                  <Button>
                    Details
                  </Button>
                </CardBody>
              </Card>
            )
          })
        }
      </div>
      <div className={"d-flex flex-row-reverse"}>
        <Pagination
          activePage={pageNumber(total ? total : 0, 10, search?.skip)}
          totalItemsCount={total ? total : 0}
          onChange={changePage}

          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </>
  )
}
