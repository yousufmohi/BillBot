import os
import boto3

SES_EMAIL = os.environ.get("SES_EMAIL")
ses_client = boto3.client("ses")

def lambda_handler(event, context):
    total_cost = event.get("total_cost", 0)
    threshold = float(os.environ.get("COST_THRESHOLD", 100))

    if total_cost > threshold:
        response = ses_client.send_email(
            Source=SES_EMAIL,
            Destination={"ToAddresses": [SES_EMAIL]},
            Message={
                "Subject": {"Data": "AWS Cost Alert"},
                "Body": {"Text": {"Data": f"Total costs have reached ${total_cost}!"}}
            }
        )
        return {"status": "Email sent", "response": response}
    return {"status": "Under threshold"}
