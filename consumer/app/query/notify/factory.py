from app.query.notify.creator import NotifyClient
from app.query.notify.email.sendgrid import SendgridClient
from app.query.notify.webhook.custom_webhook import CustomWebhookClient


class NotifyClientFactory:
    def build(self, client_type) -> NotifyClient:
        if client_type == "sendgrid":
            return SendgridClient()
        elif client_type == "custom_webhook":
            return CustomWebhookClient()
        raise NotImplementedError(f"Client Type {client_type} is not implemented")
