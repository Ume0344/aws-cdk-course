import path = require('path');
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { AllowListReceiptFilter } from 'aws-cdk-lib/aws-ses';

interface LambdaStackProps extends StackProps {
  helloTable: ITable
}

export class LambdaStack extends Stack {
  public helloLambdaIntegration: apiGateway.LambdaIntegration

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props)

    const fn = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'hello.lambda_handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../services')),
      environment: {
        'Hello_DB_Table': props.helloTable.tableName,
      },
    });

    fn.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [
        props.helloTable.tableArn
      ],
      actions: [
        "dynamodb:BatchGet*",
        "dynamodb:DescribeStream",
        "dynamodb:DescribeTable",
        "dynamodb:Get*",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:BatchWrite*",
        "dynamodb:CreateTable",
        "dynamodb:Delete*",
        "dynamodb:Update*",
        "dynamodb:PutItem"
      ],
    }));

    this.helloLambdaIntegration = new apiGateway.LambdaIntegration(fn);
  }
}
