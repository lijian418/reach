import {useEffect, useState} from "react";
import {api} from "../../api";
import useAsyncEffect from "use-async-effect";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
import Pagination from "react-js-pagination";
import {cilTrash} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {useNavigate} from "react-router-dom";
import {pageNumber} from "../../utils/pageNumber";

export const AlertRouteList = (props) => {
  const [search, setSearch] = useState()
  const [alertRoutes, setAlertRoutes] = useState()
  const [total, setTotal] = useState()
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    const searchData = {
      limit: 10,
      skip: 0
    }
    setSearch(searchData)
    await getAlertRoutes(searchData)
  }, [props.refetchAt])

  const getAlertRoutes = async (searchData) => {
    const {data} = await api.alertRoute.find(searchData)
    setAlertRoutes(data.items)
    setTotal(data.total)
  }

  const changePage = async (page) => {
    const newOffset = (page - 1) * 10;
    const searchData = {
      limit: 10,
      skip: newOffset
    }
    setSearch(searchData)
    await getAlertRoutes(searchData)
  }

  return (
    <>
      <div className={'d-flex flex-row-reverse mt-4'}>
        <div className={'d-flex align-items-end'}>
          <p className={'me-2'}>{search?.skip + alertRoutes?.length} out of {total}</p>
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
          alertRoutes && alertRoutes.map((alertRoute) => {
            return (
              <Card style={{width: '25rem', minWidth: '300px'}} key={alertRoute.id}>
                <CardBody>
                  <CardTitle tag="h5">
                    Route {alertRoute.label}
                  </CardTitle>
                  <CardText>Email: {alertRoute.email ? alertRoute.email : "No Email Set"}</CardText>
                  <CardText>Webhook URL: {alertRoute.webhook_url ? alertRoute.webhook_url : "No Webhook Set"}</CardText>
                  <div className={'d-flex flex-row-reverse'}>
                    <div className={'d-flex gap-2 flex-wrap'}>
                      <Button color={'danger'}>
                        <CIcon icon={cilTrash} size="sm"/> Delete
                      </Button>
                      <Button color={'primary'} onClick={() => navigate(`/alert-routes/${alertRoute.id}`)}>
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
          <p className={'me-2'}>{search?.skip + alertRoutes?.length} out of {total}</p>
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
