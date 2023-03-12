import React, {useEffect, useState} from "react";
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
import {DeleteTeamModal} from "./modal/DeleteTeamModal";

export const TeamList = (props) => {
  const [search, setSearch] = useState()
  const [teams, setTeams] = useState()
  const [total, setTotal] = useState()
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    const searchData = {
      limit: 10,
      skip: 0
    }
    setSearch(searchData)
    await getTeams(searchData)
  }, [props.refetchAt])

  const getTeams = async (searchData) => {
    const {data} = await api.team.find(searchData)
    setTeams(data.items)
    setTotal(data.total)
  }

  const changePage = async (page) => {
    const newOffset = (page - 1) * 10;
    const searchData = {
      limit: 10,
      skip: newOffset
    }
    setSearch(searchData)
    await getTeams(searchData)
  }

  return (
    <>
      <div className={'d-flex gap-3 flex-wrap'}>
        {
          teams && teams.map((team) => {
            return (
              <Card style={{width: '25rem', minWidth: '300px'}} key={team.id}>
                <CardBody>
                  <div className={'d-flex justify-content-between'}>
                    <div>
                      <Button color={'link'}
                              className={'p-0 text-start text-decoration-none'}
                              onClick={() => navigate(`/teams/${team.id}`)}>
                        <CardTitle tag="h3" >
                          {team.label}
                        </CardTitle>
                      </Button>
                    </div>
                    <div>
                      <div className={'d-flex gap-2 flex-wrap'}>
                        <DeleteTeamModal delete={async () => {
                          await api.team.remove(team.id)
                          setTeams(teams.filter((x) => x.id !== team.id))
                          setTotal(total - 1)
                        }} team={team} />
                      </div>
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
          <p className={'me-2'}>{search?.skip + teams?.length} out of {total}</p>
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
