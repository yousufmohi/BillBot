import os
import boto3
import json
import logging
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal

logger = logging.getLogger()
logger.setLevel(logging.INFO)

TABLE_NAME = os.environ.get("TABLE_NAME")
if not TABLE_NAME:
    raise ValueError("Environment variable TABLE_NAME is not set")

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

def convert_decimals(obj):
    if isinstance(obj, list):
        return [convert_decimals(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: convert_decimals(v) for k, v in obj.items()}
    elif isinstance(obj, Decimal):
        return float(obj)
    else:
        return obj


def lambda_handler(event, context):
    logger.info(f"Received event: {event}")

    qs = event.get("queryStringParameters") or {}
    service_filter = qs.get("service")
    start_date = qs.get("start")
    end_date = qs.get("end")

    logger.info(f"Service filter: {service_filter}, Start: {start_date}, End: {end_date}")

    try:
        filter_expression = None

        if service_filter:
            filter_expression = Key("Service").eq(service_filter)

        if start_date and end_date:
            date_filter = Key("Timestamp").between(start_date, end_date)
            filter_expression = filter_expression & date_filter if filter_expression else date_filter

        if filter_expression:
            if "Service" in [k["AttributeName"] for k in table.key_schema]:
                response = table.query(KeyConditionExpression=filter_expression)
            else:
                response = table.scan(FilterExpression=filter_expression)
        else:
            response = table.scan()

        items = response.get("Items", [])
        items = convert_decimals(items) 

    except Exception as e:
        logger.error(f"Error accessing DynamoDB: {e}")
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            "body": json.dumps({"error": "Internal server error"})
        }

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps({
            "items": items,
            "count": len(items)
        })
    }
