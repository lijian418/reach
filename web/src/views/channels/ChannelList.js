import React, {useState} from "react";
import {api} from "../../api";
import useAsyncEffect from "use-async-effect";
import {
  CardBody,
} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {CardWrapper} from "../../components/card/CardWrapper";
import {CircleIcon} from "../../components/card/CircleIcon";
import {AiOutlineRight} from "react-icons/ai";
import {ClickableCard} from "../../components/card/ClickableCard";
import {BsSoundwave} from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";

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

  const fetchData = async () => {
    const searchData = {
      limit: 10,
      skip: channels.length
    }
    setSearch(searchData)
    const {data} = await api.channel.find(searchData)
    setChannels([...channels, ...data.items])
  }

  return (
    <>
      <div className={'d-flex gap-2 flex-column'}>
        {
          channels && (
            <InfiniteScroll
              dataLength={channels.length}
              next={fetchData}
              hasMore={channels.length < total}
              loader={<></>}
              endMessage={<></>}
            >
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
            </InfiniteScroll>
          )
        }
      </div>
    </>
  )
}
