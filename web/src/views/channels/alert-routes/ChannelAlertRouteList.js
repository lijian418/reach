import {
  Button,
  Card,
  CardBody, CardText,
  CardTitle,
} from "reactstrap";
import CIcon from "@coreui/icons-react";
import {cilLinkBroken, cilTrash} from "@coreui/icons";
import {useNavigate} from "react-router-dom";
import {api} from "../../../api";

export const ChannelAlertRouteList = (props) => {
  const navigate = useNavigate()
  const unassign = async (routeId) => {
    const {data} = await api.alertRoute.unassignFromChannel(routeId, props.channel.id)
    props.refetch()
  }

  return (
    <>
      <div className={'d-flex gap-3 flex-wrap'}>
        {
          props.channel && props.channel.alert_routes && props.channel.alert_routes.map((alertRoute) => {
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
                      <Button color={'danger'} onClick={() => unassign(alertRoute.id)}>
                        <CIcon icon={cilLinkBroken} size="sm"/> Unassign
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
        {
          props.channel && props.channel.alert_routes.length === 0 && (
            <p>No Alert Routes</p>
          )
        }
      </div>
    </>
  )
}
