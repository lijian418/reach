from app.core.env import settings
from app.core.queue.factory import QueueClientFactory

if settings.queue.RABBIT_MQ_MODE == "async":
    queue_client = QueueClientFactory().build("async",
                                              settings.queue.RABBIT_MQ_URL,
                                              settings.queue.RABBIT_MQ_QUEUE_NAME)
else:
    queue_client = QueueClientFactory().build("sync",
                                              settings.queue.RABBIT_MQ_URL,
                                              settings.queue.RABBIT_MQ_QUEUE_NAME)
