import aio_pika
from app.core.queue.creator import QueueClient


class QueueAsyncClient(QueueClient):
    def __init__(self, url, queue_name):
        self.url = url
        self.queue_name = queue_name
        self.connection = None
        self.channel = None
        self.queue = None

    async def send(self, payload):
        connection = await self._get_connection()
        async with connection:
            if self.queue is None:
                self.queue = await self.channel.declare_queue(self.queue_name)

            channel = await connection.channel()
            await channel.default_exchange.publish(
                aio_pika.Message(body=payload.encode()),
                routing_key=self.queue_name
            )

    async def receive(self):
        connection = await self._get_connection()
        async with connection:
            if self.queue is None:
                self.queue = await self.channel.declare_queue(self.queue_name)

            async with self.queue.iterator() as queue_iter:
                async for message in queue_iter:
                    async with message.process():
                        return message.body.decode()

    async def consume(self, callback):
        connection = await self._get_connection()
        async with connection:
            if self.queue is None:
                self.queue = await self.channel.declare_queue(self.queue_name)

            async with self.queue.iterator() as queue_iter:
                async for message in queue_iter:
                    async with message.process():
                        await callback(message.body.decode())

    async def delete(self):
        connection = await self._get_connection()
        async with connection:
            if self.queue is None:
                self.queue = await self.channel.declare_queue(self.queue_name)

            await self.queue.delete()

    async def purge(self):
        connection = await self._get_connection()
        async with connection:
            if self.queue is None:
                self.queue = await self.channel.declare_queue(self.queue_name)

            await self.queue.purge()

    async def get(self):
        connection = await self._get_connection()
        async with connection:
            if self.queue is None:
                self.queue = await self.channel.declare_queue(self.queue_name)

            message = await self.queue.get()
            if message:
                async with message.process():
                    return message.body.decode()

    async def close(self):
        if self.connection:
            await self.connection.close()

    async def _get_connection(self):
        if self.connection is None or self.connection.is_closed:
            self.connection = await aio_pika.connect_robust(self.url)

        if self.channel is None or self.channel.is_closed:
            self.channel = await self.connection.channel()

        return self.connection

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.close()
