from abc import abstractmethod, ABC

from app.models.business.destination import TeamRead
from app.models.business.message import MessageRead


class NotifyClient(ABC):
    @abstractmethod
    def send(self, destination: TeamRead, message: MessageRead):
        pass
