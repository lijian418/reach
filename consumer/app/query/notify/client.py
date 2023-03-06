from app.models.business.alert_endpoint import AlertEndpointRead
from app.models.business.message import MessageRead
from app.query.notify.factory import NotifyClientFactory

factory = NotifyClientFactory()
custom_webhook_client = factory.build("custom_webhook")
sendgrid_client = factory.build("sendgrid")


async def notify(endpoint: AlertEndpointRead, message: MessageRead):
    await custom_webhook_client.send(endpoint, message)
    await sendgrid_client.send(endpoint, message)
