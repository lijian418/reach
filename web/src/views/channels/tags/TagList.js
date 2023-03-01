import {useEffect, useState} from "react";
import useAsyncEffect from "use-async-effect";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle, CardText,
  CardTitle, List,
} from "reactstrap";
import Pagination from "react-js-pagination";
import {cilTrash} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {useNavigate} from "react-router-dom";
import {api} from "../../../api";
import EditTagModal from "./EditTagModal";
import {channel} from "../../../api/channel";
import AssignAlertRouteModal from "../../alert-routes/AssignAlertRouteModal";

export const TagList = (props) => {

  const assignAlertRouteToTag = async (routeId, tagId) => {
    const {data} = await api.alertRoute.assignToTag(routeId, tagId)
    await props.refetch()
  }

  const unassignAlertRouteFromTag = async (routeId, tagId) => {
    const {data} = await api.alertRoute.unassignFromTag(routeId, tagId)
    await props.refetch()
  }

  return (
    <>
      <div className={'d-flex gap-3 flex-wrap'}>
        {
          props.channel && props.channel.tags && props.channel.tags.map((tag) => {
            return (
              <Card style={{width: '25rem', minWidth: '300px'}} key={tag.id}>
                <CardBody>
                  <div className={'h-100 d-flex flex-column justify-content-between'}>
                    <div>
                      <CardTitle tag="h4">
                        {tag.slug}
                      </CardTitle>
                      <h6>Alert Routes</h6>
                      {
                        tag.alert_routes && tag.alert_routes.length === 0 && (
                          <p>No Alert routes</p>
                        )
                      }
                      <List>
                        {
                          tag.alert_routes && tag.alert_routes.map((alertRoute) => {
                            return (
                              <li>{alertRoute.label}<Button size={'sm'}
                                                            onClick={() => unassignAlertRouteFromTag(alertRoute.id, tag.id)}
                                                            color={'link'}>Unassign</Button></li>
                            )
                          })
                        }
                      </List>
                    </div>
                    <div className={'d-flex flex-row-reverse'}>
                      <div className={'d-flex gap-2 flex-wrap'}>
                        <AssignAlertRouteModal alreadyAssigned={tag.alert_routes}
                                               callbackAssign={(option) => assignAlertRouteToTag(option.value, tag.id)}/>
                        <Button color={'danger'} className={'mr-2'}>
                          <CIcon icon={cilTrash} size="sm"/> Delete
                        </Button>
                        <EditTagModal channel={channel} tag={tag} refetch={props.refetch}/>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )
          })
        }
        {
          props.channel && props.channel.tags.length === 0 && (
            <p>No tags</p>
          )
        }
      </div>
    </>
  )
}
