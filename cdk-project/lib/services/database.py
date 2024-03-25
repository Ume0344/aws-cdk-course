import boto3
import botocore.exceptions as exceptions


class DynamoDB:
    def __init__(self) -> None:
        self.dynamodb = boto3.resource('dynamodb')

    def get_table(self, table_name):
        """"
        Get the dynamodb table by name.
        param table_name: Name of dynamodb table
        returns: Entire dynamodb table resource
        """

        try:
            table = self.dynamodb.Table(table_name)
        except exceptions.ClientError as err:
            print(err)  
        return table

    def post_message_by_id(self, table_name: str, message: str, id: str):
        """
        Post the message in dynamodb table after creating an id.
        param table_name: Name of dynamodb table.
        param message: Message to be posted.
        param id: Id (primary key) of the message.
        returns post_success: Dyanmodb put item request's success status(true|false)
        """
        post_success = False
        table = self.dynamodb.Table(table_name)
        try:
            table.put_item(Item={
                'id': id,
                'message': message,
                })
            post_success = True
        except exceptions.ClientError as err:
            print(err)
            post_success = False

        return post_success
    
    def get_all_messages(self, table_name: str):
        """
        Get all the messages in dynamodb table.
        param table: Name of dynamodb table.
        returns: All the messages in Dyanmodb table.
        """
        table_items = []
        try:
            table = self.dynamodb.Table(table_name)
            response = table.scan()
            table_items = response['Items']
        except exceptions.ClientError as err:
            print(err)

        return table_items
    
    def get_message_by_id(self, table_name: str, id: str):
        """
        Get all the messages in dynamodb table.
        param table: Name of dynamodb table.
        param id: Id of message to be retrieved
        returns: All the messages in Dyanmodb table.
        """
        table_item = {}
        try:
            table = self.dynamodb.Table(table_name)
            response = table.get_item(
                Key={"id": id}
                )
            
            table_item = response['Item']
        except exceptions.ClientError as err:
            print(err)

        return table_item
    
    def update_message_by_id(self, table_name: str, id: str, updated_message: str):
        """
        Update the message by id.
        param table_name: Name of dynamodb table.
        param updated_message: Updated message.
        param id: Id (primary key) of the message.
        returns update_success: Dyanmodb update item request's success status(true|false)
        """
        update_success = False
        table = self.dynamodb.Table(table_name)
        try:
            table.update_item(
                Key={
                    'id': id
                    },
                UpdateExpression='SET message = :updated_message',
                ExpressionAttributeValues={
                    ':updated_message': updated_message
                    }
                )
            update_success = True
        except exceptions.ClientError as err:
            print(err)
            update_success = False

        return update_success
