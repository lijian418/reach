from app.core.queue.creator import QueueClient
from app.core.queue.queue_async_client import QueueAsyncClient
from app.core.queue.queue_sync_client import QueueSyncClient


class QueueClientFactory:
    def build(self, client_type, url, queue_name) -> QueueClient:
        if client_type == "async":
            return QueueAsyncClient(url, queue_name)
        elif client_type == "sync":
            return QueueSyncClient(url, queue_name)
        raise NotImplementedError(f"Client Type {client_type} is not implemented")
