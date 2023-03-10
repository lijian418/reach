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
import {DeleteAlertRuleModal} from "../alert-rules/DeleteAlertRuleModal";
import {DeleteAlertEndpointModal} from "./DeleteAlertEndpointModal";

export const AlertEndpointList = (props) => {
  const [search, setSearch] = useState()
  const [alertEndpoints, setAlertEndpoints] = useState()
  const [total, setTotal] = useState()
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    const searchData = {
      limit: 10,
      skip: 0
    }
    setSearch(searchData)
    await getAlertEndpoints(searchData)
  }, [props.refetchAt])

  const getAlertEndpoints = async (searchData) => {
    const {data} = await api.alertEndpoint.find(searchData)
    setAlertEndpoints(data.items)
    setTotal(data.total)
  }

  const changePage = async (page) => {
    const newOffset = (page - 1) * 10;
    const searchData = {
      limit: 10,
      skip: newOffset
    }
    setSearch(searchData)
    await getAlertEndpoints(searchData)
  }

  return (
    <>
      <div className={'d-flex flex-row-reverse mt-4'}>
        <div className={'d-flex align-items-end'}>
          <p className={'me-2'}>{search?.skip + alertEndpoints?.length} out of {total}</p>
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
          alertEndpoints && alertEndpoints.map((alertEndpoint) => {
            return (
              <Card style={{width: '25rem', minWidth: '300px'}} key={alertEndpoint.id}>
                <CardBody>
                  <CardTitle tag="h5">
                    Endpoint {alertEndpoint.label}
                  </CardTitle>
                  <div className={'d-flex flex-row-reverse'}>
                    <div className={'d-flex gap-2 flex-wrap'}>
                      <DeleteAlertEndpointModal delete={async () => {
                        await api.alertEndpoint.remove(alertEndpoint.id)
                        setAlertEndpoints(alertEndpoints.filter((x) => x.id !== alertEndpoint.id))
                        setTotal(total - 1)
                      }} alertEndpoint={alertEndpoint} />
                      <Button color={'primary'} onClick={() => navigate(`/alert-endpoints/${alertEndpoint.id}`)}>
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
          <p className={'me-2'}>{search?.skip + alertEndpoints?.length} out of {total}</p>
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
