from app.core.queue.creator import QueueClient
from app.core.queue.queue_async_client import QueueAsyncClient
from app.core.queue.queue_sync_client import QueueSyncClient
from app.query.notify.creator import NotifyClient
from app.query.notify.email.sendgrid import SendgridClient
from app.query.notify.webhook.slack import SlackClient


class NotifyClientFactory:
    def build(self, client_type) -> NotifyClient:
        if client_type == "sendgrid":
            return SendgridClient()
        elif client_type == "slack":
            return SlackClient()
        raise NotImplementedError(f"Client Type {client_type} is not implemented")
