import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import {useState} from "react";
import {api} from "../../api";
import {Badge} from "reactstrap";
import EditAlertEndpointModal from "./EditAlertEndpointModal";

const AlertEndpointDetail = () => {
  let { alertEndpointId } = useParams();
  const [alertEndpoint, setAlertEndpoint] = useState()

  useAsyncEffect(async() => {
    await fetchAlertEndpoint()
  }, [alertEndpointId])

  const fetchAlertEndpoint = async () => {
    const {data} = await api.alertEndpoint.get(alertEndpointId)
    setAlertEndpoint(data)
  }

  return (
    <>
      <div className={'d-flex justify-content-between'}>
        <div>
          <h2>Alert Endpoint Details</h2>
          <div className={'d-flex gap-1'}>
            <p className={'mb-0'}>Email is</p>
            <div>
              <Badge>{alertEndpoint?.email}</Badge>
            </div>
          </div>
          <div className={'d-flex gap-1'}>
            <p className={'mb-0'}>Webhook URL is</p>
            <div>
              <Badge>{alertEndpoint?.webhook_url}</Badge>
            </div>
          </div>
        </div>
        <EditAlertEndpointModal alertEndpoint={alertEndpoint} refetch={fetchAlertEndpoint}/>
      </div>
    </>
  )
}

export default AlertEndpointDetail
