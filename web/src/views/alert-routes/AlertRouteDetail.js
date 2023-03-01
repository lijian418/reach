import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import {useState} from "react";
import {api} from "../../api";
import {Badge} from "reactstrap";
import EditAlertRouteModal from "./EditAlertRouteModal";

const AlertRouteDetail = () => {
  let { alertRouteId } = useParams();
  const [alertRoute, setAlertRoute] = useState()

  useAsyncEffect(async() => {
    await fetchAlertRoute()
  }, [alertRouteId])

  const fetchAlertRoute = async () => {
    const {data} = await api.alertRoute.get(alertRouteId)
    setAlertRoute(data)
  }

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <div>
          <h2>Alert Route Details</h2>
          <div className={'d-flex gap-1'}>
            <p className={'mb-0'}>Email is</p>
            <div>
              <Badge>{alertRoute?.email}</Badge>
            </div>
          </div>
          <div className={'d-flex gap-1'}>
            <p className={'mb-0'}>Webhook URL is</p>
            <div>
              <Badge>{alertRoute?.webhook_url}</Badge>
            </div>
          </div>
        </div>
        <EditAlertRouteModal alertRoute={alertRoute} refetch={fetchAlertRoute}/>
      </div>
    </>
  )
}

export default AlertRouteDetail
