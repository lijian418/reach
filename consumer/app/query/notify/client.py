from app.models.business.team import TeamRead
from app.models.business.message import MessageRead
from app.query.notify.factory import NotifyClientFactory

factory = NotifyClientFactory()
custom_webhook_client = factory.build("custom_webhook")
sendgrid_client = factory.build("sendgrid")


async def notify(team: TeamRead, message: MessageRead):
    await custom_webhook_client.send(team, message)
    await sendgrid_client.send(team, message)
