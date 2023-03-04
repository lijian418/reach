from abc import abstractmethod, ABC


class QueueClient(ABC):
    @abstractmethod
    def send(self, payload):
        pass

    @abstractmethod
    def receive(self):
        pass

    @abstractmethod
    def delete(self):
        pass

    @abstractmethod
    def purge(self):
        pass

    @abstractmethod
    def get(self):
        pass

    @abstractmethod
    def close(self):
        pass

    @abstractmethod
    def _get_connection(self):
        pass

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()

