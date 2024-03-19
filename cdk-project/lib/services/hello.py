## create a python lambda which prints the hello
def lambda_handler(event, context):
    message = 'Hello {} {}!'.format(event['first_name'], event['last_name'])  
    return {
        "statusCode" : 200,
        'message' : message
    }
