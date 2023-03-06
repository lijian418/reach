from app.core.db import channel_collection
from app.models.business.channel import ChannelRead


async def get_by_slug(slug: str) -> ChannelRead:
    pipeline = [{"$match": {"slug": slug}},
                {
                    "$lookup": {
                        "from": "alarm_collection",
                        "let": {"alarm_ids": "$alarm_ids"},
                        "pipeline": [
                            {"$match": {"$expr": {"$in": ["$_id", "$$alarm_ids"]}}},
                            {"$lookup": {
                                "from": "alert_endpoint_collection",
                                "localField": "endpoint_id",
                                "foreignField": "_id",
                                "as": "endpoint"
                            }},
                            {"$lookup": {
                                "from": "alert_rule_collection",
                                "localField": "rule_id",
                                "foreignField": "_id",
                                "as": "rule"
                            }},
                            {"$unwind": "$rule"},
                            {"$unwind": "$endpoint"},
                        ],
                        "as": "alarms"
                    }
                }]
    entity = await channel_collection.aggregate(pipeline).to_list(length=None)
    return ChannelRead(**entity[0])
