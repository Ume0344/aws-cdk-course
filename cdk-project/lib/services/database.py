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
            print (table.creation_date_time)
        except exceptions.ClientError as err:
            print(err)  
        return  table
        