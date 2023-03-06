import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import {useState} from "react";
import {api} from "../../api";
import {Badge} from "reactstrap";
import EditAlertEndpointModal from "./EditAlertEndpointModal";
import EndpointEmailModal from "./EndpointEmailModal";
import EndpointWebhookModal from "./EndpointWebhookModal";

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
          <h2>Alert Endpoint Details - {alertEndpoint?.label}</h2>
        </div>
        <EditAlertEndpointModal alertEndpoint={alertEndpoint} refetch={fetchAlertEndpoint}/>
      </div>

      <div className={'mt-4'}>
        <div className={'d-flex justify-content-between w-100'}>
          <h4 className={'mb-0'}>Emails</h4>
          {
            alertEndpoint && (
              <EndpointEmailModal alertEndpoint={alertEndpoint} refetch={fetchAlertEndpoint} />
            )
          }
          {
            alertEndpoint?.emails?.length === 0 && (
              <p>{alertEndpoint?.emails?.length === 0 && "No Emails Set"}</p>
            )
          }
        </div>
        {
          alertEndpoint?.emails?.map((email, index) => {
            return (
              <div key={index}>
                <Badge>{email}</Badge>
              </div>
            )
          })
        }
      </div>
      <div className={'mt-4'}>

        <div className={'d-flex justify-content-between w-100'}>
          <h4 className={'mb-0'}>Webhook URLs</h4>
          {
            alertEndpoint && (
              <EndpointWebhookModal alertEndpoint={alertEndpoint} refetch={fetchAlertEndpoint} />
            )
          }
        </div>
        {
          alertEndpoint?.webhook_urls?.map((webhookUrl, index) => {
            return (
              <div key={index}>
                <Badge>{webhookUrl}</Badge>
              </div>
            )
          })
        }
        {
          alertEndpoint?.webhook_urls?.length === 0 && (
            <p>{alertEndpoint?.webhook_urls?.length === 0 && "No Webhooks Set"}</p>
          )
        }
      </div>
    </>
  )
}

export default AlertEndpointDetail
