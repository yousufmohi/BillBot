import os
import boto3
from decimal import Decimal
from datetime import datetime, timedelta
import logging


logger = logging.getLogger()
logger.setLevel(logging.INFO)


TABLE_NAME = os.environ.get("TABLE_NAME")
if not TABLE_NAME:
    raise ValueError("Environment variable TABLE_NAME is not set")

REGION = os.environ.get("AWS_REGION", "us-east-1")

ce = boto3.client("ce", region_name=REGION)
dynamodb = boto3.resource("dynamodb", region_name=REGION)
table = dynamodb.Table(TABLE_NAME)


def iso_date(dt):
    return dt.strftime("%Y-%m-%d")

def fetch_yesterday_costs():
    end = datetime.utcnow().date()
    start = end - timedelta(days=1)
    try:
        resp = ce.get_cost_and_usage(
            TimePeriod={"Start": iso_date(start), "End": iso_date(end)},
            Granularity="DAILY",
            Metrics=["UnblendedCost"],
            GroupBy=[{"Type": "DIMENSION", "Key": "SERVICE"}]
        )
        return start, resp.get("ResultsByTime", [])
    except ce.exceptions.DataUnavailableException:
        logger.warning("Cost Explorer data not available yet for this time period.")
        return start, []


def write_items(start_date, results_by_time):
    if not results_by_time:
        logger.info("No cost data to write.")
        return

    for period in results_by_time:
        timestamp = period.get("TimePeriod", {}).get("Start", iso_date(start_date))
        groups = period.get("Groups", [])

        for g in groups:
            service = g["Keys"][0]
            amount = g["Metrics"]["UnblendedCost"]["Amount"]
            item = {
                "Service": service,
                "Timestamp": timestamp,
                "Cost": Decimal(str(amount))
            }
            logger.info(f"Putting item: {item}")
            table.put_item(Item=item)


def lambda_handler(event, context):
    start, results = fetch_yesterday_costs()
    write_items(start, results)
    return {"statusCode": 200, "body": "ok"}
