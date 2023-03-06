import json

from app.utils.json_logic import jsonLogic


def matches(alert_rule, message):
    def get_rules(rules):
        processed_rules = []
        for rule in rules:
            if rule['type'] == 'text':
                processed_rules.append({
                    rule['operator']: [
                        {
                            "var": rule['key']
                        },
                        rule['value']
                    ]
                })
            elif rule['type'] == 'number':
                processed_rules.append({
                    rule['operator']: [
                        {
                            "var": rule['key']
                        },
                        int(rule['value'])
                    ]
                })
        return processed_rules

    try:
        rules_json_logic = {alert_rule['logic']: get_rules(alert_rule['rules'])}
        print(rules_json_logic)
    except Exception as e:
        print(e)
        return False

    try:
        result = jsonLogic(rules_json_logic, message['tags'])
        if message['level'] in alert_rule['levels']:
            result = result and True
        else:
            result = False

        return result
    except Exception as e:
        print(e)
        return False

