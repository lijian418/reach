from app.models.business.team import TeamRead
from app.models.business.message import MessageRead
from app.query.notify.creator import NotifyClient


class SendgridClient(NotifyClient):
    def __init__(self):
        pass

    async def send(self, team: TeamRead, message: MessageRead):
        for email in team.emails:
            print("Sending email notification to: ", email)
