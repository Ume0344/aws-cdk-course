import boto3

cognito_client = boto3.client('cognito-idp')
## we created a user with a username through AuthStack. Now, we need to set a password of it through api.

response = cognito_client.admin_set_user_password(
    UserPoolId='eu-central-1_Mrhhxu5AL',
    Username='bubble',
    Password='Goingtoslub#123',
    Permanent=True
)
print(response)

## now we initiate the authentication to get the id token / jwt token

response = cognito_client.admin_initiate_auth(
    UserPoolId='eu-central-1_Mrhhxu5AL',
    ClientId='5i8jc7pp7ql3voql43meba4rmq',
    AuthFlow='ADMIN_USER_PASSWORD_AUTH',
    AuthParameters={
        'USERNAME': 'bubble',
        'PASSWORD': 'Goingtoslub#123'
    },
)

print(f"Id Token: {response['AuthenticationResult']['IdToken']}\n")
