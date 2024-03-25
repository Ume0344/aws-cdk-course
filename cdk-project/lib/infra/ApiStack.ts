import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';


interface ApiStackProps extends StackProps {
  // api gateway lambda proxy integration to pass the query string
  // parameters of api-gateway url to lambda's event argument.
  helloLambdaIntegration: apiGateway.LambdaIntegration
}
export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props)

    const api = new apiGateway.RestApi(this, 'HelloApi');
    const helloResource = api.root.addResource('hello');
    helloResource.addMethod('GET', props.helloLambdaIntegration);
    helloResource.addMethod('POST', props.helloLambdaIntegration);
    helloResource.addMethod('PUT', props.helloLambdaIntegration);
  }
}
