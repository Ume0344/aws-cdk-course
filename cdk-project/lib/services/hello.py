import json
import os
from database import DynamoDB


def lambda_handler(event, context):
    error = ""
    status_code = 0
    message = ""
    response = {}
    http_method = ""
    db = DynamoDB()
    table_name = os.environ['Hello_DB_Table']

    print(f"Table name from enviroment of Lambda is {table_name}")

    try:
        if event["httpMethod"] is not None:
            http_method = event["httpMethod"]
            status_code = 200
            if http_method == "GET":
                message = get_hello_message(db, table_name)
            else:
                message = "No http method is defined in request"
                status_code = 400
    except KeyError:
        error = "No http method attribute found in the lambda event"
        status_code = 400

    response = {
        "message": message,
        "error": error
    }

    return {
        "isBase64Encoded": False,
        "statusCode": status_code,
        "body": json.dumps(response)
        }


def get_hello_message(db: DynamoDB, table_name: str):
    """
    Get the table creation date.
    param db: DynamoDB class reference.
    param table_name: Name of dynamodb table.
    returns: table creation date in string.
    """
    table_creation = db.get_table(table_name=table_name)
    print(table_creation)
    return (table_creation.strftime("%H:%M:%S"))
