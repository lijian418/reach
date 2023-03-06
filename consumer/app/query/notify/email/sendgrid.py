from app.models.business.alert_endpoint import AlertEndpointRead
from app.models.business.message import MessageRead
from app.query.notify.creator import NotifyClient


class SendgridClient(NotifyClient):
    def __init__(self):
        pass

    async def send(self, endpoint: AlertEndpointRead, message: MessageRead):
        for email in endpoint.emails:
            print("Sending email notification to: ", email)
