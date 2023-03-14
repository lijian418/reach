import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import useAsyncEffect from "use-async-effect";
import {api} from "../../api";
import InfiniteScroll from "react-infinite-scroll-component";
import {useUser} from "../../hooks/useUser";
import {SubscriptionCard} from "./SubscriptionCard";
import {CircleIconButton} from "../../components/card/CircleIcon";
import {AiOutlineLeft} from "react-icons/ai";


const SubscriptionList = () => {
  const {channelId} = useParams()
  const {user} = useUser()
  const [search, setSearch] = useState()
  const [subscriptions, setSubscriptions] = useState()
  const [total, setTotal] = useState()
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    if (user && channelId) {
      const searchData = {
        channel_id: channelId,
        user_id: user.id,
        limit: 10,
        skip: 0
      }
      setSearch(searchData)
      await getSubscriptions(searchData)
    }
  }, [user, channelId])

  const getSubscriptions = async (searchData) => {
    const {data} = await api.subscription.find(searchData)
    setSubscriptions(data.items)
    setTotal(data.total)
  }

  const fetchData = async () => {
    if (search) {
      const searchData = {
        ...search,
        skip: search.skip + 10
      }
      setSearch(searchData)
      const {data} = await api.subscription.find(searchData)
      setSubscriptions([...subscriptions, ...data.items])
      setTotal(data.total)
    }
  }

  return (
    <>
      <CircleIconButton onClick={() => navigate(`/channels/${channelId}`)}>
        <AiOutlineLeft/>
      </CircleIconButton>
      <div className={'mt-4'}>
        <h4>Your Subscriptions</h4>
        <hr/>
      </div>
      {
        subscriptions && (
          <InfiniteScroll
            dataLength={subscriptions.length}
            next={fetchData}
            hasMore={subscriptions.length < total}
            loader={<></>}
            endMessage={<></>}
          >
            {
              subscriptions.map((subscription, index) => {
                return (
                  <SubscriptionCard key={index} subscription={subscription} from={'subscriptions'}/>
                )
              })
            }
          </InfiniteScroll>
        )
      }
    </>
  )
}

export default SubscriptionList
