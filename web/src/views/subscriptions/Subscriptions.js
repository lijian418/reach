import InfiniteScroll from "react-infinite-scroll-component";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import React, {useState} from "react";
import useAsyncEffect from "use-async-effect";
import {api} from "../../api";
import {useUser} from "../../hooks/useUser";
import SubscribeToMultipleAlerts from "./SubscribeToMultipleAlerts";

const Subscriptions = () => {
  const [channels, setChannels] = useState()
  const [totalChannels, setTotalChannels] = useState()
  const [searchState, setSearchState] = useState()
  const [subscriptions, setSubscriptions] = useState()
  const {user} = useUser()

  useAsyncEffect(async () => {
    if (user) {
      const initialSearchState = {
        limit: 10,
        skip: 0,
        exclude_subscribed_user_id: user.id
      }

      setSearchState(initialSearchState)
      await fetchChannels(initialSearchState)
      await getSubscriptions()
    }
  }, [user])

  const fetchChannels = async (search) => {
    const {data} = await api.channel.find(search)
    setChannels(data.items)
    setTotalChannels(data.total)
  }

  const fetchNext = async () => {
    if (searchState.skip + searchState.limit < totalChannels) {
      const nextSearchState = {
        ...searchState,
        skip: searchState.skip + searchState.limit
      }
      setSearchState(nextSearchState)
      await fetchChannels(nextSearchState)
    }
  }

  const subscribe = async (channel_id) => {
    const {data} = await api.subscription.create({
      user_id: user.id,
      channel_id: channel_id,
      listen_to_all: true
    })
    setChannels(channels.filter(channel => channel.id !== channel_id))
    setTotalChannels(totalChannels - 1)
  }

  const getSubscriptions = async () => {
    const {data} = await api.subscription.getMultiple(user.subscription_ids)
    setSubscriptions(data)
  }

  return (
    <>
      <h3>Subscribed</h3>
      {
        subscriptions && subscriptions.map((subscription, index) => {
          return (
            <div key={index}>
              <Card>
                <CardBody>
                  <div className={'d-flex justify-content-between'}>
                    <div>
                      <CardTitle tag="h3">
                        Channel {subscription.channel.label}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                      >
                        With slug "{subscription.channel.slug}"
                      </CardSubtitle>
                    </div>
                    <div>
                      <Button
                        color="danger"
                        onClick={() => subscribe(subscription.channel.id)}
                      >
                        Unsubscribe
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )
        })
      }
      <div className={'mt-4'}>
        <h3>Channels Available</h3>
        {
          channels && channels.length === 0 && (
            <div>
              <h4>No channels found</h4>
            </div>
          )
        }
        {
          channels && channels.length > 0 && (
            <InfiniteScroll
              dataLength={channels?.length} //This is important field to render the next data
              next={fetchNext}
              hasMore={searchState.skip + searchState.limit < totalChannels}
              loader={<></>}
              endMessage={<></>}
            >
              <div className={'d-flex gap-4 flex-column'}>
                {
                  channels?.map((channel, index) => {
                    return (
                      <div key={index}>
                        <Card>
                          <CardBody>
                            <div className={'d-flex justify-content-between'}>
                              <div>
                                <CardTitle tag="h3">
                                  Channel {channel.label}
                                </CardTitle>
                                <CardSubtitle
                                  className="mb-2 text-muted"
                                  tag="h6"
                                >
                                  With slug "{channel.slug}"
                                </CardSubtitle>
                              </div>
                              <div className={'d-flex gap-2 flex-wrap'}>
                                <div>
                                  <SubscribeToMultipleAlerts channel={channel}/>
                                </div>
                                <div>
                                  <Button
                                    color="primary"
                                    onClick={() => subscribe(channel.id)}
                                  >
                                    Subscribe to all
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    )
                  })
                }
              </div>
            </InfiniteScroll>
          )
        }
      </div>
    </>
  )
}

export default Subscriptions
