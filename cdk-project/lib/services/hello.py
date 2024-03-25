import json
import os
import uuid
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
    print(event)
    try:
        if event["httpMethod"] is not None:
            http_method = event["httpMethod"]
            query_string_parameter = event['queryStringParameters']

            status_code = 200

            if http_method == "GET":
                if query_string_parameter is not None:
                    message = get_message_by_id(db, table_name, query_string_parameter['id'])
                else: 
                    message = get_all_messages(db, table_name)

            elif http_method == "POST":
                success = post_message(db, table_name, event["body"])
                message = f"Success on posting message to dynamodb table: {success}"

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


def get_all_messages(db: DynamoDB, table_name: str):
    """
    Get all the messages.
    param db: DynamoDB class reference.
    param table_name: Name of dynamodb table.
    returns: All the messages in table.
    """
    messages = db.get_all_messages(table_name=table_name)
    return messages


def post_message(db: DynamoDB, table_name: str, event_body):
    """
    Create the id and calls database function to post the message.
    param db: DynamoDB class reference.
    param table: Name of dynamodb table.
    param event_body: Body containing message to be posted.
    returns: nil
    """
    try:
        parsed_body = json.loads(event_body)
        body_message = parsed_body["message"]
        id = uuid.uuid4()
        success = db.post_message_by_id(table_name=table_name, message=body_message, id=str(id))
    except KeyError:
        print("No message attribute is found inside body of request.")

    return success

def get_message_by_id(db: DynamoDB, table_name: str, id: str):
    """
    Get a message by id.
    param db: DynamoDB class reference.
    param table_name: Name of dynamodb table.
    returns: A message.
    """
    message = db.get_message_by_id(table_name=table_name, id=id)
    return message
