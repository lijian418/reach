from app.models.business.destination import TeamRead
from app.models.business.message import MessageRead
from app.query.notify.creator import NotifyClient


class SendgridClient(NotifyClient):
    def __init__(self):
        pass

    async def send(self, destination: TeamRead, message: MessageRead):
        for email in destination.emails:
            print("Sending email notification to: ", email)
