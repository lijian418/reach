from app.models.business.team import TeamRead
from app.models.business.message import MessageRead
from app.query.notify.creator import NotifyClient


class CustomWebhookClient(NotifyClient):
    def __init__(self):
        pass

    async def send(self, team: TeamRead, message: MessageRead):
        for webhook_url in team.webhook_urls:
            print("Sending slack notification to: ", webhook_url)
