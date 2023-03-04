import pika
import json
from core.queue.creator import QueueClient


class QueueSyncClient(QueueClient):
    def __init__(self, url, queue_name):
        self.url = url
        self.queue_name = queue_name
        self.connection = None
        self.channel = None
        self.queue = None

    def send(self, payload):
        connection = self._get_connection()
        channel = connection.channel()
        if self.queue is None:
            self.queue = channel.queue_declare(queue=self.queue_name)

        channel.basic_publish(
            exchange='',
            routing_key=self.queue_name,
            body=json.dumps(payload).encode('utf-8'),
        )
        connection.close()

    def receive(self):
        connection = self._get_connection()
        channel = connection.channel()

        if self.queue is None:
            self.queue = channel.queue_declare(queue=self.queue_name)

        method_frame, header_frame, body = channel.basic_get(queue=self.queue_name)

        if method_frame:
            channel.basic_ack(method_frame.delivery_tag)
            connection.close()
            return json.loads(body)

        connection.close()

    def delete(self):
        connection = self._get_connection()
        channel = connection.channel()

        if self.queue is None:
            self.queue = channel.queue_declare(queue=self.queue_name)

        channel.queue_delete(queue=self.queue_name)
        connection.close()

    def purge(self):
        connection = self._get_connection()
        channel = connection.channel()

        if self.queue is None:
            self.queue = channel.queue_declare(queue=self.queue_name)

        channel.queue_purge(queue=self.queue_name)
        connection.close()

    def get(self):
        connection = self._get_connection()
        channel = connection.channel()

        if self.queue is None:
            self.queue = channel.queue_declare(queue=self.queue_name)

        method_frame, header_frame, body = channel.basic_get(queue=self.queue_name)

        if method_frame:
            channel.basic_ack(method_frame.delivery_tag)
            connection.close()
            return json.loads(body)

        connection.close()

    def close(self):
        if self.connection:
            self.connection.close()

    def _get_connection(self):
        if self.connection is None or self.connection.is_closed:
            self.connection = pika.BlockingConnection(pika.URLParameters(self.url))

        return self.connection

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()
