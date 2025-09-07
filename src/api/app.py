import os
import boto3
import json
from boto3.dynamodb.conditions import Key

TABLE_NAME = os.environ.get("TABLE_NAME")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    qs = event.get("queryStringParameters") or {}
    service_filter = qs.get("service")


    if service_filter:
        # Query by service
        response = table.query(
            KeyConditionExpression=Key("Service").eq(service_filter)
        )
        items = response.get("Items", [])
    else:
        response = table.scan()
        items = response.get("Items", [])

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",      
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps(items)
    }

