from app.models.business.alert_endpoint import AlertEndpointRead
from app.models.business.message import MessageRead
from app.query.notify.email.sendgrid import SendgridClient
from app.query.notify.webhook.slack import SlackClient

slack_client = SlackClient()
sendgrid_client = SendgridClient()


async def notify(endpoint: AlertEndpointRead, message: MessageRead):
    await slack_client.send(endpoint, message)
    await sendgrid_client.send(endpoint, message)
