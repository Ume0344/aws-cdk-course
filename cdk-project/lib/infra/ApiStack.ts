import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway'

interface ApiStackProps extends StackProps {
  helloLambdaIntegration: apiGateway.LambdaIntegration
}
export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props)

    const api = new apiGateway.RestApi(this, 'HelloApi')
    const helloResource = api.root.addResource('hello')
    helloResource.addMethod('GET', props.helloLambdaIntegration)
  }
}