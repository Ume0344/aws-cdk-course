## AWS Cognito
A aws service used for authetication and authorization of a user to the application 
This service can be used in two ways;
- **User Pool** - The user sends the authtication request to aws congnito with username and password. Upon request, aws cognito provides a token (JWT - JSON Web Token) to user to use application. This is to authenticate the user to use aws services or an application.
- **Identity Pool** - This is used to authorize the user to access aws services based on temporary aws credentials.

## AWS Cognito with CDK
To authenticate the user through user pool, we will be following this flow in cdk app;
- create a user pool.
- create user pool client.
- create a user (after creating a user through cdk, `Confirmation status` will be set to `Force change password`. This status comes when a user is created by the developer(cdk application) or administrator) and sets a temporary password. User need to change the password on its first signin. The password will be set through cognito-idp python client (see test/auth_service.py).

## AWS Cognito-IDP
We will use aws cognito-idp python client to generate the tokens used by user to authenticate.

1. Create a user through `AuthStack` from user pool.
2. Set the password through cognito-idp client.
3. Initiate the authentication through cognito-idp client to get the `IdToken`.
4. Use `IdToken` while using the API.
