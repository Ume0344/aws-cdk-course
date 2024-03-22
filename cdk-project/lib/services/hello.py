## create a python lambda which prints the hello
import json
import os

def lambda_handler(event , context):
    first_name = ""
    last_name = ""
    error = ""
    status_code = 0
    message = ""
    response = []

    try:
        if (event['queryStringParameters']) and (event['queryStringParameters']['first_name']) and (
                event['queryStringParameters']['last_name'] is not None):
            first_name = event['queryStringParameters']['first_name']
            last_name = event['queryStringParameters']['last_name']
            message = 'Hi, {} {}. Your dynamodb table name is: {}!'.format(first_name, last_name, os.environ['Hello_DB_Table'])
            error = "nil"
            status_code = 200
    except KeyError:
        print('No first name or last name mentioned as query string parameters')
        error = "Bad Request: No first name or last name is mentioned"
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
