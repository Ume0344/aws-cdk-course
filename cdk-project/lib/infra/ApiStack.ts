import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import { IUserPool, UserPool } from 'aws-cdk-lib/aws-cognito';


interface ApiStackProps extends StackProps {
  // api gateway lambda proxy integration to pass the query string
  // parameters of api-gateway url to lambda's event argument.
  helloLambdaIntegration: apiGateway.LambdaIntegration
  userPool: IUserPool
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props)

    const api = new apiGateway.RestApi(this, 'HelloApi');

    // Create an authorizer and add it to API
    const authorizer = new apiGateway.CognitoUserPoolsAuthorizer(this, 'SpacesApiAuthorizer', {
      cognitoUserPools:[props.userPool],
      identitySource: 'method.request.header.Authorization'
    });

    authorizer._attachToApi(api);

    const optionsWithAuth: apiGateway.MethodOptions = {
      authorizationType: apiGateway.AuthorizationType.COGNITO,
      authorizer: {
          authorizerId: authorizer.authorizerId
      }
    }

    const helloResource = api.root.addResource('hello');
    helloResource.addMethod('GET', props.helloLambdaIntegration, optionsWithAuth);
    helloResource.addMethod('POST', props.helloLambdaIntegration, optionsWithAuth);
    helloResource.addMethod('PUT', props.helloLambdaIntegration, optionsWithAuth);
    helloResource.addMethod('DELETE', props.helloLambdaIntegration, optionsWithAuth);
  }
}
