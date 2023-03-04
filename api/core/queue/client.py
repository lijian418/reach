from core.env import settings
from core.queue.factory import QueueClientFactory

if settings.queue.RABBIT_MQ_ASYNC:
    queue_client = QueueClientFactory().build("async",
                                              settings.queue.RABBIT_MQ_URL,
                                              settings.queue.RABBIT_MQ_QUEUE_NAME)
else:
    queue_client = QueueClientFactory().build("sync",
                                              settings.queue.RABBIT_MQ_URL,
                                              settings.queue.RABBIT_MQ_QUEUE_NAME)
