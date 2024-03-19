import path = require('path');
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const fn = new lambda.Function(this, 'HelloFunction', {
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: 'hello.lambda_handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../services')),
      });
  }
}
