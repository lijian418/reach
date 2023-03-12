from abc import abstractmethod, ABC

from app.models.business.team import TeamRead
from app.models.business.message import MessageRead


class NotifyClient(ABC):
    @abstractmethod
    def send(self, team: TeamRead, message: MessageRead):
        pass
