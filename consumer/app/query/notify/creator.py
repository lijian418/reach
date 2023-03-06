from abc import abstractmethod, ABC

from app.models.business.alert_endpoint import AlertEndpointRead
from app.models.business.message import MessageRead


class NotifyClient(ABC):
    @abstractmethod
    def send(self, endpoint: AlertEndpointRead, message: MessageRead):
        pass
