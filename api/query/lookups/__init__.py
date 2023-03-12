destinations_lookup = {
    "$lookup": {
        "from": "destinations",
        "localField": "destination_ids",
        "foreignField": "_id",
        "as": "destinations"
    }
}

user_lookup = {
    "$lookup": {
        "from": "users",
        "localField": "user_id",
        "foreignField": "_id",
        "as": "user"
    }
}
user_unwind = {"$unwind": "$user"}

alert_rules_lookup = {
    "$lookup": {
        "from": "alert_rules",
        "localField": "alert_rule_ids",
        "foreignField": "_id",
        "as": "alert_rules"
    }
}

alert_rule_lookup = {
    "$lookup": {
        "from": "alert_rules",
        "localField": "alert_rule_id",
        "foreignField": "_id",
        "as": "alert_rule"
    }
}
alert_rule_unwind = {"$unwind": "$alert_rule"}

channel_lookup = {
    "$lookup": {
        "from": "channels",
        "localField": "channel_id",
        "foreignField": "_id",
        "as": "channel"
    }
}
channel_unwind = {"$unwind": "$channel"}

subscriptions_lookup = {
    "$lookup": {
        "from": "subscriptions",
        "localField": "subscription_ids",
        "foreignField": "_id",
        "as": "subscriptions"
    }
}
