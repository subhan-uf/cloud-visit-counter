import json, os, boto3

table= boto3.resource('dynamodb').Table(os.environ['TABLE_NAME'])

def handler(event, context):
    resp= table.update_item(
        Key={"pk": "counter"},
        UpdateExpression= "ADD visits :inc",
        ExpressionAttributeValues= {":inc":1},
        ReturnValues="ALL_NEW",
    )
    count= int(resp["Attributes"].get("visits", 0))
    return{
        "statusCode":200,
        "headers":{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
        "body": json.dumps({"visits":count})
    }