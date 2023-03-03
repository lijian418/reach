import json
import time

from fastapi import Depends, Body, APIRouter
from starlette.responses import JSONResponse

import query.alert_rule as alert_rule_query
from models.business.alert_rule import AlertRuleRead, AlertRuleCreate, AlertRulePaginatedRead, \
    AlertRuleSearch
from models.fastapi.mongodb import PyObjectId
from utils.json_logic import jsonLogic


router = APIRouter()


@router.post("",
             response_model=AlertRuleRead,
             response_model_by_alias=False)
async def create(payload: AlertRuleCreate = Body(...)):
    created = await alert_rule_query.create(payload)
    return created


@router.put("/{entity_id}",
            response_model=AlertRuleRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await alert_rule_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=AlertRuleRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await alert_rule_query.get(entity_id)


@router.get("",
            response_model=AlertRulePaginatedRead,
            response_model_by_alias=False)
async def find(search: AlertRuleSearch = Depends()):
    found = await alert_rule_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=AlertRuleRead,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    deleted = await alert_rule_query.delete(entity_id)
    return deleted


@router.post("/{entity_id}/try-data",
             response_model=bool,
             response_model_by_alias=False)
async def try_data(payload: dict = Body(...)):
    # 'alertRule': {'logic': 'OR', 'rules': [
    # {'key': 'btc', 'value': '5000', 'operator': '==', 'type': 'text'},
    # {'key': 'eth', 'value': '3000', 'operator': '!=', 'type': 'text'}]}
    # 'data': {'btc': '5000', 'eth': '3000'}

    # JSON Logic
    # rules = { "and" : [
    #   {"<" : [ { "var" : "temp" }, 110 ]},
    #   {"==" : [ { "var" : "pie.filling" }, "apple" ] }
    # ] }

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
        rules_json_logic = {payload['alertRule']['logic']: get_rules(payload['alertRule']['rules'])}
    except Exception as e:
        return JSONResponse(content="Cannot parse rules" + str(e))

    try:
        result = jsonLogic(rules_json_logic, json.loads(payload['data']))
        if payload['level'] in payload['alertRule']['levels']:
            result = result and True
        else:
            result = False

        return JSONResponse(content="Result: " + str(result))
    except Exception as e:
        return JSONResponse(content="Cannot parse data" + str(e))


