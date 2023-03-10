import motor.motor_asyncio

from app.core.env import settings

client = motor.motor_asyncio.AsyncIOMotorClient(settings.db.MONGODB_URL)
db = client.main_db

destination = db["destination"]
alert_rule_collection = db["alert_rule_collection"]
channel_collection = db["channel_collection"]
message_collection = db["message_collection"]
subscription_collection = db["subscription_collection"]
tag_collection = db["tag_collection"]
user_collection = db["user_collection"]
alarm_collection = db["alarm_collection"]
