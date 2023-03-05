import json
import app.query.channel as channel_query
import app.query.message as message_query
from app.core.queue.client import queue_client
from app.models.business.message import MessageCreate


async def handle_message(message):
    print("Handling message")
    print("Message received: ", message)

    payload = json.loads(message)
    channel = await channel_query.get_by_slug(payload['channel_slug'])

    payload['status'] = "created"
    payload['channel_id'] = channel['_id']
    created = await message_query.create(MessageCreate(**payload))
    print("Message created: ", created.json())


async def main():
    await queue_client.consume(handle_message)
    print("Consuming")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
    print("Done")
