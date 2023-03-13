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
import {CardWrapper} from "../../components/card/CardWrapper";
import {CircleIcon} from "../../components/card/CircleIcon";
import {AiOutlineRight} from "react-icons/ai";
import {ClickableCard} from "../../components/card/ClickableCard";
import {BsSoundwave} from "react-icons/bs";

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
      <div className={'d-flex gap-2 flex-column'}>
        {
          channels?.map((channel, index) => {
            return (
              <ClickableCard onClick={() => navigate(`/channels/${channel.id}`)}>
                <CardBody>
                  <CardWrapper>
                    <div className={'d-flex gap-3 flex-wrap'}>
                      <CircleIcon>
                        <BsSoundwave/>
                      </CircleIcon>
                      <div>
                        <h4>{channel.label}</h4>
                        <p className={'text-muted mb-0'}>
                          {channel.description ? channel.description : 'No description'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <AiOutlineRight/>
                    </div>
                  </CardWrapper>
                </CardBody>
              </ClickableCard>
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
