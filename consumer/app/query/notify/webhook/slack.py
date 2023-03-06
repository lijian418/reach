from app.models.business.alert_endpoint import AlertEndpointRead
from app.models.business.message import MessageRead
from app.query.notify.creator import NotifyClient


class SlackClient(NotifyClient):
    def __init__(self):
        pass

    async def send(self, endpoint: AlertEndpointRead, message: MessageRead):
        for webhook_url in endpoint.webhook_urls:
            print("Sending slack notification to: ", webhook_url)
