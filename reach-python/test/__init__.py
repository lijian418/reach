import asyncio

from reach_python.client import SyncReachClient
from reach_python.client import AsyncReachClient

async_client = AsyncReachClient("http://localhost:8000")
client = SyncReachClient("http://localhost:8000")


async def send_async():
    x = await async_client.send_messages([
        {"title": "test",
         "description": "123",
         "level": "info",
         "priority": "high",
         "tags": {"eth": "300"},
         "channel_slug": "crypto-channel"},
    ])
    print(x)


def send():
    r = client.send_message(
        {"title": "test", "description": "123", "level": "info", "tags": {"btc": "500"}, "channel_slug": "crypto-two"})
    print(r)


if __name__ == '__main__':
    asyncio.run(send_async())
    send()
    print("done")

