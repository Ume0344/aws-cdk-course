## AWS Cognito
A aws service used for authetication and authorization of a user to the application 
This service can be used in two ways;
- **User Pool** - The user sends the authtication request to aws congnito with username and password. Upon request, aws cognito provides a token (JWT - JSON Web Token) to user to use application. This is to authenticate the user to use aws services or an application.
- **Identity Pool** - This is used to authorize the user to access aws services based on temporary aws credentials.

## AWS Cognito with CDK
- create a user pool
- create user pool client 
- create a user
- activate user 