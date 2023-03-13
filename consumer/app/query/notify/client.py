from app.models.business.destination import TeamRead
from app.models.business.message import MessageRead
from app.query.notify.factory import NotifyClientFactory

factory = NotifyClientFactory()
custom_webhook_client = factory.build("custom_webhook")
sendgrid_client = factory.build("sendgrid")


async def notify(destination: TeamRead, message: MessageRead):
    await custom_webhook_client.send(destination, message)
    await sendgrid_client.send(destination, message)
