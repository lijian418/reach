import json
from typing import List

from bson import ObjectId

import app.query.channel as channel_query
import app.query.message as message_query
from app.core.queue.client import queue_client
from app.models.business.alarm import AlarmRead
from app.models.business.message import MessageCreate, MessageRead
from app.query.notify.client import notify
from app.utils.alert_rule import matches


async def notify_endpoints(triggered_alarms: List[AlarmRead],
                           message: MessageRead):
    print("Notifying endpoints")
    for alarm in triggered_alarms:
        print("Notifying endpoint: ", alarm.endpoint.label)
        await notify(alarm.endpoint, message)


def get_triggered_alarms(channel, message):
    triggered_alarms = []
    for alarm in channel.alarms:
        if matches(alarm.rule.dict(), message.dict()):
            triggered_alarms.append(alarm)
    return triggered_alarms


async def handle_message(message):
    print("Handling message")
    print("Message received: ", message)

    # store message in db
    payload = json.loads(message)
    channel = await channel_query.get_by_slug(payload['channel_slug'])
    payload['status'] = "created"
    payload['channel_id'] = channel.id
    created = await message_query.create(MessageCreate(**payload))
    print("Message created: ", created.json())

    # get all alarms that are triggered by message data and level
    triggered_alarms = get_triggered_alarms(channel, created)

    # update message status and specify triggered alarms on message
    if len(triggered_alarms) > 0:
        payload['status'] = "triggered"
        payload['triggered_alarms_ids'] = list(map(lambda x: ObjectId(x.id), triggered_alarms))
        updated = await message_query.update(created.id, payload)
        await notify_endpoints(triggered_alarms, updated)


async def main():
    await queue_client.consume(handle_message)
    print("Consuming")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
    print("Done")
