import {useState} from "react";
import {api} from "../../api";
import useAsyncEffect from "use-async-effect";
import Pagination from "react-js-pagination";
import {pageNumber} from "../../utils/pageNumber";
import {Table} from "reactstrap";
import {useUser} from "../../hooks/useUser";

export const MessageList = () => {
  const [search, setSearch] = useState()
  const [messages, setMessages] = useState()
  const [total, setTotal] = useState()
  const {user} = useUser()

  useAsyncEffect(async () => {
    if (user) {
      const searchData = {
        limit: 10,
        skip: 0,
        user_id: user.id,
      }
      setSearch(searchData)
      await getMessages(searchData)
    }
  }, [user])

  const getMessages = async (searchData) => {
    const {data} = await api.message.find(searchData)
    setMessages(data.items)
    setTotal(data.total)
  }

  const changePage = async (page) => {
    const newOffset = (page - 1) * 10;
    const searchData = {
      limit: 10,
      skip: newOffset
    }
    setSearch(searchData)
    await getMessages(searchData)
  }

  return (
    <>
      <div className={'d-flex flex-row-reverse mt-4'}>
        <div className={'d-flex align-items-end'}>
          <p className={'me-2'}>{search?.skip + messages?.length} out of {total}</p>
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
        <Table striped>
          <thead>
          <tr>
            <th>
              Title
            </th>
            <th>
              Description
            </th>
            <th>
              Level
            </th>
            <th>
              Data
            </th>
            <th>
              Alarms Activated
            </th>
          </tr>
          </thead>
          <tbody>

          {
            messages && messages.map((message) => {
              return (
                <tr>
                  <td>
                    {message.title}
                  </td>
                  <td>
                    {message.description}
                  </td>
                  <td>
                    {message.level}
                  </td>
                  <td>
                    {JSON.stringify(message.tags)}
                  </td>
                  <td>
                    {message.triggered_alarms.map((alarm) => (
                      <div>
                        {alarm.label}
                      </div>
                    ))}
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </Table>
      </div>
      <div className={'d-flex flex-row-reverse mt-4'}>
        <div className={'d-flex align-items-end'}>
          <p className={'me-2'}>{search?.skip + messages?.length} out of {total}</p>
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
