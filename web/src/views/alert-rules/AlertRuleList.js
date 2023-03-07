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
import {DeleteAlertRuleModal} from "./DeleteAlertRuleModal";

export const AlertRuleList = (props) => {
  const [search, setSearch] = useState()
  const [alertRules, setAlertRules] = useState()
  const [total, setTotal] = useState()
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    const searchData = {
      limit: 10,
      skip: 0
    }
    setSearch(searchData)
    await getAlertRules(searchData)
  }, [props.refetchAt])

  const getAlertRules = async (searchData) => {
    const {data} = await api.alertRule.find(searchData)
    setAlertRules(data.items)
    setTotal(data.total)
  }

  const changePage = async (page) => {
    const newOffset = (page - 1) * 10;
    const searchData = {
      limit: 10,
      skip: newOffset
    }
    setSearch(searchData)
    await getAlertRules(searchData)
  }

  return (
    <>
      <div className={'d-flex flex-row-reverse mt-4'}>
        <div className={'d-flex align-items-end'}>
          <p className={'me-2'}>{search?.skip + alertRules?.length} out of {total}</p>
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
          alertRules && alertRules.map((alertRule) => {
            return (
              <Card style={{width: '25rem', minWidth: '300px'}} key={alertRule.id}>
                <CardBody>
                  <CardTitle tag="h5">
                    Rule {alertRule.label}
                  </CardTitle>
                  <div className={'d-flex flex-row-reverse'}>
                    <div className={'d-flex gap-2 flex-wrap'}>
                      <DeleteAlertRuleModal delete={async () => {
                        await api.alertRule.remove(alertRule.id)
                        setAlertRules(alertRules.filter((alertRule) => alertRule.id !== alertRule.id))
                        setTotal(total - 1)
                      }} alertRule={alertRule} />
                      <Button color={'primary'} onClick={() => navigate(`/alert-rules/${alertRule.id}`)}>
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
          <p className={'me-2'}>{search?.skip + alertRules?.length} out of {total}</p>
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
